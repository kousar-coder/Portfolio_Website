import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_SIZE = 32;

const TechCursor = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      x.set(e.clientX - CURSOR_SIZE / 2);
      y.set(e.clientY - CURSOR_SIZE / 2);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x: springX,
        y: springY,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        mixBlendMode: 'lighten',
      }}
    >
      <svg width={CURSOR_SIZE} height={CURSOR_SIZE} viewBox={`0 0 ${CURSOR_SIZE} ${CURSOR_SIZE}`}>
        <circle
          cx={CURSOR_SIZE / 2}
          cy={CURSOR_SIZE / 2}
          r={12}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={2.5}
          style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }}
        />
        <circle
          cx={CURSOR_SIZE / 2}
          cy={CURSOR_SIZE / 2}
          r={4}
          fill="#38bdf8"
          style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }}
        />
      </svg>
    </motion.div>
  );
};

export default TechCursor; 