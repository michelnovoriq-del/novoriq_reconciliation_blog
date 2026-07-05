import { article } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category: string;
  readingTime: string;
  publishedAt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "reconcile-payment-exports-with-bank-deposits",
    title: article.title,
    description: article.description,
    href: article.slug,
    category: "Payment reconciliation",
    readingTime: article.readTime,
    publishedAt: article.publishedAt,
  },
  {
    slug: "why-stripe-paypal-shopify-payouts-do-not-match-bank-deposits",
    title: "Why Stripe, PayPal, and Shopify Payouts Do Not Match Bank Deposits",
    description:
      "Payment processor payouts rarely match bank deposits line by line. Fees, refunds, chargebacks, settlement timing, grouped transactions, currency differences, and missing references can all create reconciliation gaps.",
    href: "/blog/why-stripe-paypal-shopify-payouts-do-not-match-bank-deposits",
    category: "Processor payouts",
    readingTime: "9 min read",
    publishedAt: "2026-06-22",
  },
  {
    slug: "csv-reconciliation-workflow-for-bookkeepers",
    title: "CSV Reconciliation Workflow for Bookkeepers",
    description:
      "A practical CSV reconciliation workflow for bookkeepers handling payment exports, invoice files, refunds, fees, and bank statement data.",
    href: "/blog/csv-reconciliation-workflow-for-bookkeepers",
    category: "Bookkeeping workflow",
    readingTime: "10 min read",
    publishedAt: "2026-06-22",
  },
  {
    slug: "how-to-reconcile-invoices-with-bank-payments",
    title: "How to Reconcile Invoices With Bank Payments",
    description:
      "Learn how to reconcile invoice exports with bank payment records, identify unmatched payments, and prepare a clean exception report.",
    href: "/blog/how-to-reconcile-invoices-with-bank-payments",
    category: "Invoice reconciliation",
    readingTime: "9 min read",
    publishedAt: "2026-06-22",
  },
  {
    slug: "reconciliation-exception-report-template",
    title: "Reconciliation Exception Report Template for Accountants",
    description:
      "Use this reconciliation exception report structure to track matched records, possible matches, unmatched payments, amount differences, and review decisions.",
    href: "/blog/reconciliation-exception-report-template",
    category: "Exception reporting",
    readingTime: "8 min read",
    publishedAt: "2026-06-22",
  },
];

export function getBlogPost(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);
  return post;
}
