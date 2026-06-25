import { motion } from 'framer-motion';

interface GradientOrbProps {
  color: string;
  size: string;
  top: string;
  left: string;
  animationDuration?: number;
  animationDelay?: number;
}

export function GradientOrb({ color, size, top, left, animationDuration = 20, animationDelay = 0 }: GradientOrbProps) {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-screen opacity-30"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        width: size,
        height: size,
        top,
        left,
        filter: 'blur(80px)',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 60, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: animationDuration,
        delay: animationDelay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
