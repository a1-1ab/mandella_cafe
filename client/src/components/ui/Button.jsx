import { cva } from 'class-variance-authority';
import cn from '../../lib/cn.js';

const buttonVariants = cva(
  'press inline-flex items-center justify-center gap-2 rounded-full font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-teal text-white shadow-card hover:bg-teal-deep',
        amber: 'bg-amber text-ink shadow-card hover:bg-[#eda52d]',
        dark: 'bg-ink text-white',
        outline: 'border border-teal/45 bg-white/70 text-teal-deep',
        ghost: 'bg-transparent text-ink',
        soft: 'bg-teal-soft text-teal-deep',
      },
      size: {
        sm: 'h-9 px-4 text-[12px]',
        md: 'h-12 px-5 text-[13.5px]',
        lg: 'h-[52px] px-6 text-[15px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

const Button = ({ variant, size, className, type = 'button', children, ...rest }) => (
  <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
    {children}
  </button>
);

export { buttonVariants };
export default Button;
