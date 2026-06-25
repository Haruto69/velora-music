export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumTitle?: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string; // Real remote URL for Phase 3
  genre?: string;
  mood?: string;
  plays?: number;
  releaseYear?: number;
  isExplicit?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseYear: number;
  coverUrl: string;
  genre?: string;
  songIds: string[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre?: string;
  monthlyListeners?: number;
  bio?: string;
  albumIds: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverUrl: string;
  songIds: string[];
  mood?: string;
  createdBy?: string;
  createdAt?: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
}

export interface Mood {
  id: string;
  name: string;
  color: string;
}
