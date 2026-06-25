import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Album } from '../../types/music';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link 
      to={`/album/${album.id}`}
      className="min-w-[160px] md:min-w-[200px] bg-card p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] block"
    >
      <div className="aspect-square rounded-md overflow-hidden mb-4 relative shadow-lg">
        <img 
          src={album.coverUrl} 
          alt={album.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2">
          <button 
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
            onClick={(e) => { e.preventDefault(); /* Phase 2: play album */ }}
          >
            <Play size={20} className="ml-1" />
          </button>
        </div>
      </div>
      <h3 className="font-semibold truncate text-foreground text-base mb-1">{album.title}</h3>
      <p className="text-sm text-muted-foreground truncate">{album.artistName}</p>
    </Link>
  );
}
