import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

export function AudioVisualizer({ isPlaying, barCount = 12 }: AudioVisualizerProps) {
  // Generate random heights for the bars
  const bars = Array.from({ length: barCount }, (_, i) => ({
    id: i,
    minHeight: Math.random() * 10 + 5,
    maxHeight: Math.random() * 40 + 20,
    delay: Math.random() * 0.5,
    duration: Math.random() * 0.3 + 0.4,
  }));

  return (
    <div className="flex items-end gap-1 h-12 justify-center">
      {bars.map((bar) => (
        <motion.div
          key={bar.id}
          className="w-1.5 rounded-t-sm bg-primary"
          initial={{ height: bar.minHeight }}
          animate={{
            height: isPlaying ? [bar.minHeight, bar.maxHeight, bar.minHeight] : bar.minHeight,
            opacity: isPlaying ? 0.8 : 0.3
          }}
          transition={{
            duration: bar.duration,
            delay: bar.delay,
            repeat: isPlaying ? Infinity : 0,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
