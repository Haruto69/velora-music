import { Play, Pause, Plus } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';
import { AlbumGlow } from '../animations/AlbumGlow';
import { MagneticButton } from '../animations/MagneticButton';
import { LikeButton } from '../library/LikeButton';

interface SongCardProps {
  song: Song;
  contextList?: Song[];
}

export function SongCard({ song, contextList }: SongCardProps) {
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
      className={`min-w-[160px] md:min-w-[200px] p-4 rounded-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 relative border overflow-hidden ${isActive ? 'bg-primary/10 border-primary/30 shadow-[0_8px_30px_rgba(139,92,246,0.2)]' : 'bg-white/5 backdrop-blur-md border-white/5 hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'}`}
    >
      {/* Optional: subtle background gradient inside the card on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={song.coverUrl} className="mb-4">
        <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
          <img 
            src={song.coverUrl} 
            alt={song.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${isActive ? 'bg-black/30 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
            <MagneticButton strength={15}>
              <button 
                className={`w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.6)] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-500'}`}
              >
                {isActive && isPlaying ? (
                  <Pause size={24} className="fill-current" />
                ) : (
                  <Play size={24} className="ml-1 fill-current" />
                )}
              </button>
            </MagneticButton>
          </div>
        </div>
      </AlbumGlow>
      
      <LikeButton 
        songId={song.id} 
        className="absolute top-6 left-6 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 shadow-lg z-10" 
      />

      <button 
        onClick={handleAddToQueue}
        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:scale-110 shadow-lg z-10"
        title="Add to queue"
      >
        <Plus size={18} />
      </button>

      <div className="relative z-10">
        <h3 className={`font-semibold truncate text-base mb-1 transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/90'}`}>{song.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{song.artistName}</p>
      </div>
    </div>
  );
}
