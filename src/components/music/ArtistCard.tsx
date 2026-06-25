import { Artist } from '../../types/music';
import { AlbumGlow } from '../animations/AlbumGlow';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="min-w-[160px] md:min-w-[200px] p-4 rounded-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 flex flex-col items-center text-center relative border border-white/5 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 hover:border-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <AlbumGlow imageUrl={artist.imageUrl} className="w-full mb-4 rounded-full">
        <div className="w-full aspect-square rounded-full overflow-hidden relative shadow-lg">
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </AlbumGlow>
      <div className="relative z-10 w-full">
        <h3 className="font-semibold truncate text-foreground text-base w-full transition-colors group-hover:text-primary/90">{artist.name}</h3>
        <p className="text-sm text-muted-foreground capitalize mt-1">Artist</p>
      </div>
    </div>
  );
}
