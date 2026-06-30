import { Playlist } from "../types/music";

export const mockPlaylists: Playlist[] = [
  {
    id: "playlist-1",
    title: "Late Night Drive",
    description: "Perfect tunes for a midnight cruise through the neon city.",
    coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500&h=500",
    songIds: ["song-1", "song-5", "song-3", "song-4"],
    mood: "Chill",
    createdBy: "Velora",
    createdAt: "2024-05-01T00:00:00Z"
  },
  {
    id: "playlist-2",
    title: "Cyberpunk Vibes",
    description: "High energy electronic tracks for hacking the mainframe.",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500&h=500",
    songIds: ["song-1", "song-2", "song-3"],
    mood: "Energetic",
    createdBy: "Velora",
    createdAt: "2024-05-15T00:00:00Z"
  },
  {
    id: "playlist-3",
    title: "Cosmic Journey",
    description: "Float through space with these ambient and retrowave hits.",
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500&h=500",
    songIds: ["song-4", "song-2", "song-8", "song-11"],
    mood: "Focus",
    createdBy: "Velora",
    createdAt: "2024-06-01T00:00:00Z"
  },
  {
    id: "playlist-4",
    title: "Lo-Fi Beats to Relax To",
    description: "Chill out with these soothing instrumental tracks.",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=500&h=500",
    songIds: ["song-6", "song-9"],
    mood: "Chill",
    createdBy: "Velora",
    createdAt: "2024-06-10T00:00:00Z"
  }
];
