import { SkipBack, SkipForward } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import { PlaybackButton } from './PlaybackButton';
import { ShuffleButton } from './ShuffleButton';
import { RepeatButton } from './RepeatButton';
import { MagneticButton } from '../animations/MagneticButton';

interface PlayerControlsProps {
  showExtraControlsOnMobile?: boolean;
}

export function PlayerControls({ showExtraControlsOnMobile = false }: PlayerControlsProps) {
  const nextTrack = usePlayerStore(state => state.nextTrack);
  const previousTrack = usePlayerStore(state => state.previousTrack);
  const queue = usePlayerStore(state => state.queue);
  const currentIndex = usePlayerStore(state => state.currentIndex);
  
  // Update disabled logic based on the actual queue
  const hasPrevious = queue.length > 0 && currentIndex > 0;
  const hasNext = queue.length > 0; // The store handles the end behavior

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className={showExtraControlsOnMobile ? "block" : "hidden md:block"}>
        <ShuffleButton />
      </div>
      
      <button 
        onClick={previousTrack}
        disabled={!hasPrevious && queue.length === 0}
        className="text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
      >
        <SkipBack size={24} className="fill-current" />
      </button>
      
      <MagneticButton strength={8}>
        <PlaybackButton size="md" />
      </MagneticButton>
      
      <button 
        onClick={nextTrack}
        disabled={!hasNext}
        className="text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
      >
        <SkipForward size={24} className="fill-current" />
      </button>

      <div className={showExtraControlsOnMobile ? "block" : "hidden md:block"}>
        <RepeatButton />
      </div>
    </div>
  );
}
