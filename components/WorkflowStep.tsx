type WorkflowStepProps = { number: number; title: string; children: React.ReactNode };

export function WorkflowStep({ number, title, children }: WorkflowStepProps) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-4 pb-8 last:pb-0">
      <div className="absolute bottom-0 left-5 top-11 w-px bg-sky-200 last:hidden" aria-hidden="true" />
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-deep text-sm font-bold text-white">{number}</span>
      <div>
        <h3 className="font-bold text-ink">{title}</h3>
        <p className="mt-1 leading-7 text-slate-600">{children}</p>
      </div>
    </li>
  );
}
