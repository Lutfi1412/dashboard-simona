import { useState } from "react";
import { X } from "lucide-react";

const empty = {
  name: "",
  host: "",
  type: "ping",
  status: "online",
  latency: 20,
};
const inp =
  "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-300";
const Field = ({ label, children }) => (
  <label className="block text-sm">
    <span className="mb-1 block text-slate-500">{label}</span>
    {children}
  </label>
);

// Field form mengikuti bentuk JSON: online/warning punya latency, offline punya lastCheck.
export default function AddServerModal({ open, onClose, onSave }) {
  const [f, setF] = useState(empty);
  if (!open) return null;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const off = f.status === "offline";

  const submit = () => {
    if (!f.name.trim() || !f.host.trim()) return;
    const now = new Date().toISOString();
    const base = {
      id: Date.now(),
      name: f.name.trim(),
      host: f.host.trim(),
      status: f.status,
      lastOnline: now,
    };
    onSave(
      f.type,
      off
        ? { ...base, lastCheck: now }
        : { ...base, lastOffline: null, latency: Number(f.latency) || 0 },
    );
    setF(empty);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tambah server</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <Field label="Nama server">
            <input
              className={inp}
              value={f.name}
              onChange={set("name")}
              placeholder="Kemenkeu Server 26"
            />
          </Field>
          <Field label="Host:port">
            <input
              className={inp}
              value={f.host}
              onChange={set("host")}
              placeholder="smtp.gmail.com:587"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipe">
              <select className={inp} value={f.type} onChange={set("type")}>
                <option value="ping">Ping</option>
                <option value="server">Server</option>
                <option value="website">Website</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={inp} value={f.status} onChange={set("status")}>
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="offline">offline</option>
              </select>
            </Field>
          </div>
          {!off && (
            <Field label="Latency (ms)">
              <input
                type="number"
                min="0"
                className={inp}
                value={f.latency}
                onChange={set("latency")}
              />
            </Field>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm text-slate-500 hover:bg-slate-100"
          >
            Batal
          </button>
          <button
            onClick={submit}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-white shadow-md shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
