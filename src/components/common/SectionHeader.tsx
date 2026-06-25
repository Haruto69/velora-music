import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  href?: string;
}

export function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 mt-8 first:mt-0">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      {href && (
        <Link 
          to={href} 
          className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors group"
        >
          See all
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
