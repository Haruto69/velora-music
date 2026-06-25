import { create } from 'zustand';
import { Song } from '../types/music';

interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  volume: number;
  setCurrentTrack: (track: Song) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setVolume: (volume) => set({ volume }),
}));
