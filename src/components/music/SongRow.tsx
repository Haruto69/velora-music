import { useState } from 'react';
import { Play, Plus, ListPlus } from 'lucide-react';
import { Song } from '../../types/music';
import { formatTime } from '../../utils/formatTime';
import { usePlayerStore } from '../../store/playerStore';
import { LikeButton } from '../library/LikeButton';
import { AddToPlaylistModal } from '../playlist/AddToPlaylistModal';

interface SongRowProps {
  song: Song;
  index: number;
  contextList?: Song[];
}

export function SongRow({ song, index, contextList }: SongRowProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
      className={`flex items-center gap-4 py-2 px-4 rounded-xl group transition-all duration-300 cursor-pointer border overflow-hidden relative ${isActive ? 'bg-primary/10 border-primary/20 shadow-[0_4px_20px_rgba(139,92,246,0.1)]' : 'border-transparent hover:bg-white/5 hover:border-white/5 hover:shadow-md'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-8 flex justify-center text-muted-foreground group-hover:text-foreground relative z-10">
        {isActive ? (
          <button className="text-primary hover:scale-110 transition-transform flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-[2px] h-4 w-4">
                <div className="w-[3px] bg-primary animate-[bounce_1s_infinite] h-full rounded-t-sm"></div>
                <div className="w-[3px] bg-primary animate-[bounce_1s_infinite_0.2s] h-2/3 rounded-t-sm"></div>
                <div className="w-[3px] bg-primary animate-[bounce_1s_infinite_0.4s] h-full rounded-t-sm"></div>
              </div>
            ) : (
              <Play size={16} className="fill-current" />
            )}
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

      <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 shadow-sm relative z-10 group-hover:shadow-md transition-shadow">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <h4 className={`font-medium truncate text-sm transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/90'}`}>
          {song.title}
        </h4>
        <p className="text-muted-foreground text-xs truncate">{song.artistName}</p>
      </div>

      <div className="hidden md:block flex-1 min-w-0 text-muted-foreground text-sm truncate relative z-10">
        {song.albumTitle || 'Single'}
      </div>

      <div className="flex items-center gap-4 text-muted-foreground relative z-10">
        <LikeButton songId={song.id} />
        <span className={`text-sm w-10 text-right ${isActive ? 'text-primary' : ''}`}>{formatTime(song.duration)}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsAddModalOpen(true); }}
          className="hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white/10 p-1.5 rounded-full" 
          title="Add to playlist"
        >
          <ListPlus size={18} />
        </button>
        <button 
          onClick={handleAddToQueue}
          className="hover:text-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white/10 p-1.5 rounded-full" 
          title="Add to queue"
        >
          <Plus size={18} />
        </button>
      </div>
      <AddToPlaylistModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} songId={song.id} />
    </div>
  );
}
