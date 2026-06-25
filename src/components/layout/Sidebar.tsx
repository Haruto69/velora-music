import { Link } from 'react-router-dom';
import { Home, Library, Search, Heart, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-card/50 backdrop-blur-md border-r border-border p-6 h-full">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="font-bold text-primary-foreground text-sm">V</span>
        </div>
        <h1 className="text-xl font-bold tracking-wider text-foreground">Velora</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem to="/" icon={<Home size={20} />} label="Home" />
        <NavItem to="/search" icon={<Search size={20} />} label="Search" />
        <NavItem to="/library" icon={<Library size={20} />} label="Library" />
        <NavItem to="/favorites" icon={<Heart size={20} />} label="Favorites" />
      </nav>

      <div className="mt-auto">
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 group"
    >
      <span className="group-hover:scale-110 transition-transform duration-300 text-primary">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
