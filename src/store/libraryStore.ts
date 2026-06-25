import { create } from 'zustand';

interface LibraryState {
  likedSongIds: string[];
  toggleLikeSong: (id: string) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  likedSongIds: [],
  toggleLikeSong: (id) =>
    set((state) => ({
      likedSongIds: state.likedSongIds.includes(id)
        ? state.likedSongIds.filter((songId) => songId !== id)
        : [...state.likedSongIds, id],
    })),
}));
