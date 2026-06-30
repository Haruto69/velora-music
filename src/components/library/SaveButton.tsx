import { Bookmark } from 'lucide-react';
import { useLibraryStore } from '../../store/libraryStore';

interface SaveButtonProps {
  itemId: string;
  type: 'album' | 'playlist';
  className?: string;
  size?: number;
}

export function SaveButton({ itemId, type, className = "", size = 20 }: SaveButtonProps) {
  const isSaved = useLibraryStore((state) => 
    type === 'album' ? state.isAlbumSaved(itemId) : state.isPlaylistSaved(itemId)
  );
  
  const toggleSave = useLibraryStore((state) => 
    type === 'album' ? state.toggleSaveAlbum : state.toggleSavePlaylist
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleSave(itemId);
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center justify-center transition-all hover:scale-110 ${isSaved ? 'text-primary' : 'text-white/70 hover:text-white'} ${className}`}
      title={isSaved ? "Remove from Library" : "Save to Library"}
    >
      <Bookmark size={size} className={isSaved ? 'fill-current drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : ''} />
    </button>
  );
}
