import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CustomXAxisTick({ x, y, payload }) {
  const words = payload.value.split(" ");

  return (
    <g transform={`translate(${x},${y})`}>
      {/* Desktop: 1 baris */}
      <text
        className="hidden sm:block"
        x={0}
        y={0}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fill="#334155"
      >
        {payload.value}
      </text>

      {/* Mobile: maksimal 2 baris */}
      <text
        className="sm:hidden"
        x={0}
        y={0}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        fill="#334155"
      >
        {words.slice(0, 2).map((word, index) => (
          <tspan key={index} x={0} dy={index === 0 ? 0 : 14}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function LatencyChart({ servers }) {
  const top = servers
    .filter((s) => s.status !== "offline")
    .sort((a, b) => b.latency - a.latency)
    .slice(0, 5)
    .map((s) => ({
      name: s.name,
      latency: s.latency,
    }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-sm font-semibold sm:text-base">
        5 Server dengan Latensi Terburuk
      </h3>

      {/* Bisa scroll kiri-kanan di mobile */}
      <div className="overflow-x-auto">
        <div className="h-64 min-w-[600px] sm:min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={top}
              margin={{
                top: 30,
                right: 5,
                bottom: 15,
                left: 5,
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

              <XAxis
                dataKey="name"
                interval={0}
                padding={{
                  left: 15,
                  right: 10,
                }}
                tick={<CustomXAxisTick />}
                tickLine={false}
                axisLine={{
                  stroke: "#cbd5e1",
                }}
                height={55}
                tickMargin={12}
              />

              <YAxis
                unit=" ms"
                tick={{
                  fontSize: 12,
                  fontWeight: 600,
                  fill: "#334155",
                }}
                tickLine={false}
                axisLine={{
                  stroke: "#cbd5e1",
                }}
                width={60}
                tickMargin={6}
              />

              <Tooltip
                formatter={(value) => [`${value} ms`, "Latency"]}
                labelFormatter={(label) => `Server: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="latency"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#redFill)"
                dot={{
                  r: 4,
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
    </div>
  );
}
