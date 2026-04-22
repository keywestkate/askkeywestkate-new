import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-paper">
      <div className="mx-auto max-w-[1600px] px-8 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-5xl leading-[0.95] tracking-tight text-ink-950 md:text-6xl">
              Kate&nbsp;Baldwin
            </div>
            <div className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-ink-500">
              Luxury Real Estate · Bluescape · Key West
            </div>
            <p className="mt-10 max-w-md text-base leading-relaxed text-ink-800">
              Selling a lifestyle in Key West and the Florida Keys — homes on
              the water, built for boating, fishing, and life on a sand bar.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Explore</div>
            <ul className="mt-5 space-y-3 text-sm text-ink-800">
              <li><Link href="/buy" className="hover:text-ink-950">Buy</Link></li>
              <li><Link href="/sell" className="hover:text-ink-950">Sell</Link></li>
              <li><Link href="/build" className="hover:text-ink-950">Build in the Keys</Link></li>
              <li><Link href="/neighborhoods" className="hover:text-ink-950">Neighborhoods</Link></li>
              <li><Link href="/journal" className="hover:text-ink-950">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-ink-800">
              <li>
                <a href="tel:3052407828" className="hover:text-ink-950">
                  305.240.7828
                </a>
              </li>
              <li>
                <a
                  href="mailto:Kate@BluescapeRealEstate.com"
                  className="hover:text-ink-950"
                >
                  Kate@BluescapeRealEstate.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/askkeywestkate"
                  className="hover:text-ink-950"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @askkeywestkate
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink-200 pt-8 text-[0.72rem] uppercase tracking-[0.18em] text-ink-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Kate Baldwin · Bluescape Real Estate
            · FL #SL3428748
          </div>
          <div className="flex items-center gap-6 md:justify-end">
            <span>Equal Housing Opportunity</span>
            <Link href="/login" className="text-ink-400 hover:text-ink-600 transition-colors">
              Client Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
