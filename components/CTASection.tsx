import { siteConfig } from "@/lib/site";

type CTASectionProps = { compact?: boolean };

export function CTASection({ compact = false }: CTASectionProps) {
  return (
    <section className={compact ? "rounded-3xl bg-ink p-8 text-white sm:p-10" : "bg-sky text-white"}>
      <div className={compact ? "" : "mx-auto max-w-5xl px-5 py-20 text-center sm:px-8"}>
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-200">Private beta</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Testing messy CSV reconciliation?</h2>
        <p className={`mt-4 max-w-2xl text-lg leading-8 ${compact ? "text-slate-300" : "mx-auto text-sky-50"}`}>
          Novoriq is in private beta for accountants, bookkeepers, and finance teams that handle messy payment exports, invoices, refunds, fees, and bank deposits.
        </p>
        <a href={siteConfig.betaUrl} className="mt-8 inline-flex rounded-full bg-white px-6 py-3.5 font-bold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-cream">
          Join private beta <span aria-hidden="true" className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
