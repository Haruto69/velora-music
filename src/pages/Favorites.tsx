import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useLibraryStore } from '../store/libraryStore';
import { mockSongs } from '../data/songs';
import { SongRow } from '../components/music/SongRow';

export default function Favorites() {
  const likedSongIds = useLibraryStore((state) => state.likedSongIds);
  const toggleLikeSong = useLibraryStore((state) => state.toggleLikeSong);
  
  const favoriteSongs = mockSongs.filter(song => likedSongIds.includes(song.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <Heart size={32} className="text-white fill-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Liked Songs</h1>
          <p className="text-muted-foreground">{favoriteSongs.length} {favoriteSongs.length === 1 ? 'song' : 'songs'}</p>
        </div>
      </div>

      {favoriteSongs.length > 0 ? (
        <div className="mt-8">
          <div className="flex items-center gap-4 py-2 px-4 border-b border-border text-sm text-muted-foreground mb-4">
            <div className="w-8 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="hidden md:block flex-1">Album</div>
            <div className="w-10 text-right">Time</div>
          </div>
          <div className="space-y-1">
            {favoriteSongs.map((song, index) => (
              <SongRow 
                key={song.id} 
                song={song} 
                index={index + 1} 
                isLiked={true}
                onToggleLike={() => toggleLikeSong(song.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-32 max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Heart size={48} className="text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Songs you like will appear here</h2>
          <p className="text-muted-foreground mb-8">
            Save songs by tapping the heart icon. We'll keep them in this special playlist just for you.
          </p>
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
            Find songs
          </button>
        </div>
      )}
    </motion.div>
  );
}
