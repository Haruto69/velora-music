import { Song } from '../types/music';

export const calculateDuration = (songs: Song[]): number => {
  return songs.reduce((total, song) => total + song.duration, 0);
};
