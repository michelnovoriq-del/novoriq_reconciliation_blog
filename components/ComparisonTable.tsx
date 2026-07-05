export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ink text-white">
            <tr><th className="px-5 py-4">Record</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Date</th><th className="px-5 py-4">Decision</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr><td className="px-5 py-4 font-semibold text-ink">INV-001 / deposit</td><td className="px-5 py-4">$100.00 / $100.00</td><td className="px-5 py-4">June 1 / June 2</td><td className="px-5 py-4"><span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">Green match</span></td></tr>
            <tr><td className="px-5 py-4 font-semibold text-ink">INV-003 / deposit</td><td className="px-5 py-4">$75.50 / $72.50</td><td className="px-5 py-4">Reference matches</td><td className="px-5 py-4"><span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-700">Review $3 fee</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
