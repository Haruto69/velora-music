import { usePlayerStore } from '../../store/playerStore';
import { PlayerControls } from './PlayerControls';
import { ProgressSlider } from './ProgressSlider';
import { VolumeControl } from './VolumeControl';

export function BottomPlayer() {
  const currentTrack = usePlayerStore(state => state.currentTrack);

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 h-[72px] md:h-24 bg-card/80 backdrop-blur-xl border-t border-border flex items-center px-4 md:px-8 justify-between z-50">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-[150px]">
        {currentTrack ? (
          <>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-md overflow-hidden flex-shrink-0 shadow-lg">
              <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">{currentTrack.artistName}</p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4 opacity-50">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-md flex-shrink-0 border border-white/5" />
            <div className="hidden sm:flex flex-col gap-2">
              <div className="w-24 h-3 bg-white/10 rounded-full" />
              <div className="w-16 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-[400px]">
        <PlayerControls />
        <ProgressSlider />
      </div>

      {/* Volume */}
      <VolumeControl />
    </div>
  );
}
