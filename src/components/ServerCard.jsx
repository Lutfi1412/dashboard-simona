import { STATUS, ago, fmtDate } from "../utils/helpers";

export default function ServerCard({ s, now }) {
  const c = STATUS[s.status];
  const off = s.status === "disconnect";
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${c.card}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-semibold">{s.name}</div>
          <div className="truncate text-sm opacity-90">{s.host}</div>
        </div>
        <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c.pill}`}>
          <i className={`size-1.5 rounded-full ${c.dot} ${off ? "" : "animate-pulse"}`} />
          {c.badge}
        </span>
      </div>
      <div className="mt-4 space-y-0.5 text-sm opacity-90">
        <div>Last online : {ago(s.lastOnline, now)}</div>
        {off ? (
          <div>Last check : {ago(s.lastCheck, now)}</div>
        ) : (
          <>
            <div>Last offline : {s.lastOffline ? `${fmtDate(s.lastOffline)} (${ago(s.lastOffline, now)})` : "Never"}</div>
            <div>Latency : {s.latency.toFixed(2)} ms</div>
          </>
        )}
      </div>
    </div>
  );
}
