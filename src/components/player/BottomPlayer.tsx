import { usePlayerStore } from '../../store/playerStore';
import { PlayerControls } from './PlayerControls';
import { ProgressSlider } from './ProgressSlider';
import { VolumeControl } from './VolumeControl';
import { ListMusic, AlignLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BottomPlayer() {
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const toggleLyricsDrawer = usePlayerStore(state => state.toggleLyricsDrawer);
  const location = useLocation();

  if (location.pathname === '/now-playing') {
    return null; // Hide global player on Now Playing page
  }

  const trackInfoContent = currentTrack ? (
    <>
      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-md overflow-hidden flex-shrink-0 shadow-lg relative">
        <img src={currentTrack.coverUrl} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-4 h-4 border-t-2 border-r-2 border-white transform rotate-45 -translate-x-1 translate-y-1 opacity-70" />
        </div>
      </div>
      <div className="hidden md:block overflow-hidden min-w-0">
        <p className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">{currentTrack.title}</p>
        <p className="text-xs text-muted-foreground truncate">{currentTrack.artistName}</p>
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
  );

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 h-[72px] md:h-24 bg-background/40 backdrop-blur-2xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] grid grid-cols-[48px_1fr_48px] md:flex md:items-center px-4 md:px-8 md:justify-between z-50 gap-2 md:gap-0 transition-all duration-300">
      
      {/* Subtle top inner glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      {/* Mobile Track Info Link */}
      <Link to="/now-playing" className="flex md:hidden items-center gap-4 self-center group cursor-pointer hover:bg-white/5 p-1 -ml-1 rounded-lg transition-colors">
        {trackInfoContent}
      </Link>

      {/* Desktop Track Info Div */}
      <div className="hidden md:flex items-center gap-4 w-1/3 min-w-[150px] self-center group hover:bg-white/5 p-1 -ml-1 rounded-lg transition-colors">
        {trackInfoContent}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center md:w-1/3 md:max-w-[400px]">
        <PlayerControls />
        <ProgressSlider />
      </div>

      {/* Volume & Queue & Lyrics */}
      <div className="flex items-center justify-end gap-2 md:gap-4 md:w-1/3 self-center">
        <VolumeControl />
        <button 
          onClick={toggleLyricsDrawer}
          className="text-muted-foreground hover:text-white transition-colors hidden md:flex items-center justify-center w-10 h-10 md:w-auto md:h-auto shrink-0"
          title="Lyrics"
        >
          <AlignLeft size={20} />
        </button>
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
