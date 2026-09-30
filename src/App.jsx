import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Layout from "./components/Layout";
import StatCards from "./components/StatCards";
import Toolbar from "./components/Toolbar";
import ServerCard from "./components/ServerCard";
import ServerTable from "./components/ServerTable";
import LatencyChart from "./components/LatencyChart";
import AddServerModal from "./components/AddServerModal";
import useRealtime from "./hooks/useRealtime";
import { TYPES } from "./utils/helpers";

export default function App() {
  const { data, now, addServer } = useRealtime();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState("card");
  const [chart, setChart] = useState(false);
  const [tools, setTools] = useState(true); // dropdown di samping judul "Status"
  const [modal, setModal] = useState(false);

  // Saat fitur disembunyikan, nilai efektifnya kembali default (pilihan tetap tersimpan)
  const eType = tools ? type : "all";
  const eStatus = tools ? status : "all";
  const eView = tools ? view : "card";

  const all = useMemo(
    () => TYPES.flatMap((t) => data[t].map((s) => ({ ...s, type: t }))),
    [data],
  );
  const shown = all.filter(
    (s) =>
      (eType === "all" || s.type === eType) &&
      (eStatus === "all" || s.status === eStatus) &&
      s.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout search={search} onSearch={setSearch}>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Status</h1>
          <button
            onClick={() => setTools(!tools)}
            title="Tampilkan/sembunyikan fitur"
            className="grid size-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${tools ? "" : "-rotate-90"}`}
            />
          </button>
        </div>

        {tools && (
          <>
            <Toolbar
              type={type}
              setType={setType}
              status={status}
              setStatus={setStatus}
              chart={chart}
              setChart={setChart}
              view={view}
              setView={setView}
              onAdd={() => setModal(true)}
              search={search}
              onSearch={setSearch}
            />

            <StatCards
              servers={all}
              active={eStatus}
              onPick={tools ? setStatus : undefined}
            />
          </>
        )}

        {tools && chart && <LatencyChart servers={all} />}

        {eView === "table" ? (
          <ServerTable rows={shown} now={now} />
        ) : (
          TYPES.map((t) => {
            const list = shown.filter((s) => s.type === t);
            return list.length ? (
              <section key={t}>
                <h2 className="mb-3 text-xl font-semibold capitalize">
                  {t}{" "}
                  <span className="ml-1 text-sm font-normal text-slate-400">
                    {list.length}
                  </span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {list.map((s) => (
                    <ServerCard key={s.id} s={s} now={now} />
                  ))}
                </div>
              </section>
            ) : null;
          })
        )}
        {eView === "card" && !shown.length && (
          <p className="py-16 text-center text-slate-400">
            Server tidak ditemukan. Coba ubah kata kunci atau filter.
          </p>
        )}
      </div>
      <AddServerModal
        open={modal}
        onClose={() => setModal(false)}
        onSave={addServer}
      />
    </Layout>
  );
}
