import { Artist } from '../../types/music';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="min-w-[160px] md:min-w-[200px] bg-card p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer group hover:-translate-y-1 flex flex-col items-center text-center">
      <div className="w-full aspect-square rounded-full overflow-hidden mb-4 relative shadow-lg">
        <img 
          src={artist.imageUrl} 
          alt={artist.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-semibold truncate text-foreground text-base w-full">{artist.name}</h3>
      <p className="text-sm text-muted-foreground capitalize mt-1">Artist</p>
    </div>
  );
}
