import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Heart, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { mockAlbums } from '../data/albums';
import { mockSongs } from '../data/songs';
import { SongRow } from '../components/music/SongRow';

export default function Album() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const album = mockAlbums.find(a => a.id === id);

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Album not found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the album you're looking for.</p>
        <Link to="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform">
          Go Home
        </Link>
      </div>
    );
  }

  const albumSongs = mockSongs.filter(song => album.songIds.includes(song.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-10"
    >
      {/* Header */}
      <div className="relative w-full p-6 md:p-10 pt-12 md:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background z-0" />
        
        <div className="relative z-10 w-full">
          <div className="mb-6">
            <button 
              onClick={handleBack}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <div className="w-full max-w-[12rem] md:max-w-[15rem] aspect-square shadow-2xl flex-shrink-0 group">
              <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg" />
            </div>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
            <span className="uppercase text-xs font-bold tracking-wider mb-2">Album</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{album.title}</h1>
            <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <span className="text-white hover:underline cursor-pointer">{album.artistName}</span>
              <span>•</span>
              <span>{album.releaseYear}</span>
              <span>•</span>
              <span>{albumSongs.length} songs</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 md:px-10 py-6 flex items-center gap-6">
        <button className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <Play size={28} className="ml-1 fill-current" />
        </button>
        <button className="text-muted-foreground hover:text-white transition-colors">
          <Heart size={32} />
        </button>
        <button className="text-muted-foreground hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Tracklist */}
      <div className="px-6 md:px-10 mt-4">
        <div className="flex items-center gap-4 py-2 px-4 border-b border-border text-sm text-muted-foreground mb-4">
          <div className="w-8 text-center">#</div>
          <div className="flex-1">Title</div>
          <div className="hidden md:block flex-1">Album</div>
          <div className="w-10 text-right">Time</div>
        </div>
        
        <div className="space-y-1">
          {albumSongs.map((song, index) => (
            <SongRow key={song.id} song={song} index={index + 1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
