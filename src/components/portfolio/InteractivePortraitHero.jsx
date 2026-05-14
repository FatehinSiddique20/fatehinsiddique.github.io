import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

// ─── Vertex Shader ────────────────────────────────────────────────────────────
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float smoothstepFn(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    float xNorm = pos.x / 1.225;
    float yNorm = pos.y / 1.625;
    float radial = sqrt(xNorm * xNorm + yNorm * yNorm);
    float edgeStrength = smoothstepFn(0.35, 0.85, radial);

    pos.z += sin(pos.y * 2.4) * 0.035 + cos(pos.x * 3.0) * 0.025;
    pos.z += edgeStrength * 0.16;
    pos.x += sin(pos.y * 1.8) * edgeStrength * 0.035;
    pos.y += cos(pos.x * 2.2) * edgeStrength * 0.025;

    // Subtle mouse-driven warp
    pos.z += uMouse.x * 0.06 * (1.0 - radial);
    pos.z += uMouse.y * 0.04 * (1.0 - radial);

    vPosition = pos;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ─── Fragment Shader ──────────────────────────────────────────────────────────
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec2 center = vUv - 0.5;
    float angle = atan(center.y, center.x);
    float radius = length(center);

    // Animated organic blob mask
    float blob = 0.47
      + 0.035 * sin(angle * 3.0 + uTime * 0.35)
      + 0.025 * sin(angle * 5.0 - uTime * 0.25)
      + 0.018 * sin(angle * 8.0 + uTime * 0.18);

    float alpha = smoothstep(blob, blob - 0.025, radius);
    if (alpha < 0.02) discard;

    // Sample texture
    vec4 texColor = texture2D(uTexture, vUv);

    // Slight contrast & saturation boost
    vec3 col = texColor.rgb;
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, 1.12); // saturation
    col = (col - 0.5) * 1.07 + 0.5; // contrast
    col = clamp(col, 0.0, 1.0);

    // Cyan rim light near boundary
    float rimFactor = smoothstep(blob - 0.09, blob - 0.005, radius);
    vec3 cyan  = vec3(0.02, 0.71, 0.83);
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vec3 blue  = vec3(0.23, 0.51, 0.96);
    col += cyan * rimFactor * 0.55;
    col += violet * rimFactor * 0.20;

    // Glass highlight top-left
    vec2 hlVec = vUv - vec2(0.0, 1.0);
    float hlDist = length(hlVec);
    float highlight = smoothstep(0.85, 0.3, hlDist) * 0.22;
    col += vec3(1.0) * highlight;

    // Subtle violet/blue ambient on dark areas
    float darkness = 1.0 - lum;
    col += violet * darkness * 0.08;
    col += blue * darkness * 0.06;

    // Hover glow
    float hoverGlow = uHover * 0.12;
    col += cyan * hoverGlow * (1.0 - radius * 1.5);

    // Vignette
    float vignette = 1.0 - smoothstep(0.28, 0.52, radius);
    col *= mix(0.75, 1.0, vignette);

    // Cinematic bottom fade
    float bottomFade = smoothstep(0.1, 0.45, vUv.y);
    alpha *= mix(0.3, 1.0, bottomFade);

    gl_FragColor = vec4(col, texColor.a * alpha);
  }
`;

// ─── Glow Shell Shaders ───────────────────────────────────────────────────────
const glowVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 center = vUv - 0.5;
    float angle = atan(center.y, center.x);
    float radius = length(center);

    float blob = 0.47
      + 0.035 * sin(angle * 3.0 + uTime * 0.35)
      + 0.025 * sin(angle * 5.0 - uTime * 0.25)
      + 0.018 * sin(angle * 8.0 + uTime * 0.18);

    float alpha = smoothstep(blob, blob - 0.025, radius);
    float glow = (1.0 - radius / blob) * alpha;
    float pulse = 0.85 + 0.15 * sin(uTime * 0.9);
    gl_FragColor = vec4(uColor, glow * uOpacity * pulse);
  }
`;

