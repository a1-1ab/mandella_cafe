import cn from '../../lib/cn.js';

const PageFooter = ({ children, className }) => (
  <div className={cn('mt-auto space-y-3 px-5 pb-2 pt-4', className)}>{children}</div>
);

export default PageFooter;
