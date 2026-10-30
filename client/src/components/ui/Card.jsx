import { cva } from 'class-variance-authority';
import cn from '../../lib/cn.js';

const cardVariants = cva('rounded-[22px]', {
  variants: {
    tone: {
      white: 'bg-white shadow-card ring-1 ring-line/70',
      plain: 'bg-white',
      teal: 'bg-teal text-white shadow-card',
      amber: 'bg-amber text-ink shadow-card',
      sand: 'bg-sand/70',
      dark: 'bg-ink text-white',
    },
    padded: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-5',
    },
  },
  defaultVariants: { tone: 'white', padded: 'md' },
});

const Card = ({ tone, padded, className, children, ...rest }) => (
  <div className={cn(cardVariants({ tone, padded }), className)} {...rest}>
    {children}
  </div>
);

export default Card;
