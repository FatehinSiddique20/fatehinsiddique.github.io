import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './useScrollReveal';

const EASING = [0.22, 1, 0.36, 1];

const NODES = [
  { id: 'center', label: 'Fatehin', sub: 'Data Science Manager', color: '#06b6d4', size: 72, x: 50, y: 50 },
  { id: 'bi', label: 'BI Teams', sub: 'Dashboards & KPIs', color: '#3b82f6', size: 52, x: 80, y: 20 },
  { id: 'product', label: 'Product', sub: 'Analytics & Growth', color: '#8b5cf6', size: 52, x: 85, y: 58 },
  { id: 'marketing', label: 'Marketing', sub: 'Campaign Intelligence', color: '#ec4899', size: 50, x: 70, y: 85 },
  { id: 'regional', label: 'Regional', sub: 'Field Operations', color: '#f97316', size: 48, x: 30, y: 85 },
  { id: 'leadership', label: 'Leadership', sub: 'Executive Insights', color: '#f59e0b', size: 52, x: 15, y: 55 },
  { id: 'tech', label: 'Engineering', sub: 'Data Infrastructure', color: '#10b981', size: 50, x: 20, y: 22 },
  { id: 'finance', label: 'Finance', sub: 'Revenue Analytics', color: '#06b6d4', size: 46, x: 50, y: 12 },
];

const CONNECTIONS = ['bi','product','marketing','regional','leadership','tech','finance'];

const points = [
  "I don't just build models. I build systems that teams adopt.",
  'Translated ambiguous business problems into measurable data products.',
  'Built analytics that non-technical stakeholders can actually use.',
  'Reduced dependency on manual BI queues across the org.',
  'Enabled faster cross-functional decisions at 40M+ subscriber scale.',
];

function getPx(pct, max) { return (pct / 100) * max; }

export default function TeamPlayerSection() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 500, h: 380 });
  const [pulses, setPulses] = useState([]);
  const pulseRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSize({ w: rect.width, h: rect.height });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let idx = 0;
    pulseRef.current = setInterval(() => {
      const nodeIdx = (idx % (NODES.length - 1)) + 1;
      const node = NODES[nodeIdx];
      setPulses(prev => [...prev.slice(-6), { id: Date.now(), nodeId: node.id }]);
      idx++;
    }, 700);
    return () => clearInterval(pulseRef.current);
  }, [isVisible]);

  const center = NODES[0];
  const cx = getPx(center.x, size.w);
  const cy = getPx(center.y, size.h);

  return (
    <section id="team" className="relative py-16 md:py-22 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/2 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Collaboration</span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-3">
            Built With Teams,<br />
            <span className="text-gradient">Adopted By Teams</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            I bridge the gap between raw data and real decisions — across every function.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Network diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: EASING }}
            ref={containerRef}
            className="relative w-full rounded-2xl glass overflow-hidden"
            style={{ height: 380 }}
          >
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
              {/* Connection lines */}
              {NODES.slice(1).map((node, i) => {
                const nx = getPx(node.x, size.w);
                const ny = getPx(node.y, size.h);
                return (
                  <motion.line
                    key={node.id}
                    x1={cx} y1={cy} x2={nx} y2={ny}
                    stroke={`${node.color}35`}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  />
                );
              })}

              {/* Animated pulses */}
              {pulses.map(pulse => {
                const node = NODES.find(n => n.id === pulse.nodeId);
                if (!node) return null;
                const nx = getPx(node.x, size.w);
                const ny = getPx(node.y, size.h);
                return (
                  <motion.circle
                    key={pulse.id}
                    cx={cx} cy={cy} r={5}
                    fill={node.color}
                    initial={{ cx, cy, opacity: 1, r: 4 }}
                    animate={{ cx: nx, cy: ny, opacity: 0, r: 2 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    onAnimationComplete={() => setPulses(p => p.filter(x => x.id !== pulse.id))}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {NODES.map((node, i) => {
              const nx = getPx(node.x, size.w);
              const ny = getPx(node.y, size.h);
              const isCenter = node.id === 'center';
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, type: 'spring', stiffness: 220, damping: 16 }}
                  style={{
                    position: 'absolute',
                    left: nx,
                    top: ny,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isCenter ? 10 : 5,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="rounded-full flex items-center justify-center font-heading font-bold text-white text-[10px] md:text-xs"
                    style={{
                      width: node.size,
                      height: node.size,
                      background: isCenter
                        ? `radial-gradient(circle at 35% 35%, ${node.color}ee, ${node.color}88)`
                        : `radial-gradient(circle at 35% 35%, ${node.color}99, ${node.color}44)`,
                      boxShadow: isCenter
                        ? `0 0 30px ${node.color}66, 0 0 60px ${node.color}22`
                        : `0 0 12px ${node.color}44`,
                      border: `1.5px solid ${node.color}55`,
                      lineHeight: 1.2,
                      padding: '6px',
                      textAlign: 'center',
                    }}
                  >
                    {node.label}
                  </div>
                  {!isCenter && (
                    <p className="text-[9px] text-muted-foreground mt-1 max-w-[64px] leading-tight">{node.sub}</p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Points list */}
          <div className="space-y-4">
            {points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: EASING }}
                className="flex items-start gap-4 glass rounded-xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400 hover:-translate-y-0.5"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed font-medium">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}