import { Bell, Search, User } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-20 shrink-0 flex items-center justify-between px-6 md:px-10 bg-background/30 z-10 backdrop-blur-xl border-b border-white/5 shadow-sm transition-all duration-300">
      <div className="flex-1 max-w-xl hidden md:flex items-center bg-black/40 rounded-full px-4 py-2 border border-white/10 focus-within:border-primary/50 transition-colors shadow-inner">
        <Search size={18} className="text-muted-foreground mr-3" />
        <input 
          type="text" 
          placeholder="Search for songs, artists, or albums..." 
          className="bg-transparent border-none outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
        />
      </div>
      
      {/* Mobile Title Placeholder */}
      <div className="md:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="font-bold text-primary-foreground text-sm">V</span>
        </div>
        <h1 className="text-xl font-bold tracking-wider">Velora</h1>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors">
          <Bell size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}
