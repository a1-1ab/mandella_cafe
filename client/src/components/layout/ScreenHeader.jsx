import cn from '../../lib/cn.js';
import IconButton from '../ui/IconButton.jsx';
import { ArrowRight } from '../ui/icons.jsx';

const ScreenHeader = ({ title, subtitle, onBack, action, className }) => (
  <header className={cn('flex items-start gap-3 px-5 pb-2 pt-1', className)}>
    <div className="flex-1">
      {onBack ? (
        <div className="mb-2 flex items-center gap-2">
          <IconButton label="رجوع" onClick={onBack} className="h-9 w-9">
            <ArrowRight className="h-4 w-4" />
          </IconButton>
        </div>
      ) : null}
      <h1 className="text-[20px] font-extrabold leading-tight text-ink">{title}</h1>
      {subtitle ? <p className="mt-1 text-[11.5px] leading-5 text-muted">{subtitle}</p> : null}
    </div>
    {action || null}
  </header>
);

export default ScreenHeader;
