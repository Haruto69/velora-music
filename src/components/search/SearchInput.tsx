import { Search, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchInput({ 
  value, 
  onChange, 
  onFocus, 
  onBlur, 
  placeholder = "Search for songs, artists, or albums...",
  className = "",
  autoFocus = false
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`relative flex items-center bg-black/40 rounded-full border border-white/10 focus-within:border-primary/50 transition-colors shadow-inner ${className}`}>
      <div className="pl-4 pr-3 flex items-center pointer-events-none">
        <Search size={18} className="text-muted-foreground" />
      </div>
      <input 
        ref={inputRef}
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-sm w-full py-2.5 text-foreground placeholder:text-muted-foreground"
      />
      {value && (
        <button 
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="pr-4 pl-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
