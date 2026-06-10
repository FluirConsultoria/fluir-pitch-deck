import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

const data = [
  { name: "O Boticário", rate: 1.14, isClient: false },
  { name: "Lola", rate: 1.14, isClient: false },
  { name: "Amend", rate: 1.14, isClient: false },
  { name: "Widi Care", rate: 1.14, isClient: false },
  { name: "Alfaparf", rate: 1.14, isClient: false },
  { name: " ", rate: 0, isClient: false },
  { name: "Sua empresa", rate: 12, isClient: true },
];

const formatRate = (v: number) => {
  if (v === 0) return "";
  if (Number.isInteger(v)) return `${v}%`;
  return `${v.toFixed(2).replace(".", ",")}%`;
};

const CustomYTick = ({ x, y, payload }: any) => {
  const isClient = payload.value === "Sua empresa";
  const isEmpty = payload.value === " ";
  if (isEmpty) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill={isClient ? "#e06060" : "#F5F0F0"}
        fontWeight={isClient ? 800 : 600}
        fontSize={17}
      >
        {payload.value}
      </text>
    </g>
  );
};

export function SlideCompetitivo() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-3xl max-w-4xl">
        Seus concorrentes já se posicionaram.
      </SlideHeadline>
      <p className="mt-1 text-base" style={{ color: "#8FB8FF", fontWeight: 500 }}>
        Taxa efetiva de ICMS — operações interestaduais
      </p>

      <div className="flex-1 mt-5 flex gap-8 min-h-0">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 80, left: 10, bottom: 8 }}
            >
              <defs>
                <linearGradient id="esGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#609DFF" />
                  <stop offset="100%" stopColor="#8FB8FF" />
                </linearGradient>
                <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c44545" />
                  <stop offset="100%" stopColor="#e06060" />
                </linearGradient>
              </defs>
              <XAxis
                type="number"
                domain={[0, 14]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#8FB8FF", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 4, 8, 12]}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={<CustomYTick />}
                axisLine={false}
                tickLine={false}
                width={130}
              />
              <ReferenceLine
                x={1.14}
                stroke="#609DFF"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
              <Bar dataKey="rate" radius={[0, 6, 6, 0]} barSize={30}>
                {data.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.rate === 0
                        ? "transparent"
                        : entry.isClient
                        ? "url(#clientGrad)"
                        : "url(#esGrad)"
                    }
                  />
                ))}
                <LabelList
                  dataKey="rate"
                  position="right"
                  formatter={(v: any) => formatRate(Number(v))}
                  style={{ fill: "#F5F0F0", fontSize: 15, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-52 flex flex-col justify-center gap-4">
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid #C9A84C" }}
          >
            <div
              style={{
                color: "#F0D78C",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Momento
            </div>
            <div style={{ color: "#E2E6E9", fontSize: 14, lineHeight: 1.5 }}>
              Com a exclusão dos cosméticos do ICMS-ST em SP, a estruturação no ES ficou ainda mais acessível.
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
