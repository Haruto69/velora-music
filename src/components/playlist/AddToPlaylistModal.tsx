import { X, Plus } from 'lucide-react';
import { usePlaylistStore } from '../../store/playlistStore';
import { useState } from 'react';
import { PlaylistFormModal } from './PlaylistFormModal';

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  songId: string;
}

export function AddToPlaylistModal({ isOpen, onClose, songId }: AddToPlaylistModalProps) {
  const customPlaylists = usePlaylistStore(state => state.customPlaylists);
  const addSongToPlaylist = usePlaylistStore(state => state.addSongToPlaylist);
  const createPlaylist = usePlaylistStore(state => state.createPlaylist);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!isOpen && !isCreateModalOpen) return null;

  const handleAddToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, songId);
    onClose();
  };

  const handleCreatePlaylist = (title: string, description: string, coverGradient: string) => {
    const newId = createPlaylist(title, description, coverGradient);
    addSongToPlaylist(newId, songId);
    setIsCreateModalOpen(false);
    onClose();
  };

  if (isCreateModalOpen) {
    return (
      <PlaylistFormModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
        mode="create"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-card w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">Add to Playlist</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
          >
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <span className="font-medium group-hover:text-primary transition-colors">Create new playlist</span>
          </button>

          {customPlaylists.length > 0 && <div className="h-px bg-white/5 my-2" />}

          {customPlaylists.map(playlist => {
            const isAdded = playlist.songIds.includes(songId);
            return (
              <button
                key={playlist.id}
                onClick={() => handleAddToPlaylist(playlist.id)}
                disabled={isAdded}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-colors text-left group ${isAdded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/5'}`}
              >
                <div className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br ${playlist.coverGradient || 'from-purple-500 to-indigo-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{playlist.title}</p>
                  <p className="text-xs text-muted-foreground">{playlist.songIds.length} songs</p>
                </div>
                {isAdded && <span className="text-xs text-primary font-medium">Added</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
