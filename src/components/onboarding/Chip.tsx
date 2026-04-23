"use client";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function Chip({ label, selected, onClick, disabled }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "rounded-full border px-5 py-2.5 text-sm tracking-[0.06em] transition-colors duration-150 focus:outline-none",
        selected
          ? "border-ink-950 bg-ink-950 text-paper"
          : "border-ink-200 bg-paper text-ink-800 hover:border-ink-500",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
