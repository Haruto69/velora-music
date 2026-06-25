import { usePlayerStore } from '../../store/playerStore';
import { formatTime } from '../../utils/formatTime';

export function ProgressSlider() {
  const currentTime = usePlayerStore(state => state.currentTime);
  const duration = usePlayerStore(state => state.duration);
  const seekTo = usePlayerStore(state => state.seekTo);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full mt-2 flex items-center gap-2 hidden md:flex">
      <span className="text-[10px] text-muted-foreground w-8 text-right tabular-nums">
        {formatTime(currentTime)}
      </span>
      
      <div className="flex-1 relative h-1 group cursor-pointer flex items-center">
        <input 
          type="range" 
          min="0" 
          max={duration || 100} 
          value={currentTime} 
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden absolute">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div 
          className="absolute h-3 w-3 bg-white rounded-full shadow-md transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"
          style={{ left: `${progressPercent}%` }}
        />
      </div>
      
      <span className="text-[10px] text-muted-foreground w-8 tabular-nums">
        {formatTime(duration)}
      </span>
    </div>
  );
}
