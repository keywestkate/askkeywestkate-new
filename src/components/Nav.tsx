import Link from "next/link";

const LINKS = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/build", label: "Build" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About Kate" },
];

type NavProps = {
  theme?: "dark" | "light";
};

export function Nav({ theme = "dark" }: NavProps) {
  const light = theme === "light";
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-8 py-8 md:px-12">
        {/* Left — wordmark */}
        <Link
          href="/"
          className={`flex items-center gap-3 ${light ? "text-paper" : "text-ink-950"}`}
          aria-label="Kate Baldwin — Home"
        >
          <span className="font-display text-lg tracking-tight">
            Kate&nbsp;Baldwin
          </span>
          <span className={`hidden text-[0.62rem] uppercase tracking-[0.28em] md:inline ${light ? "text-paper/60" : "text-ink-500"}`}>
            Bluescape
          </span>
        </Link>

        {/* Center — primary nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[0.78rem] uppercase tracking-[0.22em] transition-colors ${light ? "text-paper/80 hover:text-paper" : "text-ink-800 hover:text-ink-950"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right — contact + menu affordance */}
        <div className="flex items-center justify-end gap-6">
          <Link
            href="/contact"
            className={`hidden text-[0.78rem] uppercase tracking-[0.22em] transition-colors md:inline ${light ? "text-paper/80 hover:text-paper" : "text-ink-800 hover:text-ink-950"}`}
          >
            Contact
          </Link>
          <button
            type="button"
            aria-label="Menu"
            className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] ${light ? "text-paper" : "text-ink-950"}`}
          >
            <span className="block h-[1.5px] w-5 bg-current" />
            <span className="block h-[1.5px] w-5 bg-current" />
          </button>
        </div>
      </div>
    </header>
  );
}
