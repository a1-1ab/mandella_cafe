import cn from '../../lib/cn.js';
import { Minus, Plus } from './icons.jsx';

const Stepper = ({ value, onIncrement, onDecrement, tone = 'teal', className }) => {
  const buttonTone =
    tone === 'amber'
      ? 'border-amber/60 text-ink hover:bg-amber/20'
      : 'border-line text-teal-deep hover:bg-teal-soft';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        aria-label="زيادة الكمية"
        onClick={onIncrement}
        className={cn('press flex h-8 w-8 items-center justify-center rounded-full border bg-white', buttonTone)}
      >
        <Plus />
      </button>
      <span className="min-w-5 text-center text-[15px] font-bold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="تقليل الكمية"
        onClick={onDecrement}
        className={cn('press flex h-8 w-8 items-center justify-center rounded-full border bg-white', buttonTone)}
      >
        <Minus />
      </button>
    </div>
  );
};

export default Stepper;
