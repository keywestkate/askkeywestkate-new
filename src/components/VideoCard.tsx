type VideoCardProps = {
  label: string;
  caption: string;
  className?: string;
};

// Floating card used as an inviting video affordance.
// Renders a circular play button + thumbnail slot. Drop a poster image at
// public/images/<path> and pass via CSS background later; for now it uses
// the hero-placeholder texture so the aesthetic is visible without assets.
export function VideoCard({ label, caption, className = "" }: VideoCardProps) {
  return (
    <button
      type="button"
      className={`group flex w-[280px] items-center gap-4 border border-ink-200 bg-paper/90 p-3 text-left backdrop-blur transition hover:bg-paper ${className}`}
      aria-label={`Play video: ${label}`}
    >
      <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full hero-placeholder">
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink-950 transition group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 translate-x-[1px]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-ink-950">{label}</span>
        <span className="text-[0.72rem] uppercase tracking-[0.2em] text-ink-500">
          {caption}
        </span>
      </span>
    </button>
  );
}
