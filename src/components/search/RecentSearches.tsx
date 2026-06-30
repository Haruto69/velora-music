import { motion } from 'framer-motion';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (search: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (!searches.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4 mt-8 first:mt-0">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Recent Searches</h2>
        <button 
          onClick={onClear}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {searches.map((search, idx) => (
          <motion.div
            key={`${search}-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm group hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => onSelect(search)}
          >
            <span>{search}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
