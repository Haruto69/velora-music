export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl?: string; // Phase 2
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  releaseYear: number;
  coverUrl: string;
  songIds: string[];
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  albumIds: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl: string;
  songIds: string[];
  createdAt: string;
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
