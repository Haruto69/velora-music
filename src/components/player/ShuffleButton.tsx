import { Shuffle } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';

export function ShuffleButton() {
  const isShuffleEnabled = usePlayerStore(state => state.isShuffleEnabled);
  const toggleShuffle = usePlayerStore(state => state.toggleShuffle);

  return (
    <button 
      onClick={toggleShuffle}
      className={`transition-colors hidden sm:block ${isShuffleEnabled ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
      title="Shuffle"
    >
      <Shuffle size={18} />
    </button>
  );
}
