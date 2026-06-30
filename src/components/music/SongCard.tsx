import { useState } from 'react';
import { Play, Pause, Plus, ListPlus } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';
import { AlbumGlow } from '../animations/AlbumGlow';
import { MagneticButton } from '../animations/MagneticButton';
import { LikeButton } from '../library/LikeButton';
import { AddToPlaylistModal } from '../playlist/AddToPlaylistModal';

interface SongCardProps {
  song: Song;
  contextList?: Song[];
  variant?: 'default' | 'compact';
}

export function SongCard({ song, contextList, variant = 'default' }: SongCardProps) {
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

  if (variant === 'compact') {
    return (
      <div 
        onClick={handlePlayClick}
        className={`flex items-center gap-3 p-2 pr-4 rounded-xl transition-all duration-300 cursor-pointer group border overflow-hidden w-full relative ${isActive ? 'bg-primary/10 border-primary/30 shadow-md' : 'bg-white/5 backdrop-blur-md border-white/5 hover:bg-white/10 hover:border-white/10'}`}
      >
        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
          <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${isActive ? 'bg-black/40 opacity-100' : 'bg-black/50 opacity-0 group-hover:opacity-100'}`}>
            <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-md">
              {isActive && isPlaying ? <Pause size={14} className="fill-current" /> : <Play size={14} className="ml-0.5 fill-current" />}
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className={`font-semibold text-sm truncate mb-0.5 transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/90'}`}>{song.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md p-1 rounded-full shadow-xl pointer-events-none group-hover:pointer-events-auto">
          <LikeButton songId={song.id} className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center" />
          <button onClick={handleAddToQueue} className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition-colors" title="Add to queue"><Plus size={16} /></button>
          <button onClick={(e) => { e.stopPropagation(); setIsAddModalOpen(true); }} className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition-colors" title="Add to playlist"><ListPlus size={16} /></button>
        </div>

        <AddToPlaylistModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} songId={song.id} />
      </div>
    );
  }

  return (
    <div 
      onClick={handlePlayClick}
      className={`min-w-[130px] md:min-w-[150px] p-3 rounded-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 relative border overflow-hidden ${isActive ? 'bg-primary/10 border-primary/30 shadow-[0_8px_30px_rgba(139,92,246,0.2)]' : 'bg-white/5 backdrop-blur-md border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'}`}
    >
      {/* Optional: subtle background gradient inside the card on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={song.coverUrl} className="mb-3">
        <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
          <img 
            src={song.coverUrl} 
            alt={song.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${isActive ? 'bg-black/30 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
            <MagneticButton strength={15}>
              <button 
                className={`w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.6)] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500'}`}
              >
                {isActive && isPlaying ? (
                  <Pause size={18} className="fill-current" />
                ) : (
                  <Play size={18} className="ml-1 fill-current" />
                )}
              </button>
            </MagneticButton>
          </div>
        </div>
      </AlbumGlow>
      
      <LikeButton 
        songId={song.id} 
        className="absolute top-4 left-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 shadow-lg z-10" 
      />

      <button 
        onClick={handleAddToQueue}
        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:scale-110 shadow-lg z-10"
        title="Add to queue"
      >
        <Plus size={14} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); setIsAddModalOpen(true); }}
        className="absolute top-12 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:scale-110 shadow-lg z-10"
        title="Add to playlist"
      >
        <ListPlus size={14} />
      </button>

      <div className="relative z-10">
        <h3 className={`font-semibold truncate text-sm mb-0.5 transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/90'}`}>{song.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
      </div>

      <AddToPlaylistModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} songId={song.id} />
    </div>
  );
}
