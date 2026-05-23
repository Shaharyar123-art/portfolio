import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard adds a hardware-accelerated 3D tilt effect and a
 * mouse-tracking glow overlay to cards. Optimized for 60fps performance.
 */
export default function TiltCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to card (0 to 1 range)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Buttery smooth physics for the tilt
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map the 0-1 range to degree rotations
  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);

  // Dedicated glow coordinates (absolute pixels)
  const glowX = useSpring(0, { stiffness: 400, damping: 40 });
  const glowY = useSpring(0, { stiffness: 400, damping: 40 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Set normalized values (0 to 1) for rotations
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);

    // Set pixel values for the glow gradient
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset back to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="card"
      className={`card ${className}`}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
        willChange: 'transform',
        zIndex: isHovered ? 10 : 1
      }}
    >
      {/* Premium Shine Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: useTransform(
            [mouseX, mouseY],
            ([mx, my]) => `radial-gradient(circle at ${mx * 100}% ${my * 100}%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)`
          ),
          borderRadius: 'inherit',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Dynamic Glow Border/Background Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -1,
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
      <div style={{ transform: 'translateZ(20px)', height: '100%', width: '100%', position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
