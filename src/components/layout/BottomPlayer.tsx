import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export function BottomPlayer() {
  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 h-20 md:h-24 bg-card/80 backdrop-blur-xl border-t border-border flex items-center px-4 md:px-8 justify-between z-50">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-[150px]">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-md overflow-hidden flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200&h=200" alt="Cover" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="hidden sm:block overflow-hidden">
          <p className="text-sm font-semibold truncate text-foreground">Neon Dreams</p>
          <p className="text-xs text-muted-foreground truncate">Synthwave Rider</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-[400px]">
        <div className="flex items-center gap-6">
          <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            <SkipBack size={20} />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            <Play size={20} className="ml-1" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            <SkipForward size={20} />
          </button>
        </div>
        <div className="w-full mt-2 flex items-center gap-2 hidden md:flex">
          <span className="text-[10px] text-muted-foreground">1:23</span>
          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/3 rounded-full relative group">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">3:34</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-1/3 hidden md:flex">
        <Volume2 size={18} className="text-muted-foreground" />
        <div className="w-24 h-1 bg-white/10 rounded-full">
          <div className="h-full bg-primary w-2/3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
