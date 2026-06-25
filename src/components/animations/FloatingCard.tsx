import { motion } from 'framer-motion';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: number;
}

export function FloatingCard({ children, className = '', delay = 0, hoverScale = 1.05 }: FloatingCardProps) {
  // Use a very subtle animation to avoid distraction, as per user's caution
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ 
        y: [-2, 2, -2],
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay 
      }}
      whileHover={{ 
        scale: hoverScale,
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}
