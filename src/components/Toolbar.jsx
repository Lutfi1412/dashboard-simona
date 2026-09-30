import {
  Filter,
  Globe,
  LineChart,
  Plus,
  LayoutGrid,
  Rows3,
  ChevronDown,
  Search,
} from "lucide-react";

import StatusFilter from "./StatusFilter";

const Select = ({ icon: Icon, value, onChange, options }) => (
  <label className="relative">
    <Icon
      size={15}
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
    />
    <ChevronDown
      size={14}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
    />
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm shadow-sm outline-none transition hover:border-slate-300 focus:ring-2 focus:ring-emerald-300"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  </label>
);

export default function Toolbar({
  type,
  setType,
  status,
  setStatus,
  chart,
  setChart,
  view,
  setView,
  onAdd,
  search,
  onSearch,
}) {
  const btn = (on) =>
    `grid size-9 place-items-center rounded-xl border transition ${on ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100"}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="gap-3 md:flex hidden">
        <Select
          icon={Filter}
          value={type}
          onChange={setType}
          options={[
            ["all", "Semua tipe"],
            ["ping", "Ping"],
            ["website", "Website"],
            ["server", "Server"],
          ]}
        />
        <Select
          icon={Globe}
          value={status}
          onChange={setStatus}
          options={[
            ["all", "Semua status"],
            ["online", "Online"],
            ["warning", "Warning"],
            ["offline", "Offline"],
          ]}
        />
      </div>

      <div className="flex w-full items-center gap-2 md:hidden">
        <label className="relative min-w-0 flex-1">
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

        {/* Status */}
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      <div className="flex w-full gap-2 md:hidden">
        <button
          onClick={() => setChart(!chart)}
          className={`
    flex flex-1 flex-row items-center justify-center gap-2
    rounded-xl border px-4 py-2.5
    text-sm font-medium transition
    ${
      chart
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
    }
  `}
        >
          <LineChart size={17} />
          <span>Line Chart</span>
        </button>

        <button
          onClick={() => alert("fitur belum tersedia")}
          className="
      flex flex-1 items-center justify-center gap-2
      rounded-xl border border-slate-200
      bg-white px-4 py-2.5
      text-sm font-medium text-slate-700
      shadow-sm transition
      hover:bg-slate-100
      active:scale-[0.98]
    "
        >
          <Plus size={17} />
          <span>Add New</span>
        </button>
      </div>

      <button
        onClick={() => setChart(!chart)}
        className={`${btn(chart)} hidden md:grid`}
        title="Grafik latensi"
      >
        <LineChart size={16} />
      </button>
      <div className="ml-auto flex items-center gap-3 hidden md:flex">
        <button
          // onClick={onAdd}
          onClick={() => alert("fitur belum tersedia")}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100"
        >
          <Plus size={15} />
          Add
        </button>

        <span className="h-6 w-px bg-slate-200" />
        <button
          onClick={() => setView("card")}
          className={btn(view === "card")}
          title="Tampilan card"
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => setView("table")}
          className={btn(view === "table")}
          title="Tampilan tabel"
        >
          <Rows3 size={16} />
        </button>
      </div>

      <div className="flex w-full gap-2 md:hidden">
        {[
          ["all", "Semua tipe"],
          ["ping", "Ping"],
          ["website", "Website"],
          ["server", "Server"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`flex flex-1 items-center justify-center rounded-xl border px-2 py-2.5 text-xs font-medium transition ${
              type === value
                ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
