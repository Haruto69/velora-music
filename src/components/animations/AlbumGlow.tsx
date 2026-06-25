import { ReactNode } from 'react';

interface AlbumGlowProps {
  imageUrl: string;
  children: ReactNode;
  className?: string;
  glowOpacity?: number;
}

export function AlbumGlow({ imageUrl, children, className = '', glowOpacity = 0.5 }: AlbumGlowProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Background Glow Layer */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-500 rounded-xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px) saturate(200%) brightness(150%)',
          opacity: glowOpacity,
          transform: 'scale(0.95) translateY(10%)',
        }}
      />
      {/* Foreground Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
