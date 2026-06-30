import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Album } from '../../types/music';
import { AlbumGlow } from '../animations/AlbumGlow';
import { MagneticButton } from '../animations/MagneticButton';
import { SaveButton } from '../library/SaveButton';

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link 
      to={`/album/${album.id}`}
      className="min-w-[160px] md:min-w-[200px] p-4 rounded-2xl transition-all duration-500 group hover:-translate-y-2 block relative border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={album.coverUrl} className="mb-4">
        <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
          <img 
            src={album.coverUrl} 
            alt={album.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-2">
            <MagneticButton strength={10}>
              <button 
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.6)] translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-105"
                onClick={(e) => { e.preventDefault(); /* Phase 2: play album */ }}
              >
                <Play size={20} className="ml-1 fill-current" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </AlbumGlow>
      
      <SaveButton 
        itemId={album.id} 
        type="album" 
        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 shadow-lg z-10" 
      />

      <div className="relative z-10">
        <h3 className="font-semibold truncate text-foreground text-base mb-1 transition-colors group-hover:text-primary/90">{album.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{album.artistName}</p>
      </div>
    </Link>
  );
}
