import { Repeat, Repeat1 } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';

export function RepeatButton() {
  const repeatMode = usePlayerStore(state => state.repeatMode);
  const cycleRepeatMode = usePlayerStore(state => state.cycleRepeatMode);

  return (
    <button 
      onClick={cycleRepeatMode}
      className={`transition-colors hidden sm:block ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
      title={`Repeat: ${repeatMode}`}
    >
      {repeatMode === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
    </button>
  );
}
