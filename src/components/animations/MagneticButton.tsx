import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
}

export function MagneticButton({ children, className = '', onClick, strength = 20 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Normalize to -1 -> 1
    const normalizedX = (clientX - centerX) / (width / 2);
    const normalizedY = (clientY - centerY) / (height / 2);
    
    x.set(normalizedX * strength);
    y.set(normalizedY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
