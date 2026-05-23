import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic component wraps any interactive element (like buttons)
 * and pulls it towards the user's cursor using spring physics on hover.
 */
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find the center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate the distance from mouse to center, scaled by strength
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 150, // fast reaction
        damping: 15,    // smooth settle
        mass: 0.1       // low inertia for snappiness
      }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}
