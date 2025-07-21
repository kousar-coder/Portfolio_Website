import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      id="about"
      ref={ref}
      className="w-full flex items-center justify-center bg-[#181A1B] py-24 px-4"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          I’m a passionate developer building intelligent, impactful digital experiences.
        </h2>
        <p className="text-lg text-cyan-200 font-mono mb-0">
          Focused on AI, product innovation, and seamless user interfaces.
        </p>
      </div>
    </motion.section>
  );
};

export default About; 