import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import { LyricsPanel } from './LyricsPanel';

export function LyricsDrawer() {
  const { currentTrack, isLyricsDrawerOpen, toggleLyricsDrawer } = usePlayerStore();

  return (
    <AnimatePresence>
      {isLyricsDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleLyricsDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] hidden md:block"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-[96px] w-[400px] bg-background/80 backdrop-blur-xl border-l border-white/10 z-[60] flex flex-col hidden md:flex shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl font-bold">Lyrics</h2>
                {currentTrack && (
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.title}</p>
                )}
              </div>
              <button
                onClick={toggleLyricsDrawer}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
              {currentTrack ? (
                <LyricsPanel lyrics={currentTrack.lyrics} />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No track selected
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
