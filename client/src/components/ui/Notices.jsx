import Card from './Card.jsx';
import Button from './Button.jsx';

export const LoadingBlock = ({ label = 'جاري التحميل...', className = '' }) => (
  <div className={`flex flex-col items-center gap-3 py-10 text-center ${className}`}>
    <span className="h-7 w-7 animate-spin rounded-full border-2 border-teal/30 border-t-teal" />
    <p className="text-[12.5px] font-medium text-muted">{label}</p>
  </div>
);

export const EmptyBlock = ({ title, message, actionLabel, onAction }) => (
  <Card tone="white" padded="lg" className="flex flex-col items-center gap-3 text-center">
    <span className="text-2xl">☕</span>
    <h3 className="text-[14px] font-bold text-ink">{title}</h3>
    {message ? <p className="text-[12px] leading-6 text-muted">{message}</p> : null}
    {actionLabel ? (
      <Button size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </Card>
);

export const ErrorBlock = ({ message, onRetry }) => (
  <Card tone="white" padded="lg" className="flex flex-col items-center gap-3 text-center">
    <span className="text-2xl">⚠️</span>
    <p className="text-[12.5px] font-semibold text-price">{message}</p>
    {onRetry ? (
      <Button size="sm" variant="outline" onClick={onRetry}>
        إعادة المحاولة
      </Button>
    ) : null}
  </Card>
);
