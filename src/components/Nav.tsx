import Link from "next/link";

const PUBLIC_LINKS = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/build", label: "Build" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About Kate" },
];

const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/favorites", label: "Favorites" },
];

type NavProps =
  | { theme?: "dark" | "light"; userEmail?: never; signout?: never }
  | { theme: "dashboard"; userEmail?: string; signout: () => Promise<void> };

export function Nav({ theme = "dark", userEmail: _userEmail, signout }: NavProps) {
  const light = theme === "light";
  const dashboard = theme === "dashboard";
  const textColor = light ? "text-paper" : "text-ink-950";
  const linkColor = light
    ? "text-paper/80 hover:text-paper"
    : "text-ink-800 hover:text-ink-950";
  const subColor = light ? "text-paper/60" : "text-ink-500";

  const links = dashboard ? DASHBOARD_LINKS : PUBLIC_LINKS;

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-8 py-8 md:px-12">

        {/* Left — wordmark */}
        <Link
          href={dashboard ? "/dashboard" : "/"}
          className={`flex items-center gap-3 ${textColor}`}
          aria-label="Kate Baldwin — Home"
        >
          <span className="font-display text-lg tracking-tight">
            Kate&nbsp;Baldwin
          </span>
          <span className={`hidden text-[0.62rem] uppercase tracking-[0.28em] md:inline ${subColor}`}>
            {dashboard ? "Portal" : "Bluescape"}
          </span>
        </Link>

        {/* Center — nav links */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[0.78rem] uppercase tracking-[0.22em] transition-colors ${linkColor}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right — contact / sign-out + hamburger */}
        <div className="flex items-center justify-end gap-6">
          {dashboard ? (
            <form action={signout}>
              <button
                type="submit"
                className="hidden text-[0.78rem] uppercase tracking-[0.22em] text-ink-800 transition-colors hover:text-ink-950 md:inline"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/contact"
              className={`hidden text-[0.78rem] uppercase tracking-[0.22em] transition-colors md:inline ${linkColor}`}
            >
              Contact
            </Link>
          )}
          <button
            type="button"
            aria-label="Menu"
            className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] ${textColor}`}
          >
            <span className="block h-[1.5px] w-5 bg-current" />
            <span className="block h-[1.5px] w-5 bg-current" />
          </button>
        </div>

      </div>
    </header>
  );
}
