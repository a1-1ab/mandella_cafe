import cn from '../../lib/cn.js';

const IconButton = ({ label, className, children, ...rest }) => (
  <button
    type="button"
    aria-label={label}
    className={cn(
      'press flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-card ring-1 ring-line/60',
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default IconButton;
