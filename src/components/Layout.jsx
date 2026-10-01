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
  // ["Server", Server],
  ["Log", ScrollText],
  ["User", Users],
  ["Config", Settings2],
  ["Update", RefreshCw],
];

export default function Layout({ search, onSearch, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16 md:pb-0">
      {/* HEADER */}
      <header className="sticky top-0 z-30 hidden items-center gap-4 border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur md:flex md:px-6">
        <div className="flex w-auto items-center gap-2 font-semibold hidden md:flex mr-3">
          {/* <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
            <Server size={16} />
           
          </span> */}
          <img
            src="/logo.png"
            alt="logo"
            className="grid size-10 shrink-0 place-items-center "
          />
          <span>Server Monitor</span>
        </div>

        {/* SEARCH */}
        <label className="relative max-w-md flex-1 hidden md:block">
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

        {/* USER */}
        <div className="ml-auto hidden text-right text-sm leading-tight sm:block">
          <div className="font-medium">Welcome</div>
          <div className="text-xs text-slate-400">Admin</div>
        </div>
      </header>

      <div className="flex">
        {/* DESKTOP SIDEBAR */}
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-52 shrink-0 border-r border-slate-200/70 bg-white p-3 md:block">
          {MENU.map(([label, Icon], i) => (
            <button
              key={label}
              className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                i === 0
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </aside>

        {/* CONTENT */}
        <main className="min-w-0 flex-1 p-4 pt-8 md:p-6 md:pt-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex h-16 items-center justify-around px-1">
          {MENU.map(([label, Icon], i) => (
            <button
              key={label}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 text-[10px] transition ${
                i === 0
                  ? "font-medium text-emerald-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
