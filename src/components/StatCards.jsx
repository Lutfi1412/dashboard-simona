const ITEMS = [
  ["all", "Total Server", "text-slate-700"],
  ["online", "Total Online", "text-emerald-600"],
  ["warning", "Total Warning", "text-amber-500"],
  ["offline", "Total Offline", "text-rose-600"],
];

export default function StatCards({ servers, active, onPick }) {
  const count = (status) => {
    if (status === "all") {
      return servers.length;
    }

    return servers.filter((s) => s.status === status).length;
  };

  return (
    <div className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-4">
      {ITEMS.map(([key, label, color]) => (
        <div
          key={key}
          className={`rounded-2xl border border-slate-300 bg-white p-5 text-center shadow-sm transition ${
            onPick ? "hover:-translate-y-0.5 hover:shadow-md" : "cursor-default"
          }`}
        >
          <div className={`text-4xl font-bold tabular-nums ${color}`}>
            {count(key)}
          </div>

          <div className="mt-1 text-sm text-slate-500">{label}</div>
        </div>
      ))}
    </div>
  );
}
