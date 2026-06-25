import { motion } from 'framer-motion';

interface AnimatedAlbumCoverProps {
  imageUrl: string;
  isPlaying: boolean;
}

export function AnimatedAlbumCover({ imageUrl, isPlaying }: AnimatedAlbumCoverProps) {
  return (
    <div className="relative w-full max-w-[300px] md:max-w-[450px] aspect-square mx-auto">
      {/* Background massive glow */}
      <motion.div
        animate={{ 
          scale: isPlaying ? [1, 1.05, 1] : 1,
          opacity: isPlaying ? [0.4, 0.6, 0.4] : 0.2
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) saturate(200%)',
          transform: 'translateY(10%) scale(0.9)',
        }}
      />
      
      {/* The main cover art */}
      <motion.div
        animate={{ 
          y: isPlaying ? [-5, 5, -5] : 0,
          scale: isPlaying ? 1.02 : 1
        }}
        transition={{ 
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.5,
            ease: "easeOut"
          }
        }}
        className="relative z-10 w-full h-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10"
      >
        <img 
          src={imageUrl} 
          alt="Now Playing Cover" 
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
