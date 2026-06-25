import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomPlayer } from '../player/BottomPlayer';
import { QueueDrawer } from '../player/QueueDrawer';
import { MobileNav } from './MobileNav';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

export function AppLayout() {
  useAudioPlayer(); // Mounts the persistent audio element

  return (
    <div className="h-screen w-full max-w-full overflow-hidden bg-background relative flex">
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none z-0"></div>

      {/* Sidebar container */}
      <div className="hidden md:block w-64 flex-shrink-0 relative z-20 border-r border-border bg-card/50 backdrop-blur-md">
        <div className="h-[calc(100vh-var(--player-desktop))] w-64 overflow-y-auto scrollbar-hide">
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-var(--player-mobile))] md:h-[calc(100vh-var(--player-desktop))] pb-20 md:pb-8 relative">
        <TopBar />
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>

      <QueueDrawer />

      <BottomPlayer />
      <MobileNav />
    </div>
  );
}
