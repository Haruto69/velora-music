import { useEffect } from 'react';

// Placeholder for Phase 2: Keyboard shortcuts
export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to play/pause, arrows to seek, etc.
      if (e.code === 'Space') {
        // toggle play
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
