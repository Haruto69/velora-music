import { motion } from 'framer-motion';

export default function NowPlaying() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 md:p-10 flex flex-col items-center justify-center min-h-[60vh]"
    >
      <h1 className="text-3xl font-bold mb-8">Now Playing</h1>
      <p className="text-muted-foreground">Full screen player and visualizer will be implemented in Phase 2.</p>
    </motion.div>
  );
}
