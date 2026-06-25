import { Song } from "../types/music";

export const mockSongs: Song[] = [
  {
    id: "song-1",
    title: "Neon Dreams",
    artistId: "artist-1",
    artistName: "Synthwave Rider",
    albumId: "album-1",
    albumTitle: "Midnight City",
    duration: 372, // SoundHelix-Song-1 is around 6:12
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500&h=500",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Phase 3 Demo URL
    genre: "Synthwave",
    mood: "Energetic",
    plays: 1205000,
    releaseYear: 2024,
    isExplicit: false
  },
  {
    id: "song-2",
    title: "Cybernetic Love",
    artistId: "artist-2",
    artistName: "Hologram Heart",
    albumId: "album-2",
    albumTitle: "Digital Romance",
    duration: 425, // SoundHelix-Song-2 is around 7:05
    coverUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=500&h=500",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    genre: "Electronic",
    mood: "Chill",
    plays: 850000,
    releaseYear: 2023,
    isExplicit: false
  },
  {
    id: "song-3",
    title: "Tokyo Rain",
    artistId: "artist-1",
    artistName: "Synthwave Rider",
    albumId: "album-1",
    albumTitle: "Midnight City",
    duration: 344, // SoundHelix-Song-3 is around 5:44
    coverUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=500&h=500",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    genre: "Synthwave",
    mood: "Melancholic",
    plays: 2100000,
    releaseYear: 2024,
    isExplicit: false
  },
  {
    id: "song-4",
    title: "Galactic Highway",
    artistId: "artist-3",
    artistName: "Star Cruiser",
    albumId: "album-3",
    albumTitle: "Voyage",
    duration: 302, // SoundHelix-Song-4 is around 5:02
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500&h=500",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    genre: "Retrowave",
    mood: "Driving",
    plays: 540000,
    releaseYear: 2022,
    isExplicit: false
  },
  {
    id: "song-5",
    title: "Night Drive",
    artistId: "artist-4",
    artistName: "Luna Echo",
    albumId: "album-4",
    albumTitle: "Echoes",
    duration: 353, // SoundHelix-Song-5 is around 5:53
    coverUrl: "https://images.unsplash.com/photo-1516280440502-861f5bc91244?auto=format&fit=crop&q=80&w=500&h=500",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    genre: "Pop",
    mood: "Chill",
    plays: 1500000,
    releaseYear: 2024,
    isExplicit: true
  }
];
