import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLibraryStore } from '../store/libraryStore';
import { mockPlaylists } from '../data/playlists';
import { mockAlbums } from '../data/albums';
import { mockSongs } from '../data/songs';
import { PlaylistCard } from '../components/music/PlaylistCard';
import { AlbumCard } from '../components/music/AlbumCard';
import { SongRow } from '../components/music/SongRow';
import { SongCard } from '../components/music/SongCard';

type Tab = 'songs' | 'albums' | 'playlists' | 'recent' | 'most-played';

export default function Library() {
  const [activeTab, setActiveTab] = useState<Tab>('songs');
  const libraryState = useLibraryStore();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'songs', label: 'Liked Songs' },
    { id: 'albums', label: 'Saved Albums' },
    { id: 'playlists', label: 'Saved Playlists' },
    { id: 'recent', label: 'Recently Played' },
    { id: 'most-played', label: 'Most Played' },
  ];

  const likedSongs = mockSongs.filter(s => libraryState.likedSongIds.includes(s.id));
  const savedAlbums = mockAlbums.filter(a => libraryState.savedAlbumIds.includes(a.id));
  const savedPlaylists = mockPlaylists.filter(p => libraryState.savedPlaylistIds.includes(p.id));
  
  const recentSongs = libraryState.recentlyPlayedIds
    .map(id => mockSongs.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);
    
  const mostPlayedSongs = Object.entries(libraryState.playCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 20)
    .map(([id]) => mockSongs.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Library</h1>
      </div>

      <div className="flex gap-4 mb-8 border-b border-border pb-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'songs' && (
            likedSongs.length > 0 ? (
              <div className="space-y-1">
                {likedSongs.map((song, index) => (
                  <SongRow key={song.id} song={song} index={index + 1} contextList={likedSongs} />
                ))}
              </div>
            ) : (
              <EmptyState title="No liked songs yet" description="Find songs you love and hit the heart icon to save them here." />
            )
          )}

          {activeTab === 'albums' && (
            savedAlbums.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {savedAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            ) : (
              <EmptyState title="No saved albums" description="Albums you save will appear here." />
            )
          )}

          {activeTab === 'playlists' && (
            savedPlaylists.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {savedPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} />
                ))}
              </div>
            ) : (
              <EmptyState title="No saved playlists" description="Playlists you save will appear here." />
            )
          )}

          {activeTab === 'recent' && (
            recentSongs.length > 0 ? (
              <div className="space-y-1">
                {recentSongs.map((song, index) => (
                  <SongRow key={song.id + '-' + index} song={song} index={index + 1} contextList={recentSongs} />
                ))}
              </div>
            ) : (
              <EmptyState title="No recently played songs" description="Songs you play will show up here." />
            )
          )}
          
          {activeTab === 'most-played' && (
            mostPlayedSongs.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {mostPlayedSongs.map((song) => (
                  <SongCard key={song.id} song={song} contextList={mostPlayedSongs} />
                ))}
              </div>
            ) : (
              <EmptyState title="No most played songs" description="Listen to some music to build your heavy rotation." />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
        <span className="text-3xl opacity-50">📂</span>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground max-w-md">
        {description}
      </p>
    </div>
  );
}
