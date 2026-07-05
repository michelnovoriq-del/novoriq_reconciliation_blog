import Link from "next/link";
import { BlogArticleLayout } from "@/components/BlogArticleLayout";
import { CTASection } from "@/components/CTASection";
import { ProblemCard } from "@/components/ProblemCard";
import { WorkflowStep } from "@/components/WorkflowStep";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

export type ArticleSection = {
  id: string;
  eyebrow?: string;
  title: string;
  intro: string;
  paragraphs?: string[];
  items?: { title: string; text: string; tone?: "red" | "amber" | "blue" }[];
};

export type SupportingArticleContent = {
  post: BlogPost;
  label: string;
  introduction: string;
  sections: ArticleSection[];
  workflow: { title: string; text: string }[];
  example: { title: string; setup: string; rows: { label: string; value: string }[]; result: string };
  faqs: [string, string][];
};

export function SupportingArticle({ content }: { content: SupportingArticleContent }) {
  const { post, sections, workflow, example, faqs } = content;
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
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  const toc = [
    ...sections.map((section) => [section.id, section.title]),
    ["workflow", "Novoriq workflow"],
    ["example", "Example scenario"],
    ["related", "Related guides"],
    ["faq", "FAQ"],
  ];
  const related = blogPosts.filter((item) => item.href !== post.href);

  return (
    <BlogArticleLayout
      title={post.title}
      description={post.description}
      publishedAt={post.publishedAt}
      readTime={post.readingTime}
      sections={toc}
      label={content.label}
      workflowId="workflow"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />

      <section>
        <p className="text-xl leading-9 text-slate-700">{content.introduction}</p>
        <div className="mt-7 rounded-2xl border-l-4 border-sky bg-cream p-6">
          <p className="font-semibold text-ink">Use source records and explicit rules. Never force a match simply to make totals balance.</p>
        </div>
      </section>

      {sections.map((section) => (
        <section id={section.id} key={section.id}>
          {section.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">{section.eyebrow}</p>}
          <h2 className={section.eyebrow ? "mt-3" : ""}>{section.title}</h2>
          <p className="lead">{section.intro}</p>
          {section.paragraphs?.map((paragraph) => <p className="mt-5 text-slate-600" key={paragraph}>{paragraph}</p>)}
          {section.items && <div className="mt-7 grid gap-4 sm:grid-cols-2">{section.items.map((item) => <ProblemCard key={item.title} title={item.title} tone={item.tone}>{item.text}</ProblemCard>)}</div>}
        </section>
      ))}

      <section id="workflow" className="rounded-3xl bg-cream p-7 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">CSV/Excel first</p>
        <h2 className="mt-3">How the Novoriq-style workflow handles it</h2>
        <p className="lead">Novoriq is being built as a CSV/Excel-first reconciliation workflow. The process keeps source rows, matching rules, and human decisions visible.</p>
        <ol className="mt-8">{workflow.map((step, index) => <WorkflowStep key={step.title} number={index + 1} title={step.title}>{step.text}</WorkflowStep>)}</ol>
        <blockquote className="mt-8 rounded-2xl bg-ink p-6 text-xl font-bold leading-snug text-white">“Rules match. Humans approve. AI can explain exceptions later.”</blockquote>
      </section>

      <section id="example">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">Worked example</p>
        <h2 className="mt-3">{example.title}</h2>
        <p className="lead">{example.setup}</p>
        <dl className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          {example.rows.map((row) => <div key={row.label} className="grid gap-1 border-b border-slate-100 px-5 py-4 last:border-0 sm:grid-cols-[180px_1fr]"><dt className="font-bold text-ink">{row.label}</dt><dd className="text-slate-600">{row.value}</dd></div>)}
        </dl>
        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-slate-700"><strong>Review result:</strong> {example.result}</p>
      </section>

      <section><CTASection compact /></section>

      <section id="related">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">Continue the workflow</p>
        <h2 className="mt-3">Related Novoriq reconciliation guides</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">{related.map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 p-5 transition hover:border-sky hover:bg-sky-50"><span className="text-xs font-bold uppercase tracking-wider text-deep">{item.category}</span><h3 className="mt-2 font-bold leading-snug text-ink">{item.title}</h3><span className="mt-3 inline-block text-sm font-semibold text-deep">Read guide →</span></Link>)}</div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold"><Link href="/" className="text-deep underline">Novoriq home</Link><Link href="/blog" className="text-deep underline">All reconciliation guides</Link></div>
      </section>

      <section id="faq">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-deep">Frequently asked questions</p>
        <h2 className="mt-3">Questions finance teams ask</h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink"><span>{question}</span><span className="text-xl text-deep group-open:rotate-45">+</span></summary><p className="mt-3 pr-8 text-slate-600">{answer}</p></details>)}</div>
      </section>

      <section className="mb-0 text-center"><h2>Bring structure to the next messy file set</h2><p className="lead mx-auto max-w-xl">Help shape a practical reconciliation workflow for accountants, bookkeepers, and finance teams.</p><a href={siteConfig.betaUrl} className="mt-7 inline-flex rounded-full bg-deep px-7 py-3.5 font-bold text-white transition hover:bg-ink">Join Novoriq private beta</a></section>
    </BlogArticleLayout>
  );
}
