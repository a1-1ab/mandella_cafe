import cn from '../../lib/cn.js';

const PETAL_COLORS = ['#00A7A5', '#E82E73', '#F5D840'];

const Rosette = ({ className }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="شعار مانديلا">
    <g transform="translate(120 120)">
      {Array.from({ length: 16 }).map((_, index) => (
        <ellipse
          key={`outer-${index}`}
          cx="0"
          cy="-62"
          rx="14"
          ry="40"
          fill={PETAL_COLORS[index % PETAL_COLORS.length]}
          opacity="0.92"
          transform={`rotate(${index * 22.5})`}
        />
      ))}
      {Array.from({ length: 12 }).map((_, index) => (
        <ellipse
          key={`inner-${index}`}
          cx="0"
          cy="-36"
          rx="8"
          ry="23"
          fill="#FFFFFF"
          opacity="0.85"
          transform={`rotate(${index * 30 + 15})`}
        />
      ))}
      {Array.from({ length: 8 }).map((_, index) => (
        <circle
          key={`dot-${index}`}
          cx="0"
          cy="-70"
          r="3.4"
          fill="#007B78"
          transform={`rotate(${index * 45 + 11})`}
        />
      ))}
      <circle r="26" fill="#00A7A5" />
      <circle r="17" fill="#F8F5EF" />
      <circle r="9" fill="#E82E73" />
    </g>
  </svg>
);

const Logo = ({ compact = false, className }) => {
  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Rosette className="h-10 w-10" />
        <div className="leading-none">
          <p className="font-logo text-[15px] font-extrabold tracking-[0.18em] text-teal-deep">MaNDeLLa</p>
          <p className="mt-0.5 font-script text-[10px] text-rose">Restaurant &amp; Cafe</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <Rosette className="h-[168px] w-[168px] animate-scale-in" />
      <p className="mt-4 font-script text-[15px] text-rose">Restaurant &amp; Cafe</p>
      <p className="mt-1 font-logo text-[40px] font-extrabold leading-none tracking-[0.16em] text-teal-deep">
        MaNDeLLa
      </p>
      <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold tracking-[0.3em] text-muted">
        <span className="h-px w-8 bg-line" />
        <span>DAMASCUS</span>
        <span className="h-px w-8 bg-line" />
      </div>
    </div>
  );
};

export default Logo;
