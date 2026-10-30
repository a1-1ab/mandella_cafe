import cn from '../../lib/cn.js';

const SectionHeading = ({ title, hint, action, className }) => (
  <div className={cn('flex items-center justify-between gap-3', className)}>
    <div className="flex items-baseline gap-2">
      <h2 className="text-[15.5px] font-extrabold text-ink">{title}</h2>
      {hint ? <span className="text-[11px] font-medium text-muted">{hint}</span> : null}
    </div>
    {action || null}
  </div>
);

export default SectionHeading;
