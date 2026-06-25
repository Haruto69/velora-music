import { motion } from 'framer-motion';

export default function Favorites() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>
      <div className="text-center text-muted-foreground mt-20">
        <p>No favorite tracks yet.</p>
      </div>
    </motion.div>
  );
}
