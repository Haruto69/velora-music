import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, MoreHorizontal, ArrowLeft, PenSquare, Trash2, Plus, Music } from 'lucide-react';
import { mockPlaylists } from '../data/playlists';
import { mockSongs } from '../data/songs';
import { SongRow } from '../components/music/SongRow';
import { usePlayerStore } from '../store/playerStore';
import { usePlaylistStore } from '../store/playlistStore';
import { AlbumGlow } from '../components/animations/AlbumGlow';
import { MagneticButton } from '../components/animations/MagneticButton';
import { SaveButton } from '../components/library/SaveButton';
import { PlaylistStats } from '../components/playlist/PlaylistStats';
import { PlaylistFormModal } from '../components/playlist/PlaylistFormModal';
import { DraggableSongRow } from '../components/playlist/DraggableSongRow';
import { Playlist } from '../types/music';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const customPlaylists = usePlaylistStore(state => state.customPlaylists);
  const reorderPlaylistSongs = usePlaylistStore(state => state.reorderPlaylistSongs);
  const deletePlaylist = usePlaylistStore(state => state.deletePlaylist);
  const updatePlaylist = usePlaylistStore(state => state.updatePlaylist);
  const removeSongFromPlaylist = usePlaylistStore(state => state.removeSongFromPlaylist);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const playlist: Playlist | undefined = useMemo(() => {
    return mockPlaylists.find(p => p.id === id) || customPlaylists.find(p => p.id === id);
  }, [id, customPlaylists]);

  const playlistSongs = useMemo(() => {
    if (!playlist) return [];
    return playlist.songIds
      .map(songId => mockSongs.find(s => s.id === songId))
      .filter((s): s is NonNullable<typeof s> => s !== undefined);
  }, [playlist]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Need to move 8px before dragging starts to allow clicking children
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && playlist?.isCustom) {
      const oldIndex = playlist.songIds.indexOf(active.id as string);
      const newIndex = playlist.songIds.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderPlaylistSongs(playlist.id, oldIndex, newIndex);
      }
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleDelete = () => {
    if (playlist?.isCustom && window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(playlist.id);
      navigate('/library');
    }
  };

  if (!playlist) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Playlist not found</h2>
        <p className="text-muted-foreground mb-6">We couldn't find the playlist you're looking for.</p>
        <Link to="/" className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-10"
    >
      {/* Header */}
      <div className="relative w-full p-6 md:p-10 pt-12 md:pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-background z-0" />
        
        <div className="relative z-10 w-full">
          <div className="mb-6 flex justify-between items-center">
            <button 
              onClick={handleBack}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            
            {playlist.isCustom && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
                  title="Edit Playlist"
                >
                  <PenSquare size={18} />
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Delete Playlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
            <AlbumGlow imageUrl={playlist.coverUrl} className="w-full max-w-[12rem] md:max-w-[15rem] flex-shrink-0 group">
              <div className="aspect-square shadow-2xl rounded-lg overflow-hidden relative">
                {playlist.isCustom && playlist.coverGradient ? (
                  <div className={`w-full h-full bg-gradient-to-br ${playlist.coverGradient}`} />
                ) : (
                  <img src={playlist.coverUrl} alt={playlist.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </AlbumGlow>
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-4 md:mt-0">
            <span className="uppercase text-xs font-bold tracking-wider mb-2 text-primary">Playlist</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">{playlist.title}</h1>
            {playlist.description && (
              <p className="text-sm text-white/80 max-w-lg mb-4">{playlist.description}</p>
            )}
            <PlaylistStats playlist={playlist} songs={playlistSongs} />
          </div>
        </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 md:px-10 py-6 flex items-center gap-6">
        <MagneticButton strength={15}>
          <button 
            onClick={() => {
              if (playlistSongs.length > 0) {
                usePlayerStore.getState().setTrackList(playlistSongs, 0);
              }
            }}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform shadow-[0_0_30px_rgba(139,92,246,0.5)] ${playlistSongs.length > 0 ? 'bg-primary text-primary-foreground hover:scale-105' : 'bg-primary/50 text-primary-foreground/50 cursor-not-allowed'}`}
          >
            <Play size={32} className="ml-1 fill-current" />
          </button>
        </MagneticButton>
        {!playlist.isCustom && <SaveButton itemId={playlist.id} type="playlist" size={32} />}
        <button className="text-muted-foreground hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      {/* Tracklist */}
      <div className="px-6 md:px-10 mt-4">
        {playlistSongs.length > 0 ? (
          <>
            <div className="flex items-center gap-4 py-2 px-4 border-b border-border text-sm text-muted-foreground mb-4">
              <div className="w-8 text-center hidden md:block">#</div>
              <div className="flex-1">Title</div>
              <div className="hidden md:block flex-1">Album</div>
              <div className="w-10 text-right">Time</div>
            </div>
            
            <div className="space-y-1 pb-6">
              {playlist.isCustom ? (
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext 
                    items={playlist.songIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {playlistSongs.map((song, index) => (
                      <DraggableSongRow 
                        key={`${song.id}-${index}`}
                        id={song.id}
                        song={song} 
                        index={index + 1} 
                        contextList={playlistSongs} 
                        onRemove={(songId) => removeSongFromPlaylist(playlist.id, songId)}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              ) : (
                playlistSongs.map((song, index) => (
                  <SongRow key={song.id} song={song} index={index + 1} contextList={playlistSongs} />
                ))
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
              <Music size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">This playlist is empty</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              Let's find some songs for your playlist.
            </p>
            <Link 
              to="/search"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform"
            >
              <Plus size={20} />
              Find Songs
            </Link>
          </div>
        )}
      </div>

      <PlaylistFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        mode="edit"
        initialData={{
          title: playlist.title,
          description: playlist.description || '',
          coverGradient: playlist.coverGradient || ''
        }}
        onSubmit={(title, description, coverGradient) => {
          updatePlaylist(playlist.id, { title, description, coverGradient });
          setIsEditModalOpen(false);
        }}
      />
    </motion.div>
  );
}


