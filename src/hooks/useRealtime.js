import { useEffect, useState } from "react";
import seed from "../data/servers.json";

const INTERVAL = 5; // data berubah tiap 5 detik
const WARN_MS = 120; // latensi >= ini => warning
const MAX_MS = 250; // lewat ini latensi "pulih" supaya demo tidak naik terus
const rand = (a, b) => a + Math.random() * (b - a);

const mapAll = (d, fn) =>
  Object.fromEntries(Object.entries(d).map(([t, list]) => [t, list.map(fn)]));

const init = (d) => {
  const now = Date.now();
  return mapAll(d, (s) => (s.status === "disconnect" ? { ...s, lastCheck: now } : { ...s, lastOnline: now }));
};

const step = (s, now) => {
  if (s.status === "disconnect") return { ...s, lastCheck: now };
  let latency = s.latency + INTERVAL; // +1 ms per detik x 5 detik
  if (latency > MAX_MS) latency = rand(15, 90);
  return { ...s, latency: +latency.toFixed(2), status: latency >= WARN_MS ? "warning" : "online", lastOnline: now };
};

export default function useRealtime() {
  const [data, setData] = useState(() => init(seed));
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t); // dipakai untuk "12s ago"
      if (++n % INTERVAL === 0) setData((d) => mapAll(d, (s) => step(s, t)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const addServer = (type, server) => setData((d) => ({ ...d, [type]: [...d[type], server] }));
  return { data, now, addServer };
}
