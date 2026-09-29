const ITEMS = [
  ["all", "Total Server", "text-slate-700"],
  ["online", "Total Online", "text-emerald-600"],
  ["warning", "Total Warning", "text-amber-500"],
  ["offline", "Total offline", "text-rose-600"],
];

export default function StatCards({ servers, active, onPick }) {
  const count = (k) =>
    k === "all" ? servers.length : servers.filter((s) => s.status === k).length;
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {ITEMS.map(([k, label, color]) => (
        <button
          key={k}
          onClick={() => onPick?.(k)}
          className={`rounded-2xl border bg-white p-5 text-center shadow-sm transition ${onPick ? "hover:-translate-y-0.5 hover:shadow-md" : "cursor-default"} ${active === k ? "border-slate-300 ring-2 ring-slate-200" : "border-transparent"}`}
        >
          <div className={`text-4xl font-bold tabular-nums ${color}`}>
            {count(k)}
          </div>
          <div className="mt-1 text-sm text-slate-500">{label}</div>
        </button>
      ))}
    </div>
  );
}
