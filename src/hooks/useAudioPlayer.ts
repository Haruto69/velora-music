import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { useLibraryStore } from '../store/libraryStore';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const isPlaying = usePlayerStore(state => state.isPlaying);
  const volume = usePlayerStore(state => state.volume);
  const isMuted = usePlayerStore(state => state.isMuted);
  
  const setCurrentTime = usePlayerStore(state => state.setCurrentTime);
  const setDuration = usePlayerStore(state => state.setDuration);
  const pause = usePlayerStore(state => state.pause);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    
    // Define handleEnded inside an effect or use a ref for latest values if needed
    // Actually, since repeatMode and nextTrack are from the store, we can access them fresh via getState or just re-bind
    // But since repeatMode changes, we should add it to deps or use the store directly
    
    const handleError = (e: Event) => {
      console.warn("Audio playback error:", e);
      pause();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('error', handleError);
    };
  }, [setCurrentTime, setDuration, pause]);

  // Handle ended event separately to keep fresh repeatMode
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const state = usePlayerStore.getState();
      if (state.repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => state.pause());
      } else {
        state.nextTrack();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  // Handle track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
      
      // Update library stats on new track load
      const libraryState = useLibraryStore.getState();
      libraryState.addRecentlyPlayed(currentTrack.id);
      libraryState.incrementPlayCount(currentTrack.id);

      if (isPlaying) {
        audio.play().catch(e => {
          console.warn("Failed to play new track:", e);
          pause();
        });
      }
    }
  }, [currentTrack, isPlaying, pause]);

  // Handle play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying && audio.paused) {
      audio.play().catch(e => {
        console.warn("Failed to resume track:", e);
        pause();
      });
    } else if (!isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isPlaying, currentTrack, pause]);

  // Handle volume & mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Listen for external seek actions through store via subscriber
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // We subscribe to the store specifically for seeking, 
    // because regular time updates happen multiple times a second
    const unsubscribe = usePlayerStore.subscribe((state, prevState) => {
      // If currentTime changed by a large margin (seeking), update audio
      if (Math.abs(state.currentTime - prevState.currentTime) > 1.5) {
        // Prevent recursive updates from the timeupdate event
        // Only set audio.currentTime if it significantly differs from actual time
        if (Math.abs(audio.currentTime - state.currentTime) > 0.5) {
          audio.currentTime = state.currentTime;
        }
      }
    });

    return unsubscribe;
  }, []);

  return null;
}
