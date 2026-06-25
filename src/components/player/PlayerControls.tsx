import { SkipBack, SkipForward } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import { PlaybackButton } from './PlaybackButton';

export function PlayerControls() {
  const nextTrack = usePlayerStore(state => state.nextTrack);
  const previousTrack = usePlayerStore(state => state.previousTrack);
  const activeTrackList = usePlayerStore(state => state.activeTrackList);
  const currentIndex = usePlayerStore(state => state.currentIndex);
  
  const hasPrevious = activeTrackList.length > 0 && currentIndex > 0;
  // Let the user click next even at the end, the store will stop playback cleanly
  const hasNext = activeTrackList.length > 0;

  return (
    <div className="flex items-center gap-4 md:gap-6">
      <button 
        onClick={previousTrack}
        disabled={!hasPrevious}
        className="text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
      >
        <SkipBack size={24} className="fill-current" />
      </button>
      
      <PlaybackButton size="md" />
      
      <button 
        onClick={nextTrack}
        disabled={!hasNext}
        className="text-muted-foreground hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
      >
        <SkipForward size={24} className="fill-current" />
      </button>
    </div>
  );
}
