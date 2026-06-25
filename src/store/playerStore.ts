import { create } from 'zustand';
import { Song } from '../types/music';

interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  currentIndex: number;
  activeTrackList: Song[];
  
  // Actions
  setTrackList: (tracks: Song[], startIndex?: number) => void;
  playTrack: (track: Song, trackList?: Song[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1, // 0 to 1
  isMuted: false,
  duration: 0,
  currentTime: 0,
  currentIndex: -1,
  activeTrackList: [],

  setTrackList: (tracks, startIndex = 0) => {
    if (tracks.length === 0) return;
    set({
      activeTrackList: tracks,
      currentIndex: startIndex,
      currentTrack: tracks[startIndex],
      isPlaying: true
    });
  },

  playTrack: (track, trackList) => {
    const state = get();
    const list = trackList || state.activeTrackList;
    const index = list.findIndex(t => t.id === track.id);
    
    set({
      currentTrack: track,
      activeTrackList: list,
      currentIndex: index !== -1 ? index : 0,
      isPlaying: true
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  pause: () => set({ isPlaying: false }),
  
  resume: () => set({ isPlaying: true }),

  nextTrack: () => {
    const { currentIndex, activeTrackList } = get();
    if (activeTrackList.length === 0) return;
    
    if (currentIndex < activeTrackList.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        currentTrack: activeTrackList[currentIndex + 1],
        isPlaying: true
      });
    } else {
      // Phase 3: Stop cleanly at the end of the list
      set({ isPlaying: false, currentTime: 0 });
    }
  },

  previousTrack: () => {
    const { currentIndex, activeTrackList, currentTime } = get();
    if (activeTrackList.length === 0) return;
    
    // If playing for more than 3 seconds, restart current track
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    
    if (currentIndex > 0) {
      set({
        currentIndex: currentIndex - 1,
        currentTrack: activeTrackList[currentIndex - 1],
        isPlaying: true
      });
    }
  },

  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  
  setCurrentTime: (time) => set({ currentTime: time }),
  
  setDuration: (duration) => set({ duration }),
  
  seekTo: (time) => set({ currentTime: time })
}));
