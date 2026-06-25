import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { MoodBackground } from '../components/player/MoodBackground';
import { AnimatedAlbumCover } from '../components/player/AnimatedAlbumCover';
import { LyricsPanel } from '../components/player/LyricsPanel';
import { AudioVisualizer } from '../components/visualizer/AudioVisualizer';
import { PlayerControls } from '../components/player/PlayerControls';
import { ProgressSlider } from '../components/player/ProgressSlider';
import { VolumeControl } from '../components/player/VolumeControl';
import { ListMusic, Heart, MoreHorizontal, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function NowPlaying() {
  const { currentTrack, isPlaying, toggleQueueDrawer } = usePlayerStore();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (!currentTrack) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <ListMusic size={40} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Nothing is playing</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Pick a song from your library or a playlist to see the Now Playing experience.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="relative w-full h-full min-h-[calc(100vh-8rem)] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl -mt-2 md:mt-0"
    >
      {/* Dynamic Background */}
      <MoodBackground 
        genre={currentTrack.genre} 
        mood={currentTrack.mood} 
        coverUrl={currentTrack.coverUrl} 
      />

      <div className="relative z-10 flex flex-col w-full h-full p-6 md:p-10">
        
        {/* Global Header inside NowPlaying */}
        <div className="w-full flex justify-between items-center mb-6">
          <button 
            onClick={handleBack}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-primary pointer-events-auto"
          >
            <ArrowLeft size={18} className="hidden md:block" />
            <ChevronDown size={20} className="md:hidden" />
            <span className="hidden md:inline">Back</span>
          </button>
          
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">Now Playing</span>
          
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <MoreHorizontal size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row w-full h-full gap-10">
          
          {/* Left Side: Art & Controls */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start max-w-md mx-auto md:mx-0">
            
            <div className="w-full mb-8 mt-4 md:mt-0">
              <AnimatedAlbumCover imageUrl={currentTrack.coverUrl} isPlaying={isPlaying} />
            </div>

            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex flex-col min-w-0 pr-4">
                <h1 className="text-3xl md:text-4xl font-bold truncate text-white drop-shadow-md">
                  {currentTrack.title}
                </h1>
                <p className="text-lg md:text-xl text-white/70 truncate hover:text-white transition-colors cursor-pointer mt-1">
                  {currentTrack.artistName}
                </p>
              </div>
              <button className="text-white/50 hover:text-primary hover:scale-110 transition-all shrink-0 p-2">
                <Heart size={28} />
              </button>
            </div>

            {/* Full Playback Controls Area */}
            <div className="w-full flex flex-col gap-6 bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <ProgressSlider />
              
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <div className="hidden md:flex w-20 lg:w-24 shrink-0 items-center justify-start">
                  <VolumeControl />
                </div>
                
                <div className="flex-1 flex justify-center min-w-0">
                  <PlayerControls showExtraControlsOnMobile={true} />
                </div>
                
                <div className="hidden md:flex w-20 lg:w-24 shrink-0 items-center justify-end">
                  <button 
                    onClick={toggleQueueDrawer}
                    className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                    title="Play Queue"
                  >
                    <ListMusic size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Lyrics & Visualizer */}
          <div className="w-full md:w-1/2 flex flex-col h-full mt-10 md:mt-0 relative">
            <div className="flex items-center justify-between mb-4 px-4 md:px-0">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/50">Lyrics</h3>
              <div className="w-24">
                <AudioVisualizer isPlaying={isPlaying} barCount={8} />
              </div>
            </div>
            
            <div className="flex-1 bg-black/10 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
              <LyricsPanel lyrics={currentTrack.lyrics} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
