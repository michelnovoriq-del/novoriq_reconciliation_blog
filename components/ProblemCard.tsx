type ProblemCardProps = { title: string; children: React.ReactNode; tone?: "red" | "amber" | "blue" };

export function ProblemCard({ title, children, tone = "blue" }: ProblemCardProps) {
  const colors = { red: "border-red-200 bg-red-50", amber: "border-amber-200 bg-amber-50", blue: "border-sky-200 bg-sky-50" };
  return (
    <article className={`rounded-2xl border p-5 ${colors[tone]}`}>
      <h3 className="font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
    </article>
  );
}
