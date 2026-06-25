import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { mockSongs } from '../data/songs';
import { SongRow } from '../components/music/SongRow';

const genres = [
  { name: 'Pop', color: 'from-pink-500 to-rose-500' },
  { name: 'Synthwave', color: 'from-purple-500 to-indigo-500' },
  { name: 'Electronic', color: 'from-blue-500 to-cyan-500' },
  { name: 'Retrowave', color: 'from-orange-500 to-amber-500' },
  { name: 'Hip Hop', color: 'from-emerald-500 to-teal-500' },
  { name: 'Jazz', color: 'from-amber-700 to-orange-700' },
  { name: 'Classical', color: 'from-slate-600 to-slate-800' },
  { name: 'Lofi', color: 'from-fuchsia-500 to-pink-600' }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 space-y-10"
    >
      {/* Mobile Search Bar (Only visible on mobile, since topbar has one on desktop) */}
      <div className="md:hidden relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon size={20} className="text-muted-foreground" />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What do you want to listen to?" 
          className="w-full bg-card/50 border border-border rounded-full py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {searchQuery ? (
        <section>
          <SectionHeader title={`Search results for "${searchQuery}"`} />
          <div className="space-y-1 mt-4">
            {mockSongs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index + 1} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <section>
            <SectionHeader title="Popular Searches" />
            <div className="flex flex-wrap gap-3">
              {['Neon Dreams', 'Synthwave Rider', 'Chill Vibes', 'Midnight City', 'Hologram Heart'].map((tag) => (
                <button key={tag} className="px-4 py-2 bg-card border border-border rounded-full text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Browse All" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {genres.map((genre) => (
                <div 
                  key={genre.name} 
                  className={`aspect-square rounded-xl p-4 overflow-hidden relative cursor-pointer group hover:scale-105 transition-transform bg-gradient-to-br ${genre.color}`}
                >
                  <h3 className="font-bold text-xl text-white relative z-10">{genre.name}</h3>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
