import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useAnimationFrame } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';

const SKILLS = [
  { name: 'Python', tooltip: 'Core language for ML, automation & pipelines', color: '#3b82f6', size: 52 },
  { name: 'SQL', tooltip: 'High-frequency querying across Teradata & BigQuery', color: '#06b6d4', size: 48 },
  { name: 'Teradata', tooltip: 'Enterprise-scale data warehouse at 40M+ subscriber level', color: '#f97316', size: 44 },
  { name: 'BigQuery', tooltip: 'Google cloud analytics for OTT & telecom reporting', color: '#4285F4', size: 44 },
  { name: 'Apache Airflow', tooltip: 'Pipeline orchestration across data systems', color: '#017CEE', size: 40 },
  { name: 'Looker', tooltip: 'Executive KPI dashboards and BI reporting', color: '#4285F4', size: 40 },
  { name: 'Mixpanel', tooltip: 'OTT product analytics and user behavior tracking', color: '#7856ff', size: 38 },
  { name: 'GA4', tooltip: 'Digital analytics and conversion tracking', color: '#f97316', size: 36 },
  { name: 'MSTR', tooltip: 'MicroStrategy enterprise reporting', color: '#e11d48', size: 36 },
  { name: 'Machine Learning', tooltip: 'Predictive modeling, classification, regression', color: '#8b5cf6', size: 50 },
  { name: 'LLMs', tooltip: 'AI chatbot & natural language analytics systems', color: '#06b6d4', size: 46 },
  { name: 'Predictive Modeling', tooltip: 'Demand forecasting, churn prediction, stock runout', color: '#10b981', size: 44 },
  { name: 'Customer 360', tooltip: 'Full-profile behavioral intelligence per subscriber', color: '#f59e0b', size: 42 },
  { name: 'Personalization', tooltip: 'Trigger-based engagement & hyper-targeted campaigns', color: '#ec4899', size: 40 },
  { name: 'KPI Design', tooltip: 'Board-level metrics and business impact measurement', color: '#06b6d4', size: 38 },
  { name: 'Data Pipelines', tooltip: 'End-to-end ETL across Teradata, BigQuery, Python', color: '#3b82f6', size: 40 },
];

// Fibonacci sphere distribution for beautiful initial positions
function getFibonacciSphere(n, radius) {
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({
      x: Math.cos(theta) * r * radius,
      y: y * radius * 0.55,
    });
  }
  return pts;
}

const BASE_POSITIONS = getFibonacciSphere(SKILLS.length, 1);

// Connection pairs (indices)
const CONNECTIONS = [
  [0, 1], [0, 11], [1, 2], [1, 3], [2, 3], [3, 4],
  [4, 15], [5, 6], [5, 7], [9, 10], [9, 11], [10, 12],
  [12, 13], [0, 9], [1, 15], [6, 8],
];

export default function SkillGalaxy() {
  const containerRef = useRef(null);
  const [ref, isVisible] = useScrollReveal(0.1);
  const [tooltip, setTooltip] = useState(null);
  const [dims, setDims] = useState({ w: 700, h: 500 });
  const [positions, setPositions] = useState(BASE_POSITIONS.map(p => ({ x: 0, y: 0 })));
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDims({ w: rect.width, h: rect.height });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const cx = dims.w / 2;
    const cy = dims.h / 2;
    const rx = Math.min(dims.w * 0.42, 320);
    const ry = Math.min(dims.h * 0.42, 210);

    const animate = (timestamp) => {
      timeRef.current = timestamp * 0.0004;
      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;

      const newPos = BASE_POSITIONS.map((base, i) => {
        const orbit = timeRef.current + i * 0.38;
        const wobble = Math.sin(orbit * 0.7 + i) * 6;
        const px = cx + (base.x * rx) + mx * 38 + Math.cos(orbit + i) * 4 + wobble;
        const py = cy + (base.y * ry) + my * 22 + Math.sin(orbit * 0.8 + i) * 4;
        return { x: px, y: py };
      });
      setPositions(newPos);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, dims]);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Space nebula background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Skill Galaxy</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-3">
            The <span className="text-gradient">Technology Universe</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Hover over any orb to explore the tools powering decisions at telecom scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.3 }}
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => { mouseRef.current = { x: 0.5, y: 0.5 }; setTooltip(null); }}
          className="relative w-full"
          style={{ height: 'min(520px, 70vw)' }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {isVisible && CONNECTIONS.map(([a, b], i) => {
              const pa = positions[a];
              const pb = positions[b];
              if (!pa || !pb) return null;
              return (
                <motion.line
                  key={i}
                  x1={pa.x} y1={pa.y}
                  x2={pb.x} y2={pb.y}
                  stroke="rgba(99,102,241,0.18)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                />
              );
            })}
          </svg>

          {SKILLS.map((skill, i) => {
            const pos = positions[i] || { x: dims.w / 2, y: dims.h / 2 };
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.05, type: 'spring', stiffness: 200, damping: 18 }}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: tooltip?.index === i ? 20 : 10,
                }}
                onMouseEnter={() => setTooltip({ index: i, skill })}
                onMouseLeave={() => setTooltip(null)}
                whileHover={{ scale: 1.22, zIndex: 20 }}
                className="cursor-pointer select-none"
              >
                {/* Orb */}
                <div
                  className="relative flex items-center justify-center rounded-full font-heading font-bold text-[10px] md:text-xs text-white transition-all duration-300"
                  style={{
                    width: skill.size,
                    height: skill.size,
                    background: `radial-gradient(circle at 35% 35%, ${skill.color}cc, ${skill.color}55)`,
                    boxShadow: tooltip?.index === i
                      ? `0 0 24px ${skill.color}99, 0 0 48px ${skill.color}44`
                      : `0 0 10px ${skill.color}44`,
                    border: `1.5px solid ${skill.color}55`,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    padding: '4px',
                  }}
                >
                  <span style={{ fontSize: skill.size > 44 ? 10 : 9 }}>{skill.name}</span>
                  {/* Pulse ring */}
                  {tooltip?.index === i && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: `${skill.color}22`, animationDuration: '1.2s' }}
                    />
                  )}
                </div>

                {/* Tooltip */}
                {tooltip?.index === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute z-30 w-48 pointer-events-none"
                    style={{
                      bottom: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="glass rounded-xl px-3 py-2 text-center border border-border/60">
                      <p className="text-xs font-semibold text-foreground mb-0.5">{skill.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-snug">{skill.tooltip}</p>
                    </div>
                    <div className="w-2 h-2 bg-card/80 border-b border-r border-border/60 rotate-45 mx-auto -mt-1" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}