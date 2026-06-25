import { Play, X } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';

interface QueueItemProps {
  song: Song;
  index: number;
  isActive: boolean;
  onRemove: (index: number) => void;
  onPlay: (index: number) => void;
}

export function QueueItem({ song, index, isActive, onRemove, onPlay }: QueueItemProps) {
  const isPlaying = usePlayerStore(state => state.isPlaying);

  return (
    <div className={`flex items-center gap-3 py-2 px-3 rounded-xl group transition-all duration-300 ${isActive ? 'bg-primary/10 border border-primary/20 shadow-md' : 'hover:bg-white/5 border border-transparent'}`}>
      <div 
        onClick={() => onPlay(index)}
        className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 shadow-sm cursor-pointer group-hover:shadow-md transition-shadow"
      >
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'bg-black/40 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
          {isActive && isPlaying ? (
            <div className="flex items-end justify-center gap-[2px] h-3 w-3">
              <div className="w-[2px] bg-white animate-[bounce_1s_infinite] h-full rounded-t-sm"></div>
              <div className="w-[2px] bg-white animate-[bounce_1s_infinite_0.2s] h-2/3 rounded-t-sm"></div>
              <div className="w-[2px] bg-white animate-[bounce_1s_infinite_0.4s] h-full rounded-t-sm"></div>
            </div>
          ) : (
            <Play size={16} className="text-white fill-current ml-0.5" />
          )}
        </div>
      </div>
      
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onPlay(index)}>
        <h4 className={`font-medium truncate text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {song.title}
        </h4>
        <p className="text-muted-foreground text-xs truncate">{song.artistName}</p>
      </div>

      <button 
        onClick={() => onRemove(index)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-red-500/20 hover:text-red-400 md:opacity-0 md:group-hover:opacity-100"
        title="Remove from queue"
        aria-label="Remove from queue"
      >
        <X size={16} />
      </button>
    </div>
  );
}
