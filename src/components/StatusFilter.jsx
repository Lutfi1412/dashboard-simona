import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";

const OPTIONS = [
  ["all", "Semua status"],
  ["online", "Online"],
  ["warning", "Warning"],
  ["offline", "Offline"],
];

export default function StatusFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Tutup ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ICON BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`grid size-10 place-items-center rounded-xl border transition ${
          open
            ? "border-emerald-400 bg-emerald-50 text-emerald-600"
            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`}
        title="Filter status"
      >
        <Globe size={18} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {OPTIONS.map(([optionValue, label]) => (
            <button
              key={optionValue}
              type="button"
              onClick={() => {
                onChange(optionValue);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                value === optionValue
                  ? "bg-emerald-50 font-medium text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{label}</span>

              {value === optionValue && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
