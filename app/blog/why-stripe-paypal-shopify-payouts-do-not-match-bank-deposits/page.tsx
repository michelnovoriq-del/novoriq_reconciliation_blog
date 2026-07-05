import Link from "next/link";
import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { ProblemCard } from "@/components/ProblemCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import { getBlogPost } from "@/lib/blog-posts";
import { createBlogMetadata } from "@/lib/blog-metadata";
import { siteConfig } from "@/lib/site";

const post = getBlogPost("why-stripe-paypal-shopify-payouts-do-not-match-bank-deposits");

export const metadata = createBlogMetadata(post);

const sections = [
  ["introduction", "Introduction"],
  ["core-reason", "Core reason"],
  ["stripe", "Stripe payouts"],
  ["paypal", "PayPal payouts"],
  ["shopify", "Shopify payouts"],
  ["bank-deposits", "Bank deposits"],
  ["mistakes", "Common mistakes"],
  ["workflow", "Better workflow"],
  ["novoriq", "Where Novoriq fits"],
  ["conclusion", "Conclusion"],
  ["related", "Related guides"],
];

const mismatchReasons = [
  "The bank statement usually shows only the final deposit.",
  "The processor export may show many underlying transactions.",
  "The accounting export may use different column names and references.",
  "Dates may use different formats, time zones, or settlement bases.",
  "Amounts may differ because fees, refunds, disputes, reserves, or currency conversion were applied before cash reached the bank.",
];

const mistakes = [
  "Trying to match gross sales directly to bank deposits.",
  "Ignoring processor fees, refunds, reserves, and chargebacks.",
  "Matching only by date without checking amount, reference, or payout group.",
  "Trusting weak reference matches when order IDs, transaction IDs, and payout IDs do not align.",
  "Blending unmatched records into approved matches instead of separating exceptions.",
  "Skipping manual review for possible matches.",
  "Failing to keep an audit trail of source rows, rules, notes, and reviewer decisions.",
];

const workflow = [
  ["Export the payment processor report", "Start with Stripe, PayPal, Shopify, or another processor export that includes transaction IDs, payout IDs where available, gross amounts, fees, refunds, disputes, currency, and settlement dates."],
  ["Export the bank statement", "Use the same reporting period where possible, but expect posting dates to differ from processor payout dates by a few business days."],
  ["Normalize columns", "Map inconsistent headings into a common structure for date, amount, currency, reference, source, transaction type, and payout identifier."],
  ["Separate gross, fees, refunds, and net deposits", "Do not collapse everything into one amount too early. Keep each component visible so a reviewer can explain the final net payout."],
  ["Match by amount, date, and reference", "Use exact matches where the evidence is strong, then apply documented tolerances for settlement windows, fees, and references."],
  ["Flag exceptions", "Separate missing payouts, unexplained bank deposits, duplicate rows, partial refunds, disputed amounts, and currency differences."],
  ["Review possible matches", "Let a person approve or reject ambiguous candidates and record the reason for the decision."],
  ["Export the reconciliation report", "Deliver approved matches, unmatched records, exception notes, and source identifiers in a format another accountant can review."],
];

const relatedLinks = [
  {
    href: "/blog/reconcile-payment-exports-with-bank-deposits",
    title: "How to Reconcile Payment Exports With Bank Deposits",
  },
  {
    href: "/blog/csv-reconciliation-workflow-for-bookkeepers",
    title: "CSV Reconciliation Workflow for Bookkeepers",
  },
  {
    href: "/blog/how-to-reconcile-invoices-with-bank-payments",
    title: "How to Reconcile Invoices With Bank Payments",
  },
  {
    href: "/blog/reconciliation-exception-report-template",
    title: "Reconciliation Exception Report Template for Accountants",
  },
];

export default function ProcessorPayoutMismatchPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Novoriq" },
    publisher: { "@type": "Organization", name: "Novoriq" },
    mainEntityOfPage: `${siteConfig.url}${post.href}`,
    keywords: [
      "why Stripe PayPal Shopify payouts do not match bank deposits",
      "Stripe payout reconciliation",
      "PayPal payout reconciliation",
      "Shopify payout reconciliation",
      "bank deposit reconciliation",
      "payment processor reconciliation",
      "ecommerce bookkeeping reconciliation",
      "payout fees refunds chargebacks",
      "CSV reconciliation for accountants",
    ],
  };

  return (
    <BlogArticleLayout
      title={post.title}
      description={post.description}
      publishedAt={post.publishedAt}
      readTime={post.readingTime}
      sections={sections}
      label="Payment processor reconciliation guide"
      workflowId="workflow"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />

      <section id="introduction">
        <p className="text-xl leading-9 text-slate-700">
          Ecommerce payment reconciliation is difficult because payment processors do not usually deposit the exact gross transaction amount into the bank. A customer may pay $100, but the bank may receive a smaller amount days later after the processor has deducted fees, grouped the sale with other orders, offset a refund, or applied a chargeback adjustment.
        </p>
        <p className="mt-5 text-slate-600">
          That difference is normal, but it still has to be explained. Accountants, bookkeepers, ecommerce operators, and finance teams need a repeatable way to connect processor activity to bank cash without forcing weak matches. Stripe payout reconciliation, PayPal payout reconciliation, and Shopify payout reconciliation all depend on the same basic discipline: preserve the source records, rebuild the net payout, match that net payout to the bank deposit, and keep unresolved items visible.
        </p>
        <div className="mt-7 rounded-2xl border-l-4 border-sky bg-cream p-6">
          <p className="font-semibold text-ink">
            The bank deposit is usually the end of the settlement story, not the full story. Reconciliation rebuilds the steps between gross sales and net cash.
          </p>
        </div>
      </section>

      <section id="core-reason">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">Gross sales versus net cash</p>
        <h2 className="mt-3">The core reason payouts do not match</h2>
        <p className="lead">
          The most common mismatch starts with comparing the wrong amounts. Gross sales, fees, refunds, chargebacks, net payout, and bank deposit are related, but they are not the same field.
        </p>
        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          {[
            ["Gross sales", "$1,000", "Customer payments before deductions."],
            ["Processor fees", "-$35", "Fees deducted before settlement."],
            ["Refunds", "-$120", "Customer refunds offset against available balance."],
            ["Net payout", "$845", "The settlement amount after deductions."],
            ["Bank deposit", "$845", "The amount posted to the bank statement."],
          ].map(([label, value, note]) => (
            <div key={label} className="grid gap-2 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[150px_110px_1fr]">
              <p className="font-bold text-ink">{label}</p>
              <p className="font-bold text-deep">{value}</p>
              <p className="text-slate-600">{note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-slate-600">
          In this example, the accounting sales report may show $1,000 of activity, but the bank statement shows only the $845 net payout. Nothing is necessarily missing. The processor settled a net amount after deducting fees and refunds. Bank deposit reconciliation becomes unreliable when the team tries to match the $1,000 gross total directly to the $845 bank line.
        </p>
      </section>

      <section id="stripe">
        <h2>Why Stripe payouts may not match bank deposits</h2>
        <p className="lead">
          Stripe groups eligible transactions into payouts. A payout can contain many payments, fees, refunds, disputes, and balance adjustments, while the bank may show one deposit line.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <ProblemCard title="Grouped transactions">Multiple card payments can settle together under one payout rather than one deposit per order.</ProblemCard>
          <ProblemCard title="Fees deducted first" tone="amber">Stripe fees reduce the amount sent to the bank, so gross revenue and cash received differ.</ProblemCard>
          <ProblemCard title="Refunds reduce future payouts" tone="amber">A refund may be deducted from a later payout, not from the payout that contained the original sale.</ProblemCard>
          <ProblemCard title="Chargebacks create deductions" tone="red">Disputed amounts and dispute fees can reduce the available balance before settlement.</ProblemCard>
          <ProblemCard title="Timing differs">Transaction date, availability date, payout date, and bank posting date may fall in different periods.</ProblemCard>
          <ProblemCard title="References vary">A bank description may not include the invoice, order, charge, or payout reference the finance team expects.</ProblemCard>
        </div>
        <p className="mt-6 text-slate-600">
          Currency conversion can add another layer. If a customer pays in one currency and settlement occurs in another, the final bank amount may reflect conversion rates and FX fees. Strong Stripe payout reconciliation therefore starts with the payout or balance report, not the bank statement alone.
        </p>
      </section>

      <section id="paypal">
        <h2>Why PayPal payouts may not match bank deposits</h2>
        <p className="lead">
          PayPal activity can include sales, fees, refunds, disputes, holds, reserves, currency conversion, transfers, and manual withdrawals. Those rows may not map neatly to one bank deposit.
        </p>
        <p className="mt-5 text-slate-600">
          A PayPal balance can accumulate transactions before funds are withdrawn to the bank. If someone makes a manual withdrawal, the bank deposit may represent the balance selected for transfer rather than a clean settlement batch for one sales day. Holds and reserves can also delay when cash becomes available. Disputes and refunds can reduce the balance after the original transaction date, making date-only matching especially fragile.
        </p>
        <div className="mt-7 rounded-2xl bg-cream p-6">
          <h3 className="text-xl font-bold text-ink">For PayPal payout reconciliation, separate transaction type before matching.</h3>
          <p className="mt-3 text-slate-600">
            Fees, refunds, disputes, currency conversion, transfers, and withdrawals should be classified before the bank comparison. Otherwise a normal balance movement can look like an unexplained shortage.
          </p>
        </div>
      </section>

      <section id="shopify">
        <h2>Why Shopify payouts may not match bank deposits</h2>
        <p className="lead">
          Shopify Payments can settle many orders into a payout. The payout may include fees, refunds, chargebacks, app or store adjustments, taxes, shipping, discounts, and orders from different dates.
        </p>
        <p className="mt-5 text-slate-600">
          The order date is not always the payout date. A store may recognize an order on Monday, see it included in a Shopify payout later in the week, and see the bank post the deposit after that. Sales tax, shipping, discounts, and adjustments can also make order totals differ from the amount that ultimately settles.
        </p>
        <p className="mt-5 text-slate-600">
          Shopify payout reconciliation should therefore group orders by payout, compare the net payout total to the bank deposit, and keep the supporting order-level rows available for review. Matching each Shopify order directly against a bank line will usually create unnecessary exceptions.
        </p>
      </section>

      <section id="bank-deposits">
        <h2>Why bank deposits are harder to reconcile</h2>
        <p className="lead">
          Bank statements are optimized for cash movement, not for ecommerce bookkeeping reconciliation. They usually provide less detail than the processor export.
        </p>
        <ul className="mt-7 grid gap-3">
          {mismatchReasons.map((reason) => (
            <li key={reason} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
              {reason}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-slate-600">
          This is why payment processor reconciliation works best when the processor file, bank file, and accounting export are normalized into comparable fields. The work is partly mathematical, but it is also documentary: every approved match should be traceable back to the original source rows.
        </p>
      </section>

      <section id="mistakes">
        <h2>Common reconciliation mistakes</h2>
        <p className="lead">
          Most payout reconciliation errors happen when teams try to make a spreadsheet balance before they have separated the evidence.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {mistakes.map((mistake, index) => (
            <ProblemCard key={mistake} title={`Mistake ${index + 1}`} tone={index % 3 === 0 ? "red" : "amber"}>
              {mistake}
            </ProblemCard>
          ))}
        </div>
      </section>

      <section id="workflow" className="rounded-3xl bg-cream p-7 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">CSV reconciliation for accountants</p>
        <h2 className="mt-3">A better workflow for accountants and bookkeepers</h2>
        <p className="lead">
          The cleaner approach is structured reconciliation: collect the files, normalize the records, rebuild the net payout, match with clear rules, and isolate exceptions for review.
        </p>
        <ol className="mt-9">
          {workflow.map(([title, text], index) => (
            <WorkflowStep key={title} number={index + 1} title={title}>
              {text}
            </WorkflowStep>
          ))}
        </ol>
      </section>

      <section id="novoriq">
        <h2>Where Novoriq fits</h2>
        <p className="lead">
          Novoriq is being built to help accountants and finance teams handle this type of messy CSV/Excel reconciliation workflow.
        </p>
        <p className="mt-5 text-slate-600">
          The goal is to upload payment exports and bank statements, map columns, normalize records, identify likely matches, flag exceptions, and export a clean review file. That is intentionally practical: many finance teams still receive CSVs, Excel files, processor exports, and client spreadsheets that need to be made consistent before any reliable matching can happen.
        </p>
        <p className="mt-5 text-slate-600">
          Novoriq is designed to support review rather than hide judgment. Clear matches can be prepared for approval, possible matches can be separated for human review, and unresolved records can remain in an exception report with notes. For payout fees, refunds, chargebacks, timing differences, and missing references, that review trail matters as much as the match itself.
        </p>
        <div className="mt-7 rounded-2xl bg-sky p-7 text-white">
          <h3 className="text-2xl font-black">Building a reconciliation workflow for messy payment exports?</h3>
          <p className="mt-3 leading-7 text-sky-50">
            Novoriq is being built as a CSV/Excel-first reconciliation workflow for accountants and finance teams.
          </p>
          <a
            href="mailto:michelnovoriq@gmail.com?subject=Novoriq%20Private%20Beta"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-cream"
          >
            Join the private beta
          </a>
        </div>
      </section>

      <section id="conclusion">
        <h2>Conclusion</h2>
        <p className="lead">
          Stripe, PayPal, and Shopify payouts do not always match bank deposits because payment processors settle net amounts after fees, refunds, chargebacks, timing differences, batching, currency conversion, and adjustments.
        </p>
        <p className="mt-5 text-slate-600">
          The solution is not blind matching. A good reconciliation workflow starts by separating gross sales from deductions, rebuilding each payout, matching the net amount to the bank deposit, and documenting every exception. That gives accountants, bookkeepers, ecommerce operators, and finance teams a reviewable record instead of a spreadsheet full of unexplained differences.
        </p>
      </section>

      <section id="related">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">Continue the workflow</p>
        <h2 className="mt-3">Related Novoriq reconciliation guides</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {relatedLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl border border-slate-200 p-5 transition hover:border-sky hover:bg-sky-50">
              <h3 className="font-bold leading-snug text-ink">{link.title}</h3>
              <span className="mt-3 inline-block text-sm font-semibold text-deep">Read guide -&gt;</span>
            </Link>
          ))}
        </div>
      </section>
    </BlogArticleLayout>
  );
}
