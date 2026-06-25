import { motion } from 'framer-motion';

export default function Library() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Your Library</h1>
      <div className="text-center text-muted-foreground mt-20">
        <p>Your library is empty.</p>
        <p className="text-sm mt-2">Save some playlists or albums to see them here.</p>
      </div>
    </motion.div>
  );
}
