import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CustomCursor replaces the default browser pointer with a physics-based, 
 * magnetic circle that reacts to interactive elements via data-attributes.
 */
export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth physics for the "Magnetic" lag feel
  const springConfig = { stiffness: 450, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Find the nearest element with the data-cursor attribute
      const target = e.target.closest('[data-cursor]');
      const variant = target ? target.getAttribute('data-cursor') : 'default';
      setCursorVariant(variant);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  // Cursor style variants for different interactions
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'rgba(139, 92, 246, 1)',
      border: '0px solid transparent'
    },
    pointer: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      border: '1px solid rgba(139, 92, 246, 0.5)',
    },
    card: {
      width: 90,
      height: 90,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(4px)',
    }
  };

  const currentStyle = variants[cursorVariant] || variants.default;

  return (
    <>
      {/* Magnetic Outer Ring */}
      <motion.div
        animate={{
          width: currentStyle.width,
          height: currentStyle.height,
          backgroundColor: currentStyle.backgroundColor,
          border: currentStyle.border,
          backdropFilter: currentStyle.backdropFilter || 'blur(0px)'
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      
      {/* Inner Precision Dot (no lag) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 4,
          height: 4,
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: cursorVariant === 'card' ? 0 : 1
        }}
      />
    </>
  );
}