import { Truck, TrendingUp, Shield } from "lucide-react";
import { ReactNode } from "react";
import { SlideHeader } from "@/components/deck-primitives";
import mapaBrasilES from "@/assets/mapa-brasil-es.png";

type CardProps = {
  icon: ReactNode;
  tag: string;
  title: string;
  bullets: string[];
  color: string;
};

function ESCard({ icon, tag, title, bullets, color }: CardProps) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#09151a",
        border: "1px solid #1a3f70",
        borderRadius: 12,
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color }}>{icon}</span>
        <span
          style={{
            color,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
          }}
        >
          {tag}
        </span>
      </div>
      <div style={{ color: "#F5F0F0", fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {bullets.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
            <span style={{ color, fontSize: 11, marginTop: 1, flexShrink: 0 }}>▸</span>
            <span style={{ color: "#adc2d8", fontSize: 12, lineHeight: 1.45 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const cards: CardProps[] = [
  {
    icon: <Truck size={16} strokeWidth={1.5} />,
    tag: "Hub Logístico Nacional",
    title: "No raio de 1.200 km: 60% do PIB nacional",
    bullets: [
      "Portos + EFVM + posição costeira estratégica",
      "Menor custo e prazo de distribuição",
    ],
    color: "#609DFF",
  },
  {
    icon: <TrendingUp size={16} strokeWidth={1.5} />,
    tag: "Governo que Investe",
    title: "R$ 35 bi até 2029 em logística e transporte",
    bullets: [
      "Logística no centro do ciclo de investimento",
      "Portos, rodovias, ferrovias e terminais de carga",
    ],
    color: "#2dd47e",
  },
  {
    icon: <Shield size={16} strokeWidth={1.5} />,
    tag: "Solidez Fiscal",
    title: "Único estado Nota A desde 2012",
    bullets: [
      "Nota A+ do Tesouro Nacional (2 anos seguidos)",
      "Menor endividamento do país = incentivo com lastro",
    ],
    color: "#F0D78C",
  },
];

export function SlideESVantagens() {
  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "#010f1c" }}
    >
      <SlideHeader />

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* Left — Brazil map */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={mapaBrasilES}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </div>

        {/* Right — title + cards */}
        <div
          style={{
            width: 420,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            padding: "18px 28px 18px 16px",
            backgroundColor: "#010f1c",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#F5F0F0", fontWeight: 800, fontSize: 30, lineHeight: 1.15 }}>
              Por que o
            </div>
            <div style={{ color: "#2dd47e", fontWeight: 800, fontSize: 30, lineHeight: 1.1 }}>
              Espírito Santo?
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, minHeight: 0, overflow: "hidden" }}>
            {cards.map((c) => (
              <ESCard key={c.tag} {...c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
