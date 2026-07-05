import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_.95fr]">
          <div><p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-deep">Built for finance operators</p><h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-ink sm:text-7xl">Messy files in.<br /><span className="text-deep">Clear matches out.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Novoriq is being built as a CSV/Excel-first reconciliation workflow for accountants, bookkeepers, and finance teams.</p><div className="mt-9 flex flex-wrap gap-3"><a href={siteConfig.betaUrl} className="rounded-full bg-deep px-6 py-3.5 font-bold text-white transition hover:bg-ink">Join private beta</a><Link href="/blog/reconcile-payment-exports-with-bank-deposits" className="rounded-full border border-slate-300 bg-white px-6 py-3.5 font-bold text-ink transition hover:border-deep">Read the reconciliation guide</Link></div></div>
          <div className="rounded-3xl border border-white bg-white p-5 shadow-soft"><div className="rounded-2xl bg-ink p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Reconciliation review</p><p className="mt-1 text-xl font-bold">June payout files</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">124 records</span></div><div className="mt-8 grid grid-cols-3 gap-3"><div className="rounded-xl bg-green-500/15 p-4"><span className="text-2xl font-black text-green-400">92</span><p className="mt-1 text-xs text-slate-300">Matched</p></div><div className="rounded-xl bg-amber-500/15 p-4"><span className="text-2xl font-black text-amber-400">21</span><p className="mt-1 text-xs text-slate-300">Review</p></div><div className="rounded-xl bg-red-500/15 p-4"><span className="text-2xl font-black text-red-400">11</span><p className="mt-1 text-xs text-slate-300">Unmatched</p></div></div><div className="mt-4 space-y-2">{["STRIPE-8401 · $128.00", "PAYPAL-1932 · $74.50", "SHOPIFY-604 · $312.10"].map((item, i) => <div key={item} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"><span>{item}</span><span className={i === 0 ? "text-green-400" : i === 1 ? "text-amber-400" : "text-red-400"}>●</span></div>)}</div></div></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="grid gap-8 md:grid-cols-3">{[["01", "Map messy columns", "Standardize dates, amounts, references, and customer fields across exports."], ["02", "Review clear buckets", "Separate high-confidence matches, possible matches, and unsafe exceptions."], ["03", "Export the audit trail", "Produce a clean reconciliation file and a focused exception report."]].map(([n, title, text]) => <article key={n} className="border-t-2 border-sky pt-5"><span className="text-sm font-black text-deep">{n}</span><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></section>
      <CTASection />
    </>
  );
}
