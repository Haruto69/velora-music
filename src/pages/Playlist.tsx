import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export default function Playlist() {
  const { id } = useParams();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Playlist {id}</h1>
      <p className="text-muted-foreground">Playlist details will be implemented in Phase 2.</p>
    </motion.div>
  );
}
