import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { mockSongs } from '../data/songs';
import { mockAlbums } from '../data/albums';
import { mockArtists } from '../data/artists';
import { mockPlaylists } from '../data/playlists';
import { SearchInput } from '../components/search/SearchInput';
import { RecentSearches } from '../components/search/RecentSearches';
import { FilterGroup } from '../components/search/FilterGroup';
import { SearchResults } from '../components/search/SearchResults';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

const ALL_GENRES = ['Pop', 'Synthwave', 'Electronic', 'Retrowave', 'Hip Hop', 'Jazz', 'Classical', 'Lo-fi', 'Ambient', 'Indie', 'Cyberpunk'];
const ALL_MOODS = ['Energetic', 'Chill', 'Melancholic', 'Driving', 'Night Drive', 'Focus', 'Dreamy', 'Cinematic', 'Romantic'];
const SORT_OPTIONS = ['Relevance', 'Title', 'Newest', 'Most Played', 'Duration'];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('Relevance');
  
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('velora-recent-searches', []);

  // Sync internal state if URL param changes externally (e.g., from TopBar)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Update URL param when internal query changes
  const handleQueryChange = (q: string) => {
    setSearchQuery(q);
    if (q) {
      setSearchParams({ q });
    } else {
      setSearchParams({});
    }
  };

  const saveRecentSearch = () => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev].slice(0, 8));
    }
  };

  // Perform filtering
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    
    // Filter by text query
    let songs = mockSongs.filter(s => 
      !q || 
      s.title.toLowerCase().includes(q) || 
      s.artistName.toLowerCase().includes(q) || 
      s.albumTitle?.toLowerCase().includes(q) ||
      s.genre?.toLowerCase().includes(q) ||
      s.mood?.toLowerCase().includes(q)
    );

    let albums = mockAlbums.filter(a =>
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.artistName.toLowerCase().includes(q) ||
      a.genre?.toLowerCase().includes(q)
    );

    let artists = mockArtists.filter(a =>
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.genre?.toLowerCase().includes(q)
    );

    let playlists = mockPlaylists.filter(p =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.mood?.toLowerCase().includes(q)
    );

    // Filter by genres
    if (selectedGenres.length > 0) {
      songs = songs.filter(s => s.genre && selectedGenres.includes(s.genre));
      albums = albums.filter(a => a.genre && selectedGenres.includes(a.genre));
      artists = artists.filter(a => a.genre && selectedGenres.includes(a.genre));
      // Playlists usually don't have genre, skip or map
    }

    // Filter by moods
    if (selectedMoods.length > 0) {
      songs = songs.filter(s => s.mood && selectedMoods.includes(s.mood));
      playlists = playlists.filter(p => p.mood && selectedMoods.includes(p.mood));
      // Albums/Artists usually don't have mood, clear them if mood filter is applied
      albums = [];
      artists = [];
    }

    // Apply Sorting
    if (sortOption === 'Title') {
      songs.sort((a, b) => a.title.localeCompare(b.title));
      albums.sort((a, b) => a.title.localeCompare(b.title));
      artists.sort((a, b) => a.name.localeCompare(b.name));
      playlists.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'Newest') {
      songs.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
      albums.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortOption === 'Most Played') {
      songs.sort((a, b) => (b.plays || 0) - (a.plays || 0));
    } else if (sortOption === 'Duration') {
      songs.sort((a, b) => b.duration - a.duration);
    }

    return { songs, albums, artists, playlists };
  }, [searchQuery, selectedGenres, selectedMoods, sortOption]);

  const hasActiveFilters = searchQuery || selectedGenres.length > 0 || selectedMoods.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 space-y-10"
    >
      <div className="md:hidden">
        <SearchInput 
          value={searchQuery} 
          onChange={handleQueryChange} 
          onBlur={saveRecentSearch}
        />
      </div>

      {(hasActiveFilters) && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <div className="flex-1 space-y-4">
              <FilterGroup 
                title="Genres" 
                options={ALL_GENRES} 
                selected={selectedGenres} 
                onChange={setSelectedGenres} 
              />
              <FilterGroup 
                title="Moods" 
                options={ALL_MOODS} 
                selected={selectedMoods} 
                onChange={setSelectedMoods} 
              />
            </div>
            <div className="min-w-[150px]">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sort By</h3>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="h-px w-full bg-white/10" />

          <SearchResults 
            songs={filteredData.songs} 
            albums={filteredData.albums} 
            artists={filteredData.artists} 
            playlists={filteredData.playlists} 
          />
        </div>
      )}

      {!hasActiveFilters && (
        <>
          <RecentSearches 
            searches={recentSearches} 
            onSelect={(q) => {
              handleQueryChange(q);
            }} 
            onClear={() => setRecentSearches([])} 
          />

          <section>
            <SectionHeader title="Browse Genres" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
              {ALL_GENRES.map((genre) => (
                <div 
                  key={genre} 
                  onClick={() => setSelectedGenres([genre])}
                  className="aspect-square rounded-xl p-4 overflow-hidden relative cursor-pointer group hover:scale-105 transition-transform bg-card border border-white/5 hover:border-primary/50 flex flex-col justify-end"
                >
                  <h3 className="font-bold text-xl text-foreground relative z-10 group-hover:text-primary transition-colors">{genre}</h3>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
