import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomPlayer } from './BottomPlayer';
import { MobileNav } from './MobileNav';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>

      <Sidebar />
      
      <main className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
        <TopBar />
        
        <div className="flex-1 overflow-y-auto pb-24 md:pb-28 scrollbar-hide">
          <Outlet />
        </div>
      </main>

      <BottomPlayer />
      <MobileNav />
    </div>
  );
}
