import { SupportingArticle, type SupportingArticleContent } from "@/components/SupportingArticle";
import { getBlogPost } from "@/lib/blog-posts";
import { createBlogMetadata } from "@/lib/blog-metadata";

const post = getBlogPost("reconciliation-exception-report-template");
export const metadata = createBlogMetadata(post);

const content: SupportingArticleContent = {
  post,
  label: "Exception report template",
  introduction: "A reconciliation exception report is the working queue for records that did not produce a straightforward approved match. A useful report does more than list differences: it preserves the evidence, explains the risk, assigns ownership, and records the final decision.",
  sections: [
    {
      id: "template-columns",
      eyebrow: "Recommended structure",
      title: "Columns to include in an exception report",
      intro: "Use stable identifiers and separate facts from review decisions. Someone unfamiliar with the original workbook should be able to understand the issue.",
      items: [
        { title: "Source identity", text: "Exception ID, source system, filename, row number, transaction ID, and original reference." },
        { title: "Financial details", text: "Entity, account, currency, source amount, candidate amount, and difference." },
        { title: "Timing", text: "Transaction date, settlement date, bank date, age, and reporting period." },
        { title: "Classification", text: "Unmatched, possible match, duplicate, partial, fee difference, missing record, or timing item." },
        { title: "Review evidence", text: "Candidate record, rule result, confidence bucket, notes, and supporting-document link." },
        { title: "Resolution", text: "Owner, status, next action, due date, decision, reviewer, and decision timestamp." },
      ],
    },
    {
      id: "review-buckets",
      title: "Use green, yellow, and red without hiding judgment",
      intro: "Color should summarize a documented status, not replace the reason behind it.",
      items: [
        { title: "Green: approved match", text: "Evidence satisfies the rule and a human has approved the result." },
        { title: "Yellow: review required", text: "A plausible candidate exists, but a fee, timing gap, partial amount, or missing reference needs review.", tone: "amber" },
        { title: "Red: unmatched or unsafe", text: "No defensible candidate exists, evidence conflicts, or duplicate use would occur.", tone: "red" },
        { title: "Resolved", text: "Keep the original exception reason and add the final decision rather than deleting the row." },
      ],
    },
    {
      id: "review-process",
      title: "Turn the report into a controlled review process",
      intro: "Prioritize exceptions by financial impact, age, and reporting risk rather than reviewing them in arbitrary row order.",
      paragraphs: ["Assign one owner and a target date to each open item. Use standardized resolution codes such as approved match, valid timing difference, fee confirmed, duplicate removed, refund pending, write-off approved, or escalated.", "Protect decision fields from accidental formula changes. Retain reviewer identity and timestamp. At close, reconcile the total exception population to the unmatched and possible-match buckets from the underlying process."],
    },
    {
      id: "report-controls",
      title: "Add summary controls for completeness",
      intro: "A report needs control totals so reviewers know whether rows were lost, duplicated, or silently excluded.",
      paragraphs: ["Summarize exception count and value by status, type, currency, owner, and aging band. Show opening exceptions, new items, resolved items, and closing exceptions. Confirm closing totals agree with the detailed rows.", "Keep approved matches outside the active exception queue but available in a related reconciliation output. This makes the report actionable without removing the audit trail."],
    },
  ],
  workflow: [
    { title: "Upload and normalize source files", text: "Preserve source identifiers while mapping comparable dates, amounts, currencies, and references." },
    { title: "Run deterministic rules", text: "Generate match candidates and explicit reasons in a defined order." },
    { title: "Create review buckets", text: "Separate approved candidates, possible matches, and unsafe or unmatched records." },
    { title: "Enrich each exception", text: "Add type, difference, candidate evidence, priority, owner, and next action." },
    { title: "Record human decisions", text: "Approve, reject, or resolve with reviewer, timestamp, notes, and resolution code." },
    { title: "Export detail and summary", text: "Deliver the exception rows plus control totals by status, type, age, and value." },
  ],
  example: {
    title: "A possible match with a processor fee",
    setup: "An invoice and bank deposit share a reference, but the amounts differ by $3.00.",
    rows: [
      { label: "Exception ID", value: "EXC-2026-0042" },
      { label: "Invoice", value: "INV-003 · $75.50" },
      { label: "Bank candidate", value: "INV-003 · $72.50" },
      { label: "Difference", value: "$3.00" },
      { label: "Bucket", value: "Yellow · possible fee difference" },
      { label: "Next action", value: "Obtain processor fee row and review by June 25" },
    ],
    result: "Keep the item yellow until the $3.00 fee appears in source evidence. Once confirmed, approve the match and retain the fee record and reviewer decision.",
  },
  faqs: [
    ["What is a reconciliation exception report?", "It is a controlled list of unmatched, uncertain, duplicated, partial, or otherwise unresolved records produced during reconciliation, together with evidence, ownership, and resolution status."],
    ["What columns should an exception report contain?", "Include source identifiers, dates, amounts, currencies, references, exception type, candidate evidence, difference, status, priority, owner, next action, reviewer, and decision timestamp."],
    ["Should matched records appear in the exception report?", "Approved matches usually belong in the reconciliation output rather than the active exception queue. Summary counts can include them, and their audit trail should remain available."],
    ["How should exceptions be prioritized?", "Use financial value, age, close impact, customer or supplier impact, fraud risk, and the effort needed to obtain evidence."],
    ["When can a yellow item become green?", "Only when the missing evidence is obtained, the documented rule is satisfied, and an authorized reviewer approves the match."],
    ["Should resolved exceptions be deleted?", "No. Retain the original issue, evidence, resolution code, reviewer, and timestamp so the decision can be audited later."],
  ],
};

export default function ExceptionReportPage() { return <SupportingArticle content={content} />; }
