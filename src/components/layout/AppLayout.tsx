import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomPlayer } from '../player/BottomPlayer';
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
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-[calc(100vh-var(--player-mobile))] md:h-[calc(100vh-var(--player-desktop))] overflow-y-auto overflow-x-hidden safe-bottom">
        <TopBar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <BottomPlayer />
      <MobileNav />
    </div>
  );
}
