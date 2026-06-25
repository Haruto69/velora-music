import { usePlayerStore } from '../../store/playerStore';
import { PlayerControls } from './PlayerControls';
import { ProgressSlider } from './ProgressSlider';
import { VolumeControl } from './VolumeControl';
import { ListMusic } from 'lucide-react';

export function BottomPlayer() {
  const currentTrack = usePlayerStore(state => state.currentTrack);

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 h-[72px] md:h-24 bg-card/80 backdrop-blur-xl border-t border-border grid grid-cols-[48px_1fr_48px] md:flex md:items-center px-4 md:px-8 md:justify-between z-50 gap-2 md:gap-0">
      
      {/* Track Info */}
      <div className="flex items-center gap-4 md:w-1/3 md:min-w-[150px] self-center">
        {currentTrack ? (
          <>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-md overflow-hidden flex-shrink-0 shadow-lg">
              <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block overflow-hidden min-w-0">
              <p className="text-sm font-semibold truncate text-foreground">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">{currentTrack.artistName}</p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 opacity-50 w-full">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-md flex-shrink-0 border border-white/5" />
            <div className="hidden md:flex flex-col gap-2 min-w-0 w-full">
              <div className="w-24 h-3 bg-white/10 rounded-full" />
              <div className="w-16 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center md:w-1/3 md:max-w-[400px]">
        <PlayerControls />
        <ProgressSlider />
      </div>

      {/* Volume & Queue */}
      <div className="flex items-center justify-end gap-2 md:gap-4 md:w-1/3 self-center">
        <VolumeControl />
        <button 
          onClick={usePlayerStore.getState().toggleQueueDrawer}
          className="text-muted-foreground hover:text-white transition-colors hidden md:flex items-center justify-center w-10 h-10 md:w-auto md:h-auto shrink-0"
          title="Play Queue"
        >
          <ListMusic size={20} />
        </button>
        <div className="w-12 h-12 md:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}
