import cn from '../../lib/cn.js';

const tones = {
  teal: 'border-teal bg-teal text-white',
  tealOutline: 'border-teal bg-teal-soft/70 text-teal-deep',
  amber: 'border-amber bg-amber text-ink',
  neutral: 'border-line bg-white text-muted',
};

const Chip = ({ active = false, tone = 'teal', className, children, ...rest }) => (
  <button
    type="button"
    aria-pressed={active}
    className={cn(
      'press whitespace-nowrap rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors',
      active ? tones[tone] : 'border-line bg-white/80 text-muted hover:border-teal/40',
      className
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Chip;
