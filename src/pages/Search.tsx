import { motion } from 'framer-motion';

export default function Search() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Browse All</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {['Pop', 'Synthwave', 'Electronic', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Lofi'].map((genre, i) => (
          <div 
            key={genre} 
            className="aspect-square rounded-xl p-4 overflow-hidden relative cursor-pointer group hover:scale-[1.02] transition-transform"
            style={{ backgroundColor: `hsl(${i * 45}, 70%, 40%)` }}
          >
            <h3 className="font-bold text-xl text-white">{genre}</h3>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
