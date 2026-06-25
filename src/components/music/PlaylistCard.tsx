import { Link } from 'react-router-dom';
import { Playlist } from '../../types/music';
import { AlbumGlow } from '../animations/AlbumGlow';

interface PlaylistCardProps {
  playlist: Playlist;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link 
      to={`/playlist/${playlist.id}`}
      className="min-w-[160px] md:min-w-[200px] p-4 rounded-2xl transition-all duration-500 group hover:-translate-y-2 block relative border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={playlist.coverUrl} className="mb-4">
        <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
          <img 
            src={playlist.coverUrl} 
            alt={playlist.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </AlbumGlow>
      <div className="relative z-10">
        <h3 className="font-semibold truncate text-foreground text-base mb-1 transition-colors group-hover:text-primary/90">{playlist.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{playlist.description || 'Playlist'}</p>
      </div>
    </Link>
  );
}
