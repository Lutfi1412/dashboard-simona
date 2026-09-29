export const TYPES = ["ping", "server", "website"];

export const ts = (x) => new Date(x).getTime();

export const ago = (x, now) => {
  const s = Math.max(0, Math.floor((now - ts(x)) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

export const fmtDate = (x) =>
  new Date(x).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

// Warna & label tiap status. Ubah di sini kalau mau ganti tema.
export const STATUS = {
  online: { badge: "Connect", dot: "bg-emerald-500", pill: "bg-white/90 text-emerald-700", card: "from-emerald-500 to-emerald-600 text-white shadow-emerald-600/25" },
  warning: { badge: "Warning", dot: "bg-amber-400", pill: "bg-white/80 text-amber-700", card: "from-amber-300 to-amber-400 text-amber-950 shadow-amber-500/25" },
  disconnect: { badge: "Disconnect", dot: "bg-rose-500", pill: "bg-white/90 text-rose-700", card: "from-rose-500 to-red-600 text-white shadow-red-600/25" },
};
