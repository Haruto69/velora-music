import { useEffect } from 'react';
import { Song } from '../types/music';

// Placeholder for Phase 2: Media Session API (lock screen controls)
export const useMediaSession = (currentTrack: Song | null) => {
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artistName,
        album: currentTrack.albumTitle || 'Velora',
        artwork: [
          { src: currentTrack.coverUrl, sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => { /* */ });
      navigator.mediaSession.setActionHandler('pause', () => { /* */ });
      navigator.mediaSession.setActionHandler('previoustrack', () => { /* */ });
      navigator.mediaSession.setActionHandler('nexttrack', () => { /* */ });
    }
  }, [currentTrack]);
};
