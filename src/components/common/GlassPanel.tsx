import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlassPanel({ children, className = '', intensity = 'medium' }: GlassPanelProps) {
  const intensityClasses = {
    low: 'bg-black/20 backdrop-blur-md border-white/5',
    medium: 'bg-card/40 backdrop-blur-xl border-white/10',
    high: 'bg-card/60 backdrop-blur-2xl border-white/10 shadow-2xl',
  };

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${intensityClasses[intensity]} ${className}`}>
      {children}
    </div>
  );
}
