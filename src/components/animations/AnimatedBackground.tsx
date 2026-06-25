import { GradientOrb } from './GradientOrb';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-20" />
      
      <GradientOrb 
        color="hsl(var(--primary))" 
        size="60vw" 
        top="10%" 
        left="20%" 
        animationDuration={25} 
      />
      
      <GradientOrb 
        color="hsl(var(--secondary))" 
        size="50vw" 
        top="60%" 
        left="80%" 
        animationDuration={22} 
        animationDelay={2} 
      />
      
      <GradientOrb 
        color="hsl(var(--accent))" 
        size="45vw" 
        top="80%" 
        left="30%" 
        animationDuration={28} 
        animationDelay={4} 
      />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
