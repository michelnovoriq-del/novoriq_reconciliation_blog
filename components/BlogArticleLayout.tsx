import Link from "next/link";
import { article } from "@/lib/site";

const defaultSections = [
  ["why-files-differ", "Why files do not match"], ["files", "Common files"], ["manual-workflow", "Manual workflow"],
  ["mistakes", "Where mistakes happen"], ["better-workflow", "A better workflow"], ["review-buckets", "Review buckets"],
  ["deterministic", "Deterministic matching"], ["example", "Worked example"], ["faq", "FAQ"],
];

type BlogArticleLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  publishedAt?: string;
  readTime?: string;
  sections?: string[][];
  label?: string;
  workflowId?: string;
};

export function BlogArticleLayout({
  children,
  title = article.title,
  description = "A repeatable way to turn processor exports, invoices, fees, refunds, and net bank deposits into a clean, reviewable reconciliation report.",
  publishedAt = article.publishedAt,
  readTime = article.readTime,
  sections = defaultSections,
  label = "Practical reconciliation guide",
  workflowId = "manual-workflow",
}: BlogArticleLayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-sky text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm font-semibold text-sky-100">
            <Link href="/">Home</Link><span>/</span><Link href="/blog">Guides</Link><span>/</span><span aria-current="page">Reconciliation</span>
          </nav>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-sky-100">{label}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50 sm:text-xl">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:michelnovoriq@gmail.com?subject=Novoriq%20Private%20Beta" className="rounded-full bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-cream">Join private beta</a>
            <a href={`#${workflowId}`} className="rounded-full border border-white/40 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">See the workflow ↓</a>
          </div>
          <p className="mt-8 text-sm text-sky-100"><time dateTime={publishedAt}>June 22, 2026</time> · {readTime}</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center">
        <aside className="hidden lg:block"><nav aria-label="Article sections" className="sticky top-8"><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">In this guide</p><ul className="space-y-3 border-l border-slate-200 pl-4 text-sm font-semibold text-slate-500">{sections.map(([id, label]) => <li key={id}><a href={`#${id}`} className="transition hover:text-deep">{label}</a></li>)}</ul></nav></aside>
        <article className="article min-w-0">{children}</article>
      </div>
    </>
  );
}
