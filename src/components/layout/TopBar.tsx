import { Bell, Search, User, X } from 'lucide-react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with URL when external changes happen
  useEffect(() => {
    if (location.pathname === '/search') {
      const q = searchParams.get('q') || '';
      if (q !== localQuery) {
        setLocalQuery(q);
      }
    } else {
      setLocalQuery('');
    }
  }, [location.pathname, searchParams]);

  const handleSearchChange = (val: string) => {
    setLocalQuery(val);
    if (location.pathname !== '/search') {
      if (val.trim()) {
        navigate(`/search?q=${encodeURIComponent(val)}`);
      }
    } else {
      if (val.trim()) {
        navigate(`/search?q=${encodeURIComponent(val)}`, { replace: true });
      } else {
        navigate(`/search`, { replace: true });
      }
    }
  };

  const handleClear = () => {
    handleSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <header className="h-20 shrink-0 flex items-center justify-between px-6 md:px-10 bg-background/30 z-10 backdrop-blur-xl border-b border-white/5 shadow-sm transition-all duration-300">
      <div className="flex-1 max-w-xl hidden md:flex items-center bg-black/40 rounded-full border border-white/10 focus-within:border-primary/50 transition-colors shadow-inner relative">
        <div className="pl-4 pr-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input 
          ref={inputRef}
          type="text" 
          value={localQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search for songs, artists, or albums..." 
          className="bg-transparent border-none outline-none text-sm w-full py-2.5 text-foreground placeholder:text-muted-foreground"
        />
        {localQuery && (
          <button 
            onClick={handleClear}
            className="pr-4 pl-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
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
