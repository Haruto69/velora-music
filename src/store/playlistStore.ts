import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Playlist } from '../types/music';

interface PlaylistState {
  customPlaylists: Playlist[];
  
  // Actions
  createPlaylist: (title: string, description?: string, coverGradient?: string) => string;
  updatePlaylist: (id: string, updates: Partial<Pick<Playlist, 'title' | 'description' | 'coverGradient'>>) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  reorderPlaylistSongs: (playlistId: string, startIndex: number, endIndex: number) => void;
  getPlaylistById: (id: string) => Playlist | undefined;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      customPlaylists: [],

      createPlaylist: (title, description, coverGradient) => {
        const id = `custom-${Date.now()}`;
        const newPlaylist: Playlist = {
          id,
          title,
          description: description || '',
          coverUrl: '', // Will use gradient instead
          coverGradient: coverGradient || 'from-purple-500 to-indigo-500',
          songIds: [],
          createdBy: 'You',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isCustom: true,
        };

        set((state) => ({
          customPlaylists: [newPlaylist, ...state.customPlaylists],
        }));

        return id;
      },

      updatePlaylist: (id, updates) => {
        set((state) => ({
          customPlaylists: state.customPlaylists.map((p) =>
            p.id === id
              ? { ...p, ...updates, updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      deletePlaylist: (id) => {
        set((state) => ({
          customPlaylists: state.customPlaylists.filter((p) => p.id !== id),
        }));
      },

      addSongToPlaylist: (playlistId, songId) => {
        set((state) => ({
          customPlaylists: state.customPlaylists.map((p) => {
            if (p.id === playlistId) {
              // Prevent duplicates
              if (!p.songIds.includes(songId)) {
                return {
                  ...p,
                  songIds: [...p.songIds, songId],
                  updatedAt: new Date().toISOString(),
                };
              }
            }
            return p;
          }),
        }));
      },

      removeSongFromPlaylist: (playlistId, songId) => {
        set((state) => ({
          customPlaylists: state.customPlaylists.map((p) =>
            p.id === playlistId
              ? {
                  ...p,
                  songIds: p.songIds.filter((id) => id !== songId),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      reorderPlaylistSongs: (playlistId, startIndex, endIndex) => {
        set((state) => ({
          customPlaylists: state.customPlaylists.map((p) => {
            if (p.id === playlistId) {
              const result = Array.from(p.songIds);
              const [removed] = result.splice(startIndex, 1);
              result.splice(endIndex, 0, removed);
              return {
                ...p,
                songIds: result,
                updatedAt: new Date().toISOString(),
              };
            }
            return p;
          }),
        }));
      },

      getPlaylistById: (id) => {
        return get().customPlaylists.find((p) => p.id === id);
      },
    }),
    {
      name: 'velora-playlist-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
