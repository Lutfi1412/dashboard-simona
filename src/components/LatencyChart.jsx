import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LatencyChart({ servers }) {
  // Hanya server online & warning,
  // urut dari latensi terbesar
  const top = servers
    .filter((s) => s.status !== "offline")
    .sort((a, b) => b.latency - a.latency)
    .slice(0, 5)
    .map((s) => ({
      name: s.name,
      latency: s.latency,
    }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold">5 Server dengan Latensi Terburuk</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={top}
            margin={{
              top: 15,
              right: 35,
              bottom: 20,
              left: 20,
            }}
          >
            <defs>
              <linearGradient id="redFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />

                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />

            {/* Sumbu X */}
            <XAxis
              dataKey="name"
              interval={0}
              padding={{
                left: 30,
                right: 30,
              }}
              tick={{
                fontSize: 14,
                fontWeight: 600,
                fill: "#334155",
              }}
              tickLine={false}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              tickMargin={12}
            />

            {/* Sumbu Y */}
            <YAxis
              unit=" ms"
              tick={{
                fontSize: 14,
                fontWeight: 600,
                fill: "#334155",
              }}
              tickLine={false}
              axisLine={{
                stroke: "#cbd5e1",
              }}
              width={75}
              tickMargin={8}
            />

            <Tooltip formatter={(value) => [`${value} ms`, "Latency"]} />

            <Area
              type="monotone"
              dataKey="latency"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#redFill)"
              dot={{
                r: 5,
                fill: "#ef4444",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
