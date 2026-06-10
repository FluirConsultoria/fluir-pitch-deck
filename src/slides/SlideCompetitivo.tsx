import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

const data = [
  { name: "O Boticário", rate: 1.14, isClient: false },
  { name: "Lola", rate: 1.14, isClient: false },
  { name: "Amend", rate: 1.14, isClient: false },
  { name: "Widi Care", rate: 1.14, isClient: false },
  { name: "Bio Extratus", rate: 1.14, isClient: false },
  { name: " ", rate: 0, isClient: false },
  { name: "Sua empresa", rate: 25, isClient: true },
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

// Two-color bar: 0–12% dark red, 12–25% bright red, with a divider line
const CustomBar = (props: any) => {
  const { x, y, width, height, isClient, value } = props;
  if (!value || !width || width <= 0) return <g />;

  if (isClient) {
    const split = width * (12 / 25);
    return (
      <g>
        {/* 0–12%: current rate */}
        <rect x={x} y={y} width={split} height={height} fill="url(#clientGrad)" />
        {/* 12–25%: Pós Primavera Tributária */}
        <rect
          x={x + split} y={y}
          width={width - split} height={height}
          fill="url(#clientGrad2)"
          rx={6} ry={6}
        />
        {/* Divider at 12% */}
        <line
          x1={x + split} y1={y - 1}
          x2={x + split} y2={y + height + 1}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1.5}
        />
      </g>
    );
  }

  return (
    <rect x={x} y={y} width={width} height={height} fill="url(#esGrad)" rx={6} ry={6} />
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
              margin={{ top: 8, right: 80, left: 10, bottom: 52 }}
            >
              <defs>
                <linearGradient id="esGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#609DFF" />
                  <stop offset="100%" stopColor="#8FB8FF" />
                </linearGradient>
                {/* 0–12%: dark red */}
                <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c44545" />
                  <stop offset="100%" stopColor="#e06060" />
                </linearGradient>
                {/* 12–25%: brighter red */}
                <linearGradient id="clientGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#cc1111" />
                  <stop offset="100%" stopColor="#ff3333" />
                </linearGradient>
              </defs>

              <XAxis
                type="number"
                domain={[0, 28]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#8FB8FF", fontSize: 14 }}
                axisLine={false}
                tickLine={false}
                ticks={[4, 8, 12, 18, 25]}
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

              {/* Zone 12–25%: Pós Primavera Tributária */}
              <ReferenceArea
                x1={12}
                x2={25}
                fill="none"
                stroke="none"
                label={(labelProps: any) => {
                  const { viewBox } = labelProps;
                  if (!viewBox) return <g />;
                  return (
                    <text
                      x={viewBox.x + viewBox.width / 2}
                      y={viewBox.y + viewBox.height + 44}
                      textAnchor="middle"
                      fill="#ff5555"
                      fontSize={12}
                      fontWeight={600}
                      fontFamily="system-ui, sans-serif"
                    >
                      Pós Primavera Tributária
                    </text>
                  );
                }}
              />

              <Bar dataKey="rate" barSize={30} shape={<CustomBar />}>
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
