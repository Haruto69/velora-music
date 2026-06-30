import { Link } from 'react-router-dom';
import { Playlist } from '../../types/music';
import { AlbumGlow } from '../animations/AlbumGlow';
import { SaveButton } from '../library/SaveButton';

interface PlaylistCardProps {
  playlist: Playlist;
  variant?: 'default' | 'compact';
}

export function PlaylistCard({ playlist, variant = 'default' }: PlaylistCardProps) {
  if (variant === 'compact') {
    return (
      <Link 
        to={`/playlist/${playlist.id}`}
        className="flex items-center gap-3 p-2 pr-4 rounded-xl transition-all duration-300 group border overflow-hidden w-full relative bg-white/5 backdrop-blur-md border-white/5 hover:bg-white/10 hover:border-white/10"
      >
        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
          <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-semibold text-sm truncate mb-0.5 transition-colors group-hover:text-primary/90">{playlist.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{playlist.description || 'Playlist'}</p>
        </div>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-md p-1 rounded-full shadow-xl pointer-events-none group-hover:pointer-events-auto">
          <SaveButton itemId={playlist.id} type="playlist" className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition-colors shadow-none bg-transparent border-none" />
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/playlist/${playlist.id}`}
      className="min-w-[130px] md:min-w-[150px] p-3 rounded-2xl transition-all duration-500 group hover:-translate-y-2 block relative border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={playlist.coverUrl} className="mb-3">
        <div className="aspect-square rounded-xl overflow-hidden relative shadow-lg">
          <img 
            src={playlist.coverUrl} 
            alt={playlist.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </AlbumGlow>

      <SaveButton 
        itemId={playlist.id} 
        type="playlist" 
        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/10 shadow-lg z-10" 
      />

      <div className="relative z-10">
        <h3 className="font-semibold truncate text-foreground text-sm mb-0.5 transition-colors group-hover:text-primary/90">{playlist.title}</h3>
        <p className="text-xs text-muted-foreground truncate">{playlist.description || 'Playlist'}</p>
      </div>
    </Link>
  );
}
