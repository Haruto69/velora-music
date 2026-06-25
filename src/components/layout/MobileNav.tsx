import { Home, Library, Search, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function MobileNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-xl border-t border-border flex items-center justify-around px-4 z-50">
      <NavItem to="/" icon={<Home size={24} />} isActive={location.pathname === '/'} label="Home" />
      <NavItem to="/search" icon={<Search size={24} />} isActive={location.pathname === '/search'} label="Search" />
      <NavItem to="/library" icon={<Library size={24} />} isActive={location.pathname === '/library'} label="Library" />
      <NavItem to="/favorites" icon={<Heart size={24} />} isActive={location.pathname === '/favorites'} label="Favorites" />
    </div>
  );
}

function NavItem({ to, icon, isActive, label }: { to: string; icon: React.ReactNode; isActive: boolean; label: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}
