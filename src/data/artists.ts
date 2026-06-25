import { Artist } from "../types/music";

export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    name: "Synthwave Rider",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=500&h=500",
    bio: "Creating electronic soundscapes for the neon generation.",
    albumIds: ["album-1"]
  },
  {
    id: "artist-2",
    name: "Hologram Heart",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=500&h=500",
    albumIds: []
  }
];
