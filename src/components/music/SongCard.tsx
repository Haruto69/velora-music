import { Play, Pause } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';

interface SongCardProps {
  song: Song;
  contextList?: Song[];
}

export function SongCard({ song, contextList }: SongCardProps) {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const playTrack = usePlayerStore(state => state.playTrack);
  const togglePlay = usePlayerStore(state => state.togglePlay);

  const isActive = currentTrack?.id === song.id;

  const handlePlayClick = () => {
    if (isActive) {
      togglePlay();
    } else {
      playTrack(song, contextList);
    }
  };

  return (
    <div 
      onClick={handlePlayClick}
      className={`min-w-[160px] md:min-w-[200px] p-4 rounded-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${isActive ? 'bg-white/10 shadow-[0_8px_30px_rgba(139,92,246,0.15)] ring-1 ring-primary/50' : 'bg-card hover:bg-white/5'}`}
    >
      <div className="aspect-square rounded-md overflow-hidden mb-4 relative shadow-lg">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${isActive ? 'bg-black/40 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
          <button 
            className={`w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100'}`}
          >
            {isActive && isPlaying ? (
              <Pause size={24} className="fill-current" />
            ) : (
              <Play size={24} className="ml-1 fill-current" />
            )}
          </button>
        </div>
      </div>
      <h3 className={`font-semibold truncate text-base mb-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>{song.title}</h3>
      <p className="text-sm text-muted-foreground truncate">{song.artistName}</p>
    </div>
  );
}
