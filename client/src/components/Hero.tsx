import React from 'react';
import { motion, Variants } from 'framer-motion';

const AnimatedGrid = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
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
);

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: 'easeInOut', // Valid Framer Motion easing
    },
  },
};

const Hero = () => (
  <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-blue-950 overflow-hidden">
    <AnimatedGrid />
    <motion.div
      className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-[0_2px_16px_rgba(56,189,248,0.25)]">
        Welcome to the Future of Tech
      </h1>
      <div className="text-cyan-300 text-lg md:text-2xl mb-8 font-mono tracking-wider">
        AI Engineer | Full Stack Developer | Digital Innovator
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#projects" className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-semibold shadow hover:bg-cyan-500 transition border border-cyan-400/30 backdrop-blur-sm">View Projects</a>
        <a href="#contact" className="px-8 py-3 bg-slate-800 text-cyan-200 rounded-lg font-semibold shadow hover:bg-slate-700 transition border border-cyan-400/10 backdrop-blur-sm">Get in Touch</a>
      </div>
    </motion.div>
    {/* Soft glow overlay */}
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.08) 0%, transparent 70%)' }} />
  </section>
);

export default Hero; 