// ─── CSS Fallback Portrait ────────────────────────────────────────────────────
function FallbackPortrait({ imageSrc }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 395, height: 560 }}>
      <div style={{
        width: 395, height: 475,
        borderRadius: '40% 60% 55% 45% / 48% 44% 56% 52%',
        background: 'linear-gradient(135deg,rgba(6,182,212,0.9),rgba(59,130,246,0.45),rgba(139,92,246,0.75))',
        padding: 2.5,
        boxShadow: '0 0 60px rgba(6,182,212,0.3),0 0 120px rgba(139,92,246,0.15)',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden', background: '#05091a' }}>
          <img src={imageSrc} alt="Fatehin Siddique Chowdhury"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
              filter: 'brightness(0.92) contrast(1.06) saturate(1.08)' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function InteractivePortraitHero({ imageSrc }) {
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const reducedMotion = useReducedMotion();
  const [webglFailed, setWebglFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const mobile = window.innerWidth < 768;
    const W = mobile ? Math.min(window.innerWidth - 32, 360) : (window.innerWidth < 1024 ? 460 : 560);
    const H = mobile ? 430 : (window.innerWidth < 1024 ? 540 : 620);

    // ── Renderer ──
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      setWebglFailed(true);
      return;
    }
    if (!renderer.getContext()) { setWebglFailed(true); return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(W, H);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ──
    const scene = new THREE.Scene();
    const fov = mobile ? 42 : 35;
    const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // ── Lights ──
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5, 20);
    cyanLight.position.set(2.4, 1.6, 2.2);
    scene.add(cyanLight);
    const violetLight = new THREE.PointLight(0x8b5cf6, 1.0, 20);
    violetLight.position.set(-2.2, -1.4, 1.8);
    scene.add(violetLight);
    const blueLight = new THREE.PointLight(0x3b82f6, 1.2, 20);
    blueLight.position.set(0, 1.8, -1.8);
    scene.add(blueLight);

    // ── Portrait Group ──
    const portraitGroup = new THREE.Group();
    scene.add(portraitGroup);

    // Texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load(imageSrc, () => renderer.render(scene, camera));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Mouse uniform
    const mouseUniform = new THREE.Vector2(0, 0);
    const hoverUniform = { value: 0 };
    const timeUniform = { value: 0 };

    // Portrait mesh
    const segs = mobile ? 60 : 90;
    const planeGeo = new THREE.PlaneGeometry(2.45, 3.25, segs, Math.round(segs * 1.33));
    const planeMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: timeUniform,
        uMouse: { value: mouseUniform },
        uHover: hoverUniform,
      },
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const portraitMesh = new THREE.Mesh(planeGeo, planeMat);
    portraitMesh.renderOrder = 10;
    portraitGroup.add(portraitMesh);

    // Glow shells behind
    const glowGeo = new THREE.PlaneGeometry(2.45, 3.25, 8, 10);
    const glowColors = [
      { color: new THREE.Color(0x06b6d4), opacity: 0.22, z: -0.18, scale: 1.08 },
      { color: new THREE.Color(0x8b5cf6), opacity: 0.18, z: -0.26, scale: 1.12 },
      { color: new THREE.Color(0x3b82f6), opacity: 0.14, z: -0.34, scale: 1.16 },
    ];
    const glowMeshes = glowColors.map(({ color, opacity, z, scale }) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: glowVertexShader,
        fragmentShader: glowFragmentShader,
        uniforms: {
          uTime: timeUniform,
          uColor: { value: color },
          uOpacity: { value: opacity },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
      });
      const mesh = new THREE.Mesh(glowGeo, mat);
      mesh.position.z = z;
      mesh.scale.setScalar(scale);
      mesh.renderOrder = 5;
      portraitGroup.add(mesh);
      return mesh;
    });

    // ── Orbit Rings ──
    const ringDefs = [
      { color: 0x06b6d4, rx: 1.9, ry: 0.52, rotX: 1.25, rotZ: 0.15, opacity: 0.52, speed: 0.28, dir: 1 },
      { color: 0x8b5cf6, rx: 1.72, ry: 0.44, rotX: 1.18, rotZ: 0.75, opacity: 0.42, speed: 0.20, dir: -1 },
      { color: 0x3b82f6, rx: 2.05, ry: 0.36, rotX: 1.30, rotZ: -0.42, opacity: 0.32, speed: 0.34, dir: 1 },
      { color: 0xffffff, rx: 1.45, ry: 0.32, rotX: 1.15, rotZ: 1.20, opacity: 0.18, speed: 0.15, dir: -1 },
    ];
    const rings = ringDefs.map(({ color, rx, ry, rotX, rotZ, opacity, speed, dir }) => {
      const pts = [];
      const segsR = 128;
      for (let i = 0; i <= segsR; i++) {
        const a = (i / segsR) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
      const line = new THREE.Line(geo, mat);
      line.rotation.x = rotX;
      line.rotation.z = rotZ;
      line.renderOrder = 6;
      scene.add(line);
      return { line, mat, speed, dir, baseOpacity: opacity };
    });

    // ── Particles ──
    const pCount = mobile ? 60 : 130;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const pVelocities = [];
    const pColors4 = [
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x60a5fa),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0xffffff),
    ];
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 5.6;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 5.2;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
      const c = pColors4[Math.floor(Math.random() * pColors4.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
      pVelocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({
      size: mobile ? 0.032 : 0.026,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    particles.renderOrder = 3;
    scene.add(particles);

    // ── Mouse tracking ──
    let targetMouseX = 0, targetMouseY = 0;
    let currentMouseX = 0, currentMouseY = 0;
    let isHovered = false;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { targetMouseX = 0; targetMouseY = 0; isHovered = false; };
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);

    // ── Resize ──
    const onResize = () => {
      const mob = window.innerWidth < 768;
      const nW = mob ? Math.min(window.innerWidth - 32, 360) : (window.innerWidth < 1024 ? 460 : 560);
      const nH = mob ? 430 : (window.innerWidth < 1024 ? 540 : 620);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      timeUniform.value = elapsed;

      // Smooth mouse
      const lerpFactor = 0.06;
      currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
      currentMouseY += (targetMouseY - currentMouseY) * lerpFactor;

      mouseUniform.x = currentMouseX;
      mouseUniform.y = currentMouseY;
      hoverUniform.value += (isHovered ? 1.0 : 0.0 - hoverUniform.value) * 0.05;

      if (!reducedMotion) {
        // Portrait float & breathe
        portraitGroup.position.y = Math.sin(elapsed * 0.7) * 0.06;
        const breathScale = 1 + Math.sin(elapsed * 0.8) * 0.012;
        portraitGroup.scale.setScalar(breathScale);

        // Mouse-driven rotation
        portraitGroup.rotation.y = currentMouseX * 0.18;
        portraitGroup.rotation.x = -currentMouseY * 0.14;
        portraitGroup.position.x = currentMouseX * 0.10;

        // Camera parallax
        camera.position.x = currentMouseX * 0.16;
        camera.position.y = currentMouseY * 0.12;
        camera.lookAt(0, 0, 0);

        // Rings
        rings.forEach(({ line, mat, speed, dir, baseOpacity }) => {
          line.rotation.y += speed * 0.012 * dir;
          mat.opacity = baseOpacity * (0.85 + 0.15 * Math.sin(elapsed * 0.9));
        });

        // Particles
        const pos = pGeo.attributes.position;
        for (let i = 0; i < pCount; i++) {
          const v = pVelocities[i];
          pos.array[i * 3]     += v.x + Math.sin(elapsed * 0.4 + v.phase) * 0.001 + currentMouseX * 0.0008;
          pos.array[i * 3 + 1] += v.y + Math.cos(elapsed * 0.35 + v.phase) * 0.001 + currentMouseY * 0.0008;
          pos.array[i * 3 + 2] += v.z;

          // Wrap
          if (pos.array[i * 3] >  2.8) pos.array[i * 3] = -2.8;
          if (pos.array[i * 3] < -2.8) pos.array[i * 3] =  2.8;
          if (pos.array[i * 3 + 1] >  2.6) pos.array[i * 3 + 1] = -2.6;
          if (pos.array[i * 3 + 1] < -2.6) pos.array[i * 3 + 1] =  2.6;
          if (pos.array[i * 3 + 2] >  1.2) pos.array[i * 3 + 2] = -1.2;
          if (pos.array[i * 3 + 2] < -1.2) pos.array[i * 3 + 2] =  1.2;
        }
        pos.needsUpdate = true;
        pMat.opacity = 0.65 + isHovered * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, clock };

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      planeGeo.dispose();
      planeMat.dispose();
      glowGeo.dispose();
      glowMeshes.forEach(m => m.material.dispose());
      rings.forEach(({ line }) => { line.geometry.dispose(); line.material.dispose(); });
      pGeo.dispose();
      pMat.dispose();
      texture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [imageSrc, reducedMotion]);

  if (webglFailed) return <FallbackPortrait imageSrc={imageSrc} />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24, filter: 'blur(16px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: isMobile ? '100%' : undefined,
        maxWidth: isMobile ? 360 : undefined,
        flexShrink: 0,
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: isMobile ? '100%' : undefined,
          height: isMobile ? 430 : undefined,
          lineHeight: 0,
          cursor: 'default',
          userSelect: 'none',
        }}
      />
    </motion.div>
  );
}