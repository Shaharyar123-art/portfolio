import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * MouseGlow creates a smooth, floating cursor highlight in the background.
 * Automatically disables itself on mobile/tablets to ensure extreme performance.
 */
export default function MouseGlow() {
  const [isMobile, setIsMobile] = useState(true);
  
  // High damping and low stiffness for a fluid, floating movement
  const glowX = useSpring(0, { stiffness: 45, damping: 22 });
  const glowY = useSpring(0, { stiffness: 45, damping: 22 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e) => {
      if (window.innerWidth < 900) return;
      
      // Center the 500x500 radial glow on the cursor
      glowX.set(e.clientX - 250);
      glowY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [glowX, glowY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(20, 184, 166, 0.04) 40%, rgba(20, 184, 166, 0) 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0, // Behind content
        x: glowX,
        y: glowY,
        willChange: 'transform'
      }}
    />
  );
}
