import { SupportingArticle, type SupportingArticleContent } from "@/components/SupportingArticle";
import { getBlogPost } from "@/lib/blog-posts";
import { createBlogMetadata } from "@/lib/blog-metadata";

const post = getBlogPost("csv-reconciliation-workflow-for-bookkeepers");
export const metadata = createBlogMetadata(post);

const content: SupportingArticleContent = {
  post,
  label: "Bookkeeping workflow",
  introduction: "A reliable CSV reconciliation starts before the first lookup formula. Bookkeepers need to preserve source files, define the period and expected control totals, standardize fields, and document how each match was made. That process turns a collection of exports into reviewable accounting evidence.",
  sections: [
    {
      id: "source-control",
      eyebrow: "Before matching",
      title: "Build a source-file register",
      intro: "List every expected file and confirm its scope before cleaning rows. A missing payout export can look like dozens of unmatched bank entries later.",
      items: [
        { title: "File identity", text: "Record source system, filename, export time, owner, and untouched original location." },
        { title: "Reporting scope", text: "Record start date, end date, time zone, entity, account, and currency." },
        { title: "Record count", text: "Capture original row counts and provider totals before removing headings or blanks." },
        { title: "Purpose", text: "Label each file as invoices, transactions, payouts, fees, refunds, or bank activity." },
      ],
    },
    {
      id: "mapping",
      title: "Map fields before changing values",
      intro: "Different exports use different names for the same concept, and sometimes the same name for different concepts. Create an explicit mapping table.",
      paragraphs: ["Map source columns into a small shared model: source ID, reference, transaction date, settlement date, gross amount, fee, net amount, currency, customer, and status. Preserve the source row number so any normalized record can be traced back.", "Normalize dates into an unambiguous ISO format, keep monetary values numeric, and use a separate currency field. Define whether refunds and fees are represented as negative values rather than correcting signs ad hoc during matching."],
    },
    {
      id: "matching-review",
      title: "Match in passes and review exceptions separately",
      intro: "Begin with the strongest evidence and progressively widen only documented tolerances. This prevents a weak candidate from consuming a record that has a better match.",
      items: [
        { title: "Pass 1: exact", text: "Exact reference, amount, and currency within an accepted date window." },
        { title: "Pass 2: grouped", text: "A known payout or remittance groups several source records into one bank line." },
        { title: "Pass 3: review", text: "Reference or amount is close, but a fee, partial payment, or date gap needs evidence.", tone: "amber" },
        { title: "Unmatched", text: "No safe candidate exists, so the record stays open with a reason and owner.", tone: "red" },
      ],
    },
    {
      id: "quality-controls",
      title: "Close with control totals, not just a clean-looking sheet",
      intro: "A completed workbook should prove completeness as well as matching accuracy.",
      paragraphs: ["Recalculate source counts and totals after normalization. Confirm that every input row is matched, excluded with a documented reason, or present in the exception report. Check that a source record cannot be approved against more than one target record.", "Export matched records, open exceptions, and a summary showing beginning balance, additions, deductions, ending balance, and unresolved difference where applicable."],
    },
  ],
  workflow: [
    { title: "Collect and register files", text: "Preserve originals and document scope, currency, dates, row counts, and expected totals." },
    { title: "Preview columns", text: "Inspect headings and sample rows before deciding what each column means." },
    { title: "Map and normalize", text: "Create consistent date, amount, reference, customer, status, and currency fields." },
    { title: "Run ordered matching rules", text: "Apply exact, grouped, and tolerance-based rules in a defined sequence." },
    { title: "Review green, yellow, and red records", text: "Approve high-confidence matches and keep uncertain or unsafe records visible." },
    { title: "Export clean reports", text: "Deliver approved matches, control totals, and an exception report with decisions and evidence." },
  ],
  example: {
    title: "Normalizing two exports before matching",
    setup: "An invoice CSV uses DD/MM/YYYY and an amount column containing currency symbols. The bank CSV uses YYYY-MM-DD and separate debit and credit columns.",
    rows: [
      { label: "Invoice source", value: "01/06/2026, INV-204, $240.00" },
      { label: "Bank source", value: "2026-06-03, CREDIT 240.00, REF INV204" },
      { label: "Normalized date", value: "2026-06-01 and 2026-06-03" },
      { label: "Normalized amount", value: "240.00 USD for both records" },
      { label: "Normalized reference", value: "INV204 for both records" },
    ],
    result: "Green match because reference, amount, and currency agree and the two-day delay is within the documented payment window.",
  },
  faqs: [
    ["What columns are needed for CSV reconciliation?", "At minimum, keep a source ID or row number, date, amount, currency, and reference. Customer, status, fee, gross amount, net amount, and settlement date improve matching and explanation."],
    ["Should original CSV files be edited?", "No. Preserve the original export and normalize a working copy. This protects the audit trail and makes the process reproducible."],
    ["How should dates be normalized?", "Parse dates using the known source format and store them in an unambiguous format such as YYYY-MM-DD. Retain transaction and settlement dates separately."],
    ["How can duplicate CSV rows be detected?", "Check stable source IDs first. Where none exist, compare a documented combination such as reference, date, amount, currency, and customer, then review candidates manually."],
    ["What should a bookkeeper export at the end?", "Export approved matches, unresolved exceptions, reviewer decisions, source identifiers, applied rules, and control totals that reconcile back to the input files."],
  ],
};

export default function CsvWorkflowPage() { return <SupportingArticle content={content} />; }
