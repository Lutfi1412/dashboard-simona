import {
  Filter,
  Globe,
  LineChart,
  Plus,
  LayoutGrid,
  Rows3,
  ChevronDown,
} from "lucide-react";

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
}) {
  const btn = (on) =>
    `grid size-9 place-items-center rounded-xl border transition ${on ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100"}`;
  return (
    <div className="flex flex-wrap items-center gap-3">
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
          ["disconnect", "Disconnect"],
        ]}
      />
      <button
        onClick={() => setChart(!chart)}
        className={btn(chart)}
        title="Grafik latensi"
      >
        <LineChart size={16} />
      </button>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onAdd}
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
    </div>
  );
}
