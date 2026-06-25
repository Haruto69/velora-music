import { create } from 'zustand';
import { Song } from '../types/music';

interface PlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  
  // Phase 4
  queue: Song[];
  originalQueue: Song[];
  activeTrackList: Song[];
  currentIndex: number;
  
  isShuffleEnabled: boolean;
  repeatMode: "off" | "one" | "all";
  isQueueDrawerOpen: boolean;

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

  // Queue specific actions
  addToQueue: (track: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  toggleQueueDrawer: () => void;
  playFromQueue: (index: number) => void;
}

// Utility to shuffle an array (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 1, // 0 to 1
  isMuted: false,
  duration: 0,
  currentTime: 0,
  
  queue: [],
  originalQueue: [],
  activeTrackList: [],
  currentIndex: -1,
  
  isShuffleEnabled: false,
  repeatMode: "off",
  isQueueDrawerOpen: false,

  setTrackList: (tracks, startIndex = 0) => {
    if (tracks.length === 0) return;
    const { isShuffleEnabled } = get();
    
    let queue = [...tracks];
    let currentIndex = startIndex;
    const currentTrack = tracks[startIndex];

    if (isShuffleEnabled) {
      // Keep current track at index 0, shuffle the rest
      const remainingTracks = queue.filter((_, i) => i !== startIndex);
      const shuffled = shuffleArray(remainingTracks);
      queue = [currentTrack, ...shuffled];
      currentIndex = 0;
    }

    set({
      activeTrackList: tracks,
      originalQueue: tracks,
      queue,
      currentIndex,
      currentTrack,
      isPlaying: true
    });
  },

  playTrack: (track, trackList) => {
    const state = get();
    const list = trackList || state.activeTrackList;
    const index = list.findIndex(t => t.id === track.id);
    
    get().setTrackList(list, index !== -1 ? index : 0);
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),

  nextTrack: () => {
    const { currentIndex, queue, repeatMode } = get();
    if (queue.length === 0) return;

    if (currentIndex < queue.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        currentTrack: queue[currentIndex + 1],
        isPlaying: true
      });
    } else {
      // End of queue
      if (repeatMode === "all") {
        set({
          currentIndex: 0,
          currentTrack: queue[0],
          isPlaying: true
        });
      } else {
        // Stop cleanly at the end of the list
        set({ isPlaying: false, currentTime: 0 });
      }
    }
  },

  previousTrack: () => {
    const { currentIndex, queue, currentTime } = get();
    if (queue.length === 0) return;
    
    // If playing for more than 3 seconds, restart current track
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    
    if (currentIndex > 0) {
      set({
        currentIndex: currentIndex - 1,
        currentTrack: queue[currentIndex - 1],
        isPlaying: true
      });
    } else {
      const { repeatMode } = get();
      if (repeatMode === "all") {
        set({
          currentIndex: queue.length - 1,
          currentTrack: queue[queue.length - 1],
          isPlaying: true
        });
      } else {
        set({ currentTime: 0 });
      }
    }
  },

  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  seekTo: (time) => set({ currentTime: time }),

  addToQueue: (track) => {
    set((state) => ({
      queue: [...state.queue, track],
      originalQueue: [...state.originalQueue, track]
    }));
  },

  removeFromQueue: (index) => {
    set((state) => {
      const newQueue = [...state.queue];
      const removedTrack = newQueue[index];
      newQueue.splice(index, 1);
      
      let newCurrentIndex = state.currentIndex;
      let newCurrentTrack = state.currentTrack;
      let newIsPlaying = state.isPlaying;

      if (index === state.currentIndex) {
        // If we removed the currently playing track
        if (newQueue.length === 0) {
          newCurrentIndex = -1;
          newCurrentTrack = null;
          newIsPlaying = false;
        } else if (index < newQueue.length) {
          newCurrentTrack = newQueue[index];
        } else {
          newCurrentIndex = newQueue.length - 1;
          newCurrentTrack = newQueue[newCurrentIndex];
        }
      } else if (index < state.currentIndex) {
        newCurrentIndex--;
      }

      const newOriginalQueue = [...state.originalQueue];
      const origIndex = newOriginalQueue.findIndex(t => t.id === removedTrack?.id);
      if (origIndex !== -1) {
        newOriginalQueue.splice(origIndex, 1);
      }

      return {
        queue: newQueue,
        originalQueue: newOriginalQueue,
        currentIndex: newCurrentIndex,
        currentTrack: newCurrentTrack,
        isPlaying: newIsPlaying
      };
    });
  },

  clearQueue: () => {
    set((state) => {
      if (!state.currentTrack) return { queue: [], originalQueue: [] };
      return {
        queue: [state.currentTrack],
        originalQueue: [state.currentTrack],
        currentIndex: 0
      };
    });
  },

  toggleShuffle: () => {
    set((state) => {
      const newShuffle = !state.isShuffleEnabled;
      
      if (!state.currentTrack) return { isShuffleEnabled: newShuffle };

      if (newShuffle) {
        // Turn on shuffle
        const remainingTracks = state.queue.filter((_, i) => i !== state.currentIndex);
        const shuffled = shuffleArray(remainingTracks);
        return {
          isShuffleEnabled: true,
          queue: [state.currentTrack, ...shuffled],
          currentIndex: 0
        };
      } else {
        // Turn off shuffle -> restore originalQueue
        const currentId = state.currentTrack.id;
        const indexInOriginal = state.originalQueue.findIndex(t => t.id === currentId);
        return {
          isShuffleEnabled: false,
          queue: state.originalQueue,
          currentIndex: indexInOriginal !== -1 ? indexInOriginal : 0
        };
      }
    });
  },

  cycleRepeatMode: () => {
    set((state) => {
      const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
      const nextIndex = (modes.indexOf(state.repeatMode) + 1) % modes.length;
      return { repeatMode: modes[nextIndex] };
    });
  },

  toggleQueueDrawer: () => set((state) => ({ isQueueDrawerOpen: !state.isQueueDrawerOpen })),
  
  playFromQueue: (index) => {
    set((state) => ({
      currentIndex: index,
      currentTrack: state.queue[index],
      isPlaying: true
    }));
  }
}));
