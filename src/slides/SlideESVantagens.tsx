import { Truck, TrendingUp, Shield, Calendar } from "lucide-react";
import { ReactNode } from "react";
import { SlideHeader } from "@/components/deck-primitives";
import mapaBrasilES from "@/assets/mapa-brasil-es.png";

type CardProps = {
  icon: ReactNode;
  tag: string;
  title: string;
  body: string;
  color: string;
};

function ESCard({ icon, tag, title, body, color }: CardProps) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#09151a",
        border: "1px solid #1a3f70",
        borderRadius: 10,
        padding: "12px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 5,
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
      <div style={{ color: "#F5F0F0", fontWeight: 700, fontSize: 16, lineHeight: 1.25 }}>
        {title}
      </div>
      <div style={{ color: "#adc2d8", fontSize: 12, lineHeight: 1.45 }}>
        {body}
      </div>
    </div>
  );
}

const cards: CardProps[] = [
  {
    icon: <Truck size={16} strokeWidth={1.5} />,
    tag: "Hub Logístico Nacional",
    title: "1.200 km de 60% do PIB nacional",
    body: "Portos + EFVM + posição costeira estratégica — menor custo e menor prazo para distribuição em todo o Brasil.",
    color: "#609DFF",
  },
  {
    icon: <TrendingUp size={16} strokeWidth={1.5} />,
    tag: "Governo que Investe",
    title: "R$ 137,6 bi em pipeline",
    body: "Fundo Soberano do ES + logística como setor prioritário de 2024 a 2029, com novos portos e parques logísticos em implantação.",
    color: "#2dd47e",
  },
  {
    icon: <Shield size={16} strokeWidth={1.5} />,
    tag: "Estado mais Fiscal do Brasil",
    title: "Nota A · 1º em equilíbrio fiscal",
    body: "O Espírito Santo lidera o ranking nacional de responsabilidade fiscal — governo previsível, sem risco de reversão de incentivos.",
    color: "#F0D78C",
  },
  {
    icon: <Calendar size={16} strokeWidth={1.5} />,
    tag: "Incentivo com Raiz",
    title: "Compete ES desde 2003",
    body: "Mais de 20 anos de vigência contínua. Convalidado no CONFAZ e estendido até 2032 — base legal sólida para planejamento de longo prazo.",
    color: "#C9A84C",
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

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minHeight: 0, overflow: "hidden" }}>
            {cards.map((c) => (
              <ESCard key={c.tag} {...c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
