import { Playlist } from "../types/music";

export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    name: "Late Night Drive",
    description: "Perfect tunes for a midnight cruise through the neon city.",
    coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500&h=500",
    songIds: ["song-1", "song-2", "song-3"],
    createdAt: "2024-05-01T00:00:00Z"
  }
];
