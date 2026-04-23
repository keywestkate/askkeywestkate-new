"use client";

interface StepProgressProps {
  current: number;
  total: number;
}

export function StepProgress({ current, total }: StepProgressProps) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="eyebrow text-ink-400">
      {pad(current)}&nbsp;/&nbsp;{pad(total)}
    </div>
  );
}
