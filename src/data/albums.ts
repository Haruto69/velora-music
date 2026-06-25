import { Album } from "../types/music";

export const mockAlbums: Album[] = [
  {
    id: "album-1",
    title: "Midnight City",
    artistId: "artist-1",
    artistName: "Synthwave Rider",
    releaseYear: 2024,
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500&h=500",
    genre: "Synthwave",
    songIds: ["song-1", "song-3"]
  },
  {
    id: "album-2",
    title: "Digital Romance",
    artistId: "artist-2",
    artistName: "Hologram Heart",
    releaseYear: 2023,
    coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500&h=500",
    genre: "Electronic",
    songIds: ["song-2"]
  },
  {
    id: "album-3",
    title: "Voyage",
    artistId: "artist-3",
    artistName: "Star Cruiser",
    releaseYear: 2022,
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500&h=500",
    genre: "Retrowave",
    songIds: ["song-4"]
  },
  {
    id: "album-4",
    title: "Echoes",
    artistId: "artist-4",
    artistName: "Luna Echo",
    releaseYear: 2024,
    coverUrl: "https://images.unsplash.com/photo-1516280440502-861f5bc91244?auto=format&fit=crop&q=80&w=500&h=500",
    genre: "Pop",
    songIds: ["song-5"]
  }
];
