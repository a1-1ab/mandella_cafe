const StatusBar = () => (
  <div className="flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[12px] font-bold text-ink">
    <span className="tabular-nums tracking-wide">9:41</span>
    <div className="flex items-center gap-1.5 text-ink/80">
      <svg viewBox="0 0 18 12" className="h-3 w-[18px]" fill="currentColor">
        <rect x="0" y="7" width="3" height="5" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-3 w-4" fill="currentColor">
        <path d="M8 10.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
        <path d="M8 5.4c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7 7 0 0 0 8 3.6a7 7 0 0 0-4.8 2l1.1 1.2A5.3 5.3 0 0 1 8 5.4Z" opacity=".85" />
        <path d="M8 1.2c2.3 0 4.4.9 6 2.4l1.1-1.2A10.5 10.5 0 0 0 8-1 10.5 10.5 0 0 0 .9 2.4L2 3.6A8.6 8.6 0 0 1 8 1.2Z" opacity=".5" transform="translate(0 1.5)" />
      </svg>
      <svg viewBox="0 0 26 12" className="h-3 w-[26px]" fill="none">
        <rect x="0.6" y="0.6" width="21" height="10.8" rx="3" stroke="currentColor" strokeOpacity=".45" />
        <rect x="2.4" y="2.4" width="16" height="7.2" rx="1.8" fill="currentColor" />
        <path d="M23.2 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity=".5" />
      </svg>
    </div>
  </div>
);

export default StatusBar;
