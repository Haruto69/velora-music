import { Heart } from 'lucide-react';
import { useLibraryStore } from '../../store/libraryStore';

interface LikeButtonProps {
  songId: string;
  className?: string;
}

export function LikeButton({ songId, className = "" }: LikeButtonProps) {
  const isLiked = useLibraryStore((state) => state.isSongLiked(songId));
  const toggleLikeSong = useLibraryStore((state) => state.toggleLikeSong);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLikeSong(songId);
  };

  return (
    <button 
      onClick={handleClick}
      className={`hover:scale-110 transition-transform ${isLiked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} ${className}`}
      title={isLiked ? "Unlike" : "Like"}
    >
      <Heart size={16} className={isLiked ? 'fill-current drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
    </button>
  );
}
