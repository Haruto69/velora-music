import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Song } from '../../types/music';
import { formatTime } from '../../utils/formatTime';

interface SongRowProps {
  song: Song;
  index: number;
  onPlay?: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export function SongRow({ song, index, onPlay, isLiked, onToggleLike }: SongRowProps) {
  return (
    <div className="flex items-center gap-4 py-2 px-4 rounded-md hover:bg-white/5 group transition-colors cursor-pointer">
      <div className="w-8 flex justify-center text-muted-foreground group-hover:text-foreground">
        <span className="group-hover:hidden text-sm">{index}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onPlay?.(); }}
          className="hidden group-hover:block text-primary hover:scale-110 transition-transform"
        >
          <Play size={16} className="fill-current" />
        </button>
      </div>

      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-white/10">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-foreground font-medium truncate text-sm">{song.title}</h4>
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
        <span className="text-sm w-10 text-right">{formatTime(song.duration)}</span>
        <button className="hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
