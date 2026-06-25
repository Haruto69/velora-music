import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import { QueueItem } from './QueueItem';

export function QueueDrawer() {
  const isOpen = usePlayerStore(state => state.isQueueDrawerOpen);
  const toggleQueueDrawer = usePlayerStore(state => state.toggleQueueDrawer);
  const queue = usePlayerStore(state => state.queue);
  const currentIndex = usePlayerStore(state => state.currentIndex);
  
  const playFromQueue = usePlayerStore(state => state.playFromQueue);
  const removeFromQueue = usePlayerStore(state => state.removeFromQueue);
  const clearQueue = usePlayerStore(state => state.clearQueue);

  // Split into current and upcoming
  const upcomingTracks = queue.slice(currentIndex + 1);
  const currentTrack = queue[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleQueueDrawer}
            className="fixed inset-0 bg-black/40 z-[40] md:hidden backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-80 h-[calc(100vh-var(--player-mobile))] md:h-[calc(100vh-var(--player-desktop))] bg-background/95 backdrop-blur-3xl border-l border-white/5 z-[45] flex flex-col shadow-2xl"
          >
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Play Queue</h2>
              <button 
                onClick={toggleQueueDrawer}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Now Playing */}
              {currentTrack && (
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Now Playing</h3>
                  <QueueItem 
                    song={currentTrack} 
                    index={currentIndex} 
                    isActive={true} 
                    onPlay={() => {}} 
                    onRemove={() => removeFromQueue(currentIndex)} 
                  />
                </div>
              )}

              {/* Up Next */}
              {upcomingTracks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3 px-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Up Next</h3>
                    <button 
                      onClick={clearQueue}
                      className="text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {upcomingTracks.map((song, idx) => {
                      const actualIndex = currentIndex + 1 + idx;
                      return (
                        <QueueItem 
                          key={`${song.id}-${actualIndex}`} 
                          song={song} 
                          index={actualIndex} 
                          isActive={false} 
                          onPlay={playFromQueue} 
                          onRemove={removeFromQueue} 
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {queue.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                  <p>The queue is empty.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
