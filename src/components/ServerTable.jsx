import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STATUS, ago } from "../utils/helpers";

// [key, judul kolom, fungsi teks sel]
const COLS = [
  ["name", "Name", (s) => s.name],
  ["host", "Server", (s) => s.host],
  ["type", "Type", (s) => s.type],
  ["lastOnline", "Last Online", (s, now) => ago(s.lastOnline, now)],
  [
    "lastOffline",
    "Last Offline",
    (s, now) =>
      s.status === "offline"
        ? "Now"
        : s.lastOffline
          ? ago(s.lastOffline, now)
          : "Never",
  ],
  [
    "latency",
    "Latency",
    (s) => (s.latency == null ? "-" : `${s.latency.toFixed(2)} ms`),
  ],
];
const PER_PAGE = 10;

export default function ServerTable({ rows, now }) {
  const [f, setF] = useState({});
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      rows.filter((s) =>
        COLS.every(
          ([k, , get]) =>
            !f[k] || get(s, now).toLowerCase().includes(f[k].toLowerCase()),
        ),
      ),
    [rows, f, now],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const p = Math.min(page, pages);
  const slice = filtered.slice((p - 1) * PER_PAGE, p * PER_PAGE);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-5 py-3 text-sm text-slate-500">
        {filtered.length} Records Found. Page {p} Of {pages}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold text-slate-500">
              {COLS.map(([k, label]) => (
                <th key={k} className="px-4 pt-2">
                  {label}
                </th>
              ))}
            </tr>
            <tr>
              {COLS.map(([k]) => (
                <th key={k} className="px-4 pb-3 pt-1">
                  <input
                    value={f[k] || ""}
                    onChange={(e) => {
                      setF({ ...f, [k]: e.target.value });
                      setPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm font-normal outline-none focus:ring-2 focus:ring-emerald-300"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((s) => (
              <tr
                key={s.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                {COLS.map(([k, , get], i) => (
                  <td
                    key={k}
                    className={`px-4 py-3 ${k === "type" ? "capitalize" : ""}`}
                  >
                    {i === 0 && (
                      <i
                        className={`mr-2 inline-block size-2 rounded-full ${STATUS[s.status].dot}`}
                      />
                    )}
                    {get(s, now)}
                  </td>
                ))}
              </tr>
            ))}
            {!slice.length && (
              <tr>
                <td
                  colSpan={COLS.length}
                  className="py-10 text-center text-slate-400"
                >
                  Tidak ada data yang cocok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-3">
        <button
          disabled={p === 1}
          onClick={() => setPage(p - 1)}
          className="rounded-lg border border-slate-200 p-1.5 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm text-slate-500">
          {p} / {pages}
        </span>
        <button
          disabled={p === pages}
          onClick={() => setPage(p + 1)}
          className="rounded-lg border border-slate-200 p-1.5 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
