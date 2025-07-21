import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffect: React.FC = () => (
  <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vertical lines */}
      {[...Array(20)].map((_, i) => (
        <line key={i} x1={i * 72} y1="0" x2={i * 72} y2="800" stroke="#1e293b" strokeWidth="1" opacity="0.18" />
      ))}
      {/* Horizontal lines */}
      {[...Array(10)].map((_, i) => (
        <line key={i} y1={i * 80} x1="0" y2={i * 80} x2="1440" stroke="#1e293b" strokeWidth="1" opacity="0.18" />
      ))}
      {/* Flowing animated line */}
      <motion.path
        d="M0,400 Q360,350 720,400 T1440,400"
        stroke="#38bdf8"
        strokeWidth="2.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }}
      />
    </svg>
    {/* Soft glow overlay for text contrast */}
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.08) 0%, transparent 70%)' }} />
    {/* Optional: dark overlay for extra contrast */}
    <div className="absolute inset-0 bg-black/60" />
  </div>
);

export default BackgroundEffect; 