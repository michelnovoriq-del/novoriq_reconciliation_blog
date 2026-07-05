import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-sky-100 bg-white/95">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky text-sm font-black text-white">N</span>
          <span className="text-xl tracking-tight">Novoriq</span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/blog" className="hidden text-slate-600 transition hover:text-deep sm:inline">Guides</Link>
          <a href={siteConfig.betaUrl} className="rounded-full bg-ink px-4 py-2.5 text-white transition hover:bg-deep">Join private beta</a>
        </nav>
      </div>
    </header>
  );
}
