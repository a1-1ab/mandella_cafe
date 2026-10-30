import cn from '../../lib/cn.js';
import { Search } from './icons.jsx';

const SearchField = ({ value, onChange, placeholder, className }) => (
  <label
    className={cn(
      'flex h-[46px] items-center gap-2 rounded-2xl bg-white px-3.5 shadow-card ring-1 ring-line/60',
      className
    )}
  >
    <Search className="h-[18px] w-[18px] text-muted" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-full w-full bg-transparent text-[13px] font-medium text-ink outline-none placeholder:text-muted/80"
    />
  </label>
);

export default SearchField;
