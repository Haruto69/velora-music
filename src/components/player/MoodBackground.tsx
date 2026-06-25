import { motion } from 'framer-motion';

interface MoodBackgroundProps {
  genre?: string;
  mood?: string;
  coverUrl?: string;
}

export function MoodBackground({ genre, mood, coverUrl }: MoodBackgroundProps) {
  // Simple mapping for mood/genre to colors
  const getColors = () => {
    const combined = `${genre || ''} ${mood || ''}`.toLowerCase();
    
    if (combined.includes('synthwave') || combined.includes('energetic')) {
      return { from: 'from-violet-600/30', to: 'to-fuchsia-600/20', via: 'via-cyan-900/30' };
    }
    if (combined.includes('chill') || combined.includes('melancholic')) {
      return { from: 'from-blue-600/30', to: 'to-indigo-900/20', via: 'via-teal-800/20' };
    }
    if (combined.includes('driving') || combined.includes('retrowave')) {
      return { from: 'from-orange-600/30', to: 'to-red-900/20', via: 'via-purple-900/30' };
    }
    
    // Default fallback
    return { from: 'from-primary/20', to: 'to-background', via: 'via-background' };
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} transition-colors duration-1000 ease-in-out`} />
      
      {/* Cover art blurred glow */}
      {coverUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute inset-[-20%] z-0"
          style={{
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px) saturate(150%)',
          }}
        />
      )}
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
    </div>
  );
}
