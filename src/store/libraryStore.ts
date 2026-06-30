import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface LibraryState {
  likedSongIds: string[];
  savedAlbumIds: string[];
  savedPlaylistIds: string[];
  recentlyPlayedIds: string[];
  playCounts: Record<string, number>;

  // Actions
  toggleLikeSong: (id: string) => void;
  toggleSaveAlbum: (id: string) => void;
  toggleSavePlaylist: (id: string) => void;
  addRecentlyPlayed: (id: string) => void;
  incrementPlayCount: (id: string) => void;
  clearRecentlyPlayed: () => void;
  clearFavorites: () => void;
  
  // Queries
  isSongLiked: (id: string) => boolean;
  isAlbumSaved: (id: string) => boolean;
  isPlaylistSaved: (id: string) => boolean;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      likedSongIds: [],
      savedAlbumIds: [],
      savedPlaylistIds: [],
      recentlyPlayedIds: [],
      playCounts: {},

      toggleLikeSong: (id) =>
        set((state) => ({
          likedSongIds: state.likedSongIds.includes(id)
            ? state.likedSongIds.filter((songId) => songId !== id)
            : [...state.likedSongIds, id],
        })),

      toggleSaveAlbum: (id) =>
        set((state) => ({
          savedAlbumIds: state.savedAlbumIds.includes(id)
            ? state.savedAlbumIds.filter((albumId) => albumId !== id)
            : [...state.savedAlbumIds, id],
        })),

      toggleSavePlaylist: (id) =>
        set((state) => ({
          savedPlaylistIds: state.savedPlaylistIds.includes(id)
            ? state.savedPlaylistIds.filter((playlistId) => playlistId !== id)
            : [...state.savedPlaylistIds, id],
        })),

      addRecentlyPlayed: (id) =>
        set((state) => {
          const newRecentlyPlayed = [id, ...state.recentlyPlayedIds.filter(prevId => prevId !== id)].slice(0, 20);
          return { recentlyPlayedIds: newRecentlyPlayed };
        }),

      incrementPlayCount: (id) =>
        set((state) => ({
          playCounts: {
            ...state.playCounts,
            [id]: (state.playCounts[id] || 0) + 1,
          },
        })),

      clearRecentlyPlayed: () => set({ recentlyPlayedIds: [] }),

      clearFavorites: () => set({ likedSongIds: [], savedAlbumIds: [], savedPlaylistIds: [] }),

      isSongLiked: (id) => get().likedSongIds.includes(id),
      isAlbumSaved: (id) => get().savedAlbumIds.includes(id),
      isPlaylistSaved: (id) => get().savedPlaylistIds.includes(id),
    }),
    {
      name: 'velora-library-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
