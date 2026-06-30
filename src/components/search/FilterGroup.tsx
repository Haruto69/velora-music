interface FilterProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function FilterGroup({ title, options, selected, onChange }: FilterProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(o => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSelected 
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/5 text-muted-foreground border-transparent hover:bg-white/10 hover:text-foreground'
              } border`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
