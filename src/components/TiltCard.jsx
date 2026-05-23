import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

/**
 * TiltCard adds a hardware-accelerated 3D tilt effect and a
 * mouse-tracking glow overlay to service, project, and skill cards.
 */
export default function TiltCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  
  // Custom springs for buttery smooth, linear-like rotations
  const rotateX = useSpring(0, { stiffness: 180, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 20 });
  
  // Track relative coordinates of the cursor for the hover glow overlay
  const glowX = useSpring(0, { stiffness: 300, damping: 30 });
  const glowY = useSpring(0, { stiffness: 300, damping: 30 });
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates within the card (-width/2 to +width/2)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max rotations of 10 degrees
    const rX = -(mouseY / (height / 2)) * 8; // Negative because tilting up means looking up
    const rY = (mouseX / (width / 2)) * 8;
    
    rotateX.set(rX);
    rotateY.set(rY);
    
    // Set glow coordinates (absolute pixels relative to card top-left)
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        perspective: 1000,
        position: 'relative',
        willChange: 'transform'
      }}
    >
      {/* Dynamic Glow Overlay following mouse */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -1, // slightly wider to highlight borders
          borderRadius: 'inherit',
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
          ),
          pointerEvents: 'none',
          zIndex: 1,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          mixBlendMode: 'screen',
          border: '1px solid transparent',
        }}
        className="card-glow-overlay"
      />

      {/* Internal Content (Pushed out on Z-axis slightly for true 3D depth) */}
      <div style={{ transform: 'translateZ(15px)', height: '100%', width: '100%', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
