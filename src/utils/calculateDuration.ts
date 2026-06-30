import { Song } from '../types/music';
import { formatTime } from './formatTime';

export function calculateTotalDuration(songs: Song[]): string {
  if (!songs || songs.length === 0) return '0:00';
  
  const totalSeconds = songs.reduce((acc, song) => acc + (song.duration || 0), 0);
  
  if (totalSeconds >= 3600) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} hr ${minutes} min`;
  }
  
  return formatTime(totalSeconds);
}
