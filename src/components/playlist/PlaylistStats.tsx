import { Song, Playlist } from '../../types/music';
import { calculateTotalDuration } from '../../utils/calculateDuration';
import { Calendar, Clock, Music } from 'lucide-react';

interface PlaylistStatsProps {
  playlist: Playlist;
  songs: Song[];
}

export function PlaylistStats({ playlist, songs }: PlaylistStatsProps) {
  const formattedDate = playlist.createdAt 
    ? new Date(playlist.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;

  return (
    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-white/80 font-medium">
      <div className="flex items-center gap-2">
        <span className="text-white hover:text-primary transition-colors cursor-pointer">
          {playlist.createdBy || 'Velora'}
        </span>
      </div>
      
      <div className="flex items-center gap-1.5">
        <Music size={14} className="text-muted-foreground" />
        <span>{songs.length} {songs.length === 1 ? 'song' : 'songs'}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <Clock size={14} className="text-muted-foreground" />
        <span>{calculateTotalDuration(songs)}</span>
      </div>

      {formattedDate && (
        <div className="flex items-center gap-1.5 hidden md:flex">
          <Calendar size={14} className="text-muted-foreground" />
          <span>{formattedDate}</span>
        </div>
      )}

      {playlist.isCustom && (
        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs uppercase tracking-wider">
          Custom
        </span>
      )}
    </div>
  );
}
