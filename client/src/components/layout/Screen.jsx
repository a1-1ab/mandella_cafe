import cn from '../../lib/cn.js';
import StatusBar from './StatusBar.jsx';
import HomeIndicator from './HomeIndicator.jsx';

const Screen = ({ children, className, indicator = true }) => (
  <div className="flex min-h-dvh w-full justify-center bg-[#E8E1D5] md:py-8">
    <div
      className={cn(
        'relative flex min-h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-ivory',
        'md:min-h-0 md:h-[932px] md:rounded-[42px] md:shadow-float md:ring-1 md:ring-ink/5',
        className
      )}
    >
      <StatusBar />
      {children}
      {indicator ? <HomeIndicator /> : null}
    </div>
  </div>
);

export default Screen;
