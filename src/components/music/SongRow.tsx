import { Play, Pause, Heart, Plus } from 'lucide-react';
import { Song } from '../../types/music';
import { formatTime } from '../../utils/formatTime';
import { usePlayerStore } from '../../store/playerStore';

interface SongRowProps {
  song: Song;
  index: number;
  contextList?: Song[];
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export function SongRow({ song, index, contextList, isLiked, onToggleLike }: SongRowProps) {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const playTrack = usePlayerStore(state => state.playTrack);
  const togglePlay = usePlayerStore(state => state.togglePlay);
  const addToQueue = usePlayerStore(state => state.addToQueue);

  const isActive = currentTrack?.id === song.id;

  const handlePlayClick = () => {
    if (isActive) {
      togglePlay();
    } else {
      playTrack(song, contextList);
    }
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
  };

  return (
    <div 
      onClick={handlePlayClick}
      className={`flex items-center gap-4 py-2 px-4 rounded-md hover:bg-white/5 group transition-colors cursor-pointer ${isActive ? 'bg-white/5' : ''}`}
    >
      <div className="w-8 flex justify-center text-muted-foreground group-hover:text-foreground">
        {isActive ? (
          <button className="text-primary hover:scale-110 transition-transform">
            {isPlaying ? <Pause size={16} className="fill-current" /> : <Play size={16} className="fill-current" />}
          </button>
        ) : (
          <>
            <span className="group-hover:hidden text-sm">{index}</span>
            <button className="hidden group-hover:block text-primary hover:scale-110 transition-transform">
              <Play size={16} className="fill-current ml-0.5" />
            </button>
          </>
        )}
      </div>

      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white/10 shadow-sm relative">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
        {isActive && isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-4 h-4 flex items-end justify-center gap-[2px]">
              <div className="w-1 bg-primary animate-[bounce_1s_infinite] h-full"></div>
              <div className="w-1 bg-primary animate-[bounce_1s_infinite_0.2s] h-2/3"></div>
              <div className="w-1 bg-primary animate-[bounce_1s_infinite_0.4s] h-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {song.title}
        </h4>
        <p className="text-muted-foreground text-xs truncate">{song.artistName}</p>
      </div>

      <div className="hidden md:block flex-1 min-w-0 text-muted-foreground text-sm truncate">
        {song.albumTitle || 'Single'}
      </div>

      <div className="flex items-center gap-4 text-muted-foreground">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleLike?.(); }}
          className={`hover:text-foreground transition-colors ${isLiked ? 'text-primary' : ''}`}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
        </button>
        <span className={`text-sm w-10 text-right ${isActive ? 'text-primary' : ''}`}>{formatTime(song.duration)}</span>
        <button 
          onClick={handleAddToQueue}
          className="hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" 
          title="Add to queue"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
