import { SupportingArticle, type SupportingArticleContent } from "@/components/SupportingArticle";
import { getBlogPost } from "@/lib/blog-posts";
import { createBlogMetadata } from "@/lib/blog-metadata";

const post = getBlogPost("how-to-reconcile-invoices-with-bank-payments");
export const metadata = createBlogMetadata(post);

const content: SupportingArticleContent = {
  post,
  label: "Invoice reconciliation guide",
  introduction: "Invoice-to-payment reconciliation confirms which receivables were paid, which payments need allocation, and which balances remain open. The difficult cases are rarely exact one-to-one matches: customers combine invoices, pay partially, omit references, deduct fees, or pay the same invoice twice.",
  sections: [
    {
      id: "prepare-records",
      eyebrow: "Set up the evidence",
      title: "Prepare invoices and bank payments for comparison",
      intro: "Use open and recently settled invoices for the period, plus all relevant incoming bank credits. Keep credit notes and prior unapplied cash available.",
      items: [
        { title: "Invoice fields", text: "Invoice number, customer, issue date, due date, currency, original total, and open balance." },
        { title: "Payment fields", text: "Bank reference, payer name, posting date, amount, currency, and bank transaction ID." },
        { title: "Allocation fields", text: "Matched invoice, allocated amount, remaining balance, rule, reviewer, and decision date." },
        { title: "Control fields", text: "Source filename and row number preserve traceability to the evidence." },
      ],
    },
    {
      id: "matching-order",
      title: "Use a safe invoice-matching order",
      intro: "Start with unique references and exact amounts. Use customer and timing as supporting evidence, not as a substitute for a missing audit trail.",
      paragraphs: ["First match invoice number, currency, and exact outstanding balance. Next handle remittance advice or a single payment covering several invoices. Then review partial payments and possible matches with missing or altered references.", "Prevent one bank payment from being fully allocated twice. Prevent allocations from exceeding the payment amount or invoice balance unless the overpayment is deliberately recorded as unapplied cash."],
    },
    {
      id: "exceptions",
      title: "Treat partial, duplicate, and unmatched payments explicitly",
      intro: "These records should not disappear into spreadsheet notes. Give each condition a consistent status and next action.",
      items: [
        { title: "Partial payment", text: "Allocate the received amount and keep the residual invoice balance open.", tone: "amber" },
        { title: "Combined payment", text: "Use remittance evidence to allocate one bank line across multiple invoices." },
        { title: "Duplicate payment", text: "Do not apply twice. Record unapplied cash and contact the responsible owner.", tone: "red" },
        { title: "Missing reference", text: "Use payer, amount, and timing to propose candidates, then require human approval.", tone: "amber" },
        { title: "Unmatched receipt", text: "Keep the cash visible as unidentified or unapplied until supported." },
        { title: "Unpaid invoice", text: "Retain the open receivable and route it to the collection workflow." },
      ],
    },
    {
      id: "exception-report",
      title: "Finish with an allocation and exception report",
      intro: "The final output should explain both what matched and what remains unresolved.",
      paragraphs: ["For approved allocations, show invoice number, bank transaction ID, allocated amount, payment date, match rule, and reviewer. For exceptions, show the reason, amount, aging, proposed candidate, evidence needed, owner, and status.", "Reconcile total incoming cash to allocated cash plus unapplied cash. Reconcile opening receivables plus invoices and adjustments less allocated payments to the closing receivables balance."],
    },
  ],
  workflow: [
    { title: "Upload invoice and bank exports", text: "Include open balances, recent settlements, credit notes, and all incoming payments for the period." },
    { title: "Map references and balances", text: "Separate original invoice total from current open balance and preserve bank transaction IDs." },
    { title: "Normalize payer and payment data", text: "Standardize dates, amounts, currencies, invoice references, and customer names without overwriting source values." },
    { title: "Match and allocate", text: "Apply exact rules first, then grouped and partial allocations with explicit constraints." },
    { title: "Review exceptions", text: "Humans approve missing-reference candidates, partial payments, duplicates, and unapplied cash." },
    { title: "Export reports", text: "Produce approved allocations, remaining receivables, unapplied cash, and actionable exceptions." },
  ],
  example: {
    title: "One payment settles two invoices",
    setup: "A customer sends one $650 bank payment with the reference ACME MAY rather than listing either invoice number.",
    rows: [
      { label: "INV-410", value: "$400.00 open balance" },
      { label: "INV-418", value: "$250.00 open balance" },
      { label: "Bank payment", value: "$650.00 from ACME LTD" },
      { label: "Remittance", value: "Email confirms INV-410 and INV-418" },
      { label: "Allocation", value: "$400.00 + $250.00 = $650.00" },
    ],
    result: "Approve the grouped allocation because the customer, total, and remittance evidence agree. Link both invoice rows to the single bank transaction ID.",
  },
  faqs: [
    ["How do you match an invoice to a bank payment?", "Compare invoice reference, currency, outstanding amount, payer, and timing. Exact reference and amount matches are strongest; missing-reference candidates should be reviewed before allocation."],
    ["How should partial invoice payments be recorded?", "Allocate only the amount received, reduce the invoice's open balance by that amount, and keep the remaining balance outstanding."],
    ["What if one payment covers several invoices?", "Use remittance advice or other customer evidence to allocate the bank payment across invoices. Confirm the allocations sum exactly to the payment."],
    ["What happens to a payment with no matching invoice?", "Record it as unapplied or unidentified cash according to the accounting policy and keep it in the exception report until ownership is established."],
    ["How do you handle a duplicate customer payment?", "Do not allocate it to an already settled invoice. Confirm the duplicate, record the resulting customer credit or refund obligation, and document the resolution."],
  ],
};

export default function InvoiceReconciliationPage() { return <SupportingArticle content={content} />; }
