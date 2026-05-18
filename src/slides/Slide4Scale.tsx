import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { name: "COMPETE-ES", value: 4000, label: "+4.000 empresas", fill: "url(#blueGrad)" },
  { name: "INVEST-ES", value: 600, label: "+600 empresas", fill: "url(#goldGrad)" },
];

export function Slide4Scale() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-4xl md:text-5xl max-w-5xl">
        +4.600 empresas já operam com incentivo fiscal no ES.
      </SlideHeadline>

      <div className="flex-1 mt-8 flex gap-8">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 200, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#609DFF" />
                  <stop offset="100%" stopColor="#8FB8FF" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#F0D78C" />
                </linearGradient>
              </defs>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#F5F0F0", fontSize: 16, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={60}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="label"
                  position="right"
                  style={{ fill: "#F5F0F0", fontSize: 20, fontWeight: 800 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-64 flex flex-col justify-center gap-6">
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: "rgba(196, 69, 69, 0.1)",
              border: "1px solid #c44545",
            }}
          >
            <div className="flex items-start gap-2">
              <div style={{ color: "#c44545", fontSize: 24, lineHeight: 1 }}>↓</div>
              <div>
                <div style={{ color: "#c44545", fontWeight: 700, fontSize: 14 }}>
                  Sem incentivo
                </div>
                <div style={{ color: "#E2E6E9", fontSize: 12 }}>
                  ICMS cheio
                </div>
              </div>
            </div>
          </div>
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: "rgba(45, 212, 126, 0.08)",
              border: "1px solid #2dd47e",
            }}
          >
            <div className="flex items-start gap-2">
              <div style={{ color: "#2dd47e", fontSize: 24, lineHeight: 1 }}>↑</div>
              <div>
                <div style={{ color: "#2dd47e", fontWeight: 700, fontSize: 14 }}>
                  Com incentivo
                </div>
                <div style={{ color: "#E2E6E9", fontSize: 12 }}>
                  Economia real
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
