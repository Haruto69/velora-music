import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Good Evening</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {/* Placeholder cards */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg overflow-hidden cursor-pointer group">
            <div className="w-16 h-16 bg-white/10 flex-shrink-0">
              <img src={`https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200&h=200&sig=${i}`} alt="Mix" className="w-full h-full object-cover" />
            </div>
            <p className="font-semibold px-2 truncate group-hover:text-primary transition-colors">Daily Mix {i}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Made For You</h2>
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[160px] md:min-w-[200px] bg-card p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="aspect-square rounded-md overflow-hidden mb-4 relative shadow-lg">
              <img src={`https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400&h=400&sig=${i}`} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-semibold truncate">Discover Weekly</h3>
            <p className="text-sm text-muted-foreground truncate mt-1">New music just for you.</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
