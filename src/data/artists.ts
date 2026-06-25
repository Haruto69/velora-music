import { Artist } from "../types/music";

export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    name: "Synthwave Rider",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=500&h=500",
    bio: "Creating electronic soundscapes for the neon generation. Known for blending 80s nostalgia with modern production techniques.",
    genre: "Synthwave",
    monthlyListeners: 1250000,
    albumIds: ["album-1"]
  },
  {
    id: "artist-2",
    name: "Hologram Heart",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=500&h=500",
    bio: "Digital emotions translated into frequencies.",
    genre: "Electronic",
    monthlyListeners: 850000,
    albumIds: ["album-2"]
  },
  {
    id: "artist-3",
    name: "Star Cruiser",
    imageUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=500&h=500",
    bio: "Exploring the cosmos through synthesizers.",
    genre: "Retrowave",
    monthlyListeners: 420000,
    albumIds: ["album-3"]
  },
  {
    id: "artist-4",
    name: "Luna Echo",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a1a2a5956020?auto=format&fit=crop&q=80&w=500&h=500",
    bio: "Pop melodies with an ethereal touch.",
    genre: "Pop",
    monthlyListeners: 3100000,
    albumIds: ["album-4"]
  }
];
