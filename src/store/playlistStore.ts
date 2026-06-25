import { create } from 'zustand';
import { Playlist } from '../types/music';
import { mockPlaylists } from '../data/playlists';

interface PlaylistState {
  playlists: Playlist[];
  createPlaylist: (playlist: Playlist) => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: mockPlaylists,
  createPlaylist: (playlist) =>
    set((state) => ({ playlists: [...state.playlists, playlist] })),
}));
