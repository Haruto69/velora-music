import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { mockSongs } from '../data/songs';
import { mockAlbums } from '../data/albums';
import { mockArtists } from '../data/artists';
import { mockPlaylists } from '../data/playlists';
import { SectionHeader } from '../components/common/SectionHeader';
import { SongCard } from '../components/music/SongCard';
import { AlbumCard } from '../components/music/AlbumCard';
import { ArtistCard } from '../components/music/ArtistCard';
import { PlaylistCard } from '../components/music/PlaylistCard';

export default function Home() {
  const featuredPlaylist = mockPlaylists[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 space-y-10"
    >
      {/* Hero Section */}
      <section className="relative w-full h-[300px] rounded-2xl overflow-hidden group">
        <img src={featuredPlaylist.coverUrl} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 flex flex-col items-start max-w-2xl">
          <span className="text-primary font-semibold tracking-wider text-sm mb-2 uppercase">Featured Playlist</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{featuredPlaylist.title}</h1>
          <p className="text-white/80 mb-6 line-clamp-2">{featuredPlaylist.description}</p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <Play size={20} className="fill-current" />
            Play Now
          </button>
        </div>
      </section>

      {/* Made For You (Playlists) */}
      <section>
        <SectionHeader title="Made For You" />
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {mockPlaylists.map((playlist) => (
            <div key={playlist.id} className="snap-start">
              <PlaylistCard playlist={playlist} />
            </div>
          ))}
        </div>
      </section>

      {/* Recently Played (Songs) */}
      <section>
        <SectionHeader title="Recently Played" />
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {mockSongs.map((song) => (
            <div key={song.id} className="snap-start">
              <SongCard song={song} />
            </div>
          ))}
        </div>
      </section>

      {/* Trending Albums */}
      <section>
        <SectionHeader title="Trending Albums" />
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {mockAlbums.map((album) => (
            <div key={album.id} className="snap-start">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>
      </section>

      {/* Artists to Watch */}
      <section>
        <SectionHeader title="Artists to Watch" />
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
          {mockArtists.map((artist) => (
            <div key={artist.id} className="snap-start">
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  );
}
