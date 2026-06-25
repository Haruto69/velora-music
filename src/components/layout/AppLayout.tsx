import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomPlayer } from '../player/BottomPlayer';
import { QueueDrawer } from '../player/QueueDrawer';
import { LyricsDrawer } from '../player/LyricsDrawer';
import { MobileNav } from './MobileNav';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { AnimatedBackground } from '../animations/AnimatedBackground';

export function AppLayout() {
  useAudioPlayer(); // Mounts the persistent audio element

  return (
    <div className="h-screen w-full max-w-full overflow-hidden bg-background relative flex">
      <AnimatedBackground />

      {/* Sidebar container */}
      <div className="hidden md:block w-64 flex-shrink-0 relative z-20 border-r border-white/5 bg-black/20 backdrop-blur-2xl shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="h-[calc(100vh-var(--player-desktop))] w-64 overflow-y-auto scrollbar-hide">
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-[calc(100vh-var(--player-mobile))] md:h-[calc(100vh-var(--player-desktop))] overflow-hidden pb-20 md:pb-8">
        <TopBar />
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto pt-6 md:pt-8 px-4 md:px-0">
            <Outlet />
          </div>
        </main>
      </div>

      <QueueDrawer />
      <LyricsDrawer />

      <BottomPlayer />
      <MobileNav />
    </div>
  );
}
