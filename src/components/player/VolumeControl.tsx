import { Volume2, VolumeX } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';

export function VolumeControl() {
  const volume = usePlayerStore(state => state.volume);
  const isMuted = usePlayerStore(state => state.isMuted);
  const setVolume = usePlayerStore(state => state.setVolume);
  const toggleMute = usePlayerStore(state => state.toggleMute);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
  };

  const currentVolume = isMuted ? 0 : volume;
  const volumePercent = currentVolume * 100;

  return (
    <div className="flex items-center justify-end gap-3 w-1/3 hidden md:flex">
      <button 
        onClick={toggleMute}
        className="text-muted-foreground hover:text-white transition-colors"
      >
        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      
      <div className="relative w-24 h-1 group cursor-pointer flex items-center">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01"
          value={currentVolume} 
          onChange={handleVolumeChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden absolute">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${volumePercent}%` }}
          />
        </div>
        <div 
          className="absolute h-3 w-3 bg-white rounded-full shadow-md transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"
          style={{ left: `${volumePercent}%` }}
        />
      </div>
    </div>
  );
}
