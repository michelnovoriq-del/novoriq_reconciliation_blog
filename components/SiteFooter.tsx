import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p><strong className="text-ink">Novoriq</strong> — CSV/Excel reconciliation workflows for accountants and finance teams.</p>
        <nav aria-label="Footer navigation" className="flex gap-5 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/blog">Guides</Link>
        </nav>
      </div>
    </footer>
  );
}
