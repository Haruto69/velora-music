import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PlaylistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, coverGradient: string) => void;
  initialData?: {
    title: string;
    description: string;
    coverGradient: string;
  };
  mode: 'create' | 'edit';
}

const GRADIENTS = [
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-fuchsia-500 to-pink-600',
  'from-slate-600 to-slate-800'
];

export function PlaylistFormModal({ isOpen, onClose, onSubmit, initialData, mode }: PlaylistFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gradient, setGradient] = useState(GRADIENTS[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setGradient(initialData.coverGradient || GRADIENTS[0]);
      } else {
        setTitle('');
        setDescription('');
        setGradient(GRADIENTS[0]);
      }
      setError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Playlist name is required');
      return;
    }
    if (title.length > 50) {
      setError('Playlist name must be less than 50 characters');
      return;
    }
    
    onSubmit(title.trim(), description.trim(), gradient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-card w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">{mode === 'create' ? 'Create Playlist' : 'Edit Playlist'}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-muted-foreground">Name</label>
            <input 
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Playlist"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-muted-foreground">Description (Optional)</label>
            <textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this playlist about?"
              rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Cover Style</label>
            <div className="flex flex-wrap gap-3">
              {GRADIENTS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradient(g)}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${g} ${gradient === g ? 'ring-2 ring-white ring-offset-2 ring-offset-card scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'} transition-all`}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform"
            >
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
