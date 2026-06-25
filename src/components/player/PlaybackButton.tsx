import { usePlayerStore } from '../../store/playerStore';
import { Play, Pause } from 'lucide-react';

export function PlaybackButton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const togglePlay = usePlayerStore(state => state.togglePlay);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 28
  };
  
  const buttonSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  return (
    <button 
      onClick={togglePlay}
      disabled={!currentTrack}
      className={`${buttonSizes[size]} rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none`}
    >
      {isPlaying ? (
        <Pause size={iconSizes[size]} className="fill-current" />
      ) : (
        <Play size={iconSizes[size]} className="ml-1 fill-current" />
      )}
    </button>
  );
}
