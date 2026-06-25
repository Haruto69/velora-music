import { Play } from 'lucide-react';
import { Song } from '../../types/music';

interface SongCardProps {
  song: Song;
  onPlay?: () => void;
}

export function SongCard({ song, onPlay }: SongCardProps) {
  return (
    <div className="min-w-[160px] md:min-w-[200px] bg-card p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="aspect-square rounded-md overflow-hidden mb-4 relative shadow-lg">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onPlay?.(); }}
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)] translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
          >
            <Play size={24} className="ml-1" />
          </button>
        </div>
      </div>
      <h3 className="font-semibold truncate text-foreground text-base mb-1">{song.title}</h3>
      <p className="text-sm text-muted-foreground truncate">{song.artistName}</p>
    </div>
  );
}
