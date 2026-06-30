import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Song } from '../../types/music';
import { SongRow } from '../music/SongRow';

interface DraggableSongRowProps {
  id: string; // The song id or unique id in list
  song: Song;
  index: number;
  contextList: Song[];
  onRemove?: (songId: string) => void;
}

export function DraggableSongRow({ id, song, index, contextList, onRemove }: DraggableSongRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 group/draggable">
      <div 
        {...attributes} 
        {...listeners} 
        className="text-white/20 hover:text-white cursor-grab active:cursor-grabbing p-2 rounded opacity-0 group-hover/draggable:opacity-100 transition-opacity hidden md:flex items-center justify-center"
      >
        <GripVertical size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
        <SongRow song={song} index={index} contextList={contextList} />
      </div>

      {onRemove && (
        <button 
          onClick={() => onRemove(song.id)}
          className="text-white/30 hover:text-red-500 hover:bg-white/10 p-2 rounded-full transition-all opacity-0 group-hover/draggable:opacity-100 hidden md:flex items-center justify-center"
          title="Remove from playlist"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}
