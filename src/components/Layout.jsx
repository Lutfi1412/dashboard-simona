import {
  LayoutGrid,
  Server,
  ScrollText,
  Users,
  Settings2,
  RefreshCw,
  Search,
} from "lucide-react";

const MENU = [
  ["Status", LayoutGrid],
  ["Server", Server],
  ["Log", ScrollText],
  ["User", Users],
  ["Config", Settings2],
  ["Update", RefreshCw],
];

export default function Layout({ search, onSearch, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-slate-200/70 bg-white/80 px-6 py-3 backdrop-blur">
        <div className="flex w-44 items-center gap-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-xl bg-emerald-500 text-white">
            <Server size={16} />
          </span>
          Server Monitor
        </div>
        <label className="relative max-w-md flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari nama server..."
            className="w-full rounded-xl bg-slate-100 py-2 pl-9 pr-3 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-400"
          />
        </label>
        <div className="ml-auto text-right text-sm leading-tight">
          <div className="font-medium">Welcome</div>
          <div className="text-xs text-slate-400">Admin</div>
        </div>
      </header>
      <div className="flex">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-52 shrink-0 border-r border-slate-200/70 bg-white p-3 md:block">
          {MENU.map(([label, Icon], i) => (
            <button
              key={label}
              className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${i === 0 ? "bg-emerald-50 font-medium text-emerald-700" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </aside>
        <main className="min-w-0 flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
