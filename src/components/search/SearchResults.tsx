import { Song, Album, Artist, Playlist } from '../../types/music';
import { SectionHeader } from '../common/SectionHeader';
import { SongRow } from '../music/SongRow';
import { AlbumCard } from '../music/AlbumCard';
import { ArtistCard } from '../music/ArtistCard';
import { PlaylistCard } from '../music/PlaylistCard';

interface SearchResultsProps {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
}

export function SearchResults({ songs, albums, artists, playlists }: SearchResultsProps) {
  const hasResults = songs.length > 0 || albums.length > 0 || artists.length > 0 || playlists.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold">No results found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find what you're looking for. Try clearing some filters or searching for another term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {songs.length > 0 && (
        <section>
          <SectionHeader title="Songs" />
          <div className="space-y-1 mt-4">
            {songs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index + 1} contextList={songs} />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section>
          <SectionHeader title="Albums" />
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {albums.map((album) => (
              <div key={album.id} className="snap-start">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section>
          <SectionHeader title="Artists" />
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {artists.map((artist) => (
              <div key={artist.id} className="snap-start">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </section>
      )}

      {playlists.length > 0 && (
        <section>
          <SectionHeader title="Playlists" />
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="snap-start">
                <PlaylistCard playlist={playlist} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
