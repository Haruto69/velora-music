import { motion } from 'framer-motion';

interface LyricsPanelProps {
  lyrics?: string[];
}

export function LyricsPanel({ lyrics }: LyricsPanelProps) {
  if (!lyrics || lyrics.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-full min-h-[300px]">
        <p className="text-muted-foreground/60 text-lg md:text-xl font-medium tracking-wide">
          Lyrics unavailable for this demo track.
        </p>
      </div>
    );
  }

  // For Phase 6 demo, we just highlight the 3rd line or middle line statically
  const activeLineIndex = Math.min(2, lyrics.length - 1);

  return (
    <div className="flex-1 w-full h-full min-h-[300px] overflow-y-auto scrollbar-hide flex flex-col pt-10 pb-32 md:py-20 px-4 md:px-0 mask-image-fade">
      <div className="space-y-6 md:space-y-8 max-w-xl mx-auto w-full">
        {lyrics.map((line, index) => {
          const isActive = index === activeLineIndex;
          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-2xl md:text-4xl font-bold leading-tight transition-colors duration-500 cursor-pointer hover:opacity-80
                ${isActive ? 'text-white scale-[1.02] transform-origin-left' : 'text-white/50'}`}
            >
              {line}
            </motion.p>
          );
        })}
      </div>
    </div>
  );
}
