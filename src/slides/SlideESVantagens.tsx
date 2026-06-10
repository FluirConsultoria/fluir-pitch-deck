import { Truck, TrendingUp, Shield, Calendar } from "lucide-react";
import { ReactNode } from "react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

function ESCard({
  icon,
  tag,
  title,
  body,
  color,
}: {
  icon: ReactNode;
  tag: string;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-3"
      style={{ backgroundColor: "#09151A", border: "1px solid #194A99" }}
    >
      <div className="flex items-center gap-3">
        <div style={{ color }}>{icon}</div>
        <span
          style={{
            color,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      </div>
      <div style={{ color: "#F5F0F0", fontWeight: 700, fontSize: 20, lineHeight: 1.25 }}>
        {title}
      </div>
      <div style={{ color: "#E2E6E9", fontSize: 15, lineHeight: 1.5 }}>
        {body}
      </div>
    </div>
  );
}

const cards = [
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    tag: "Hub Logístico Nacional",
    title: "1.200 km de 60% do PIB nacional",
    body: "Portos + EFVM + posição costeira estratégica — menor custo e menor prazo para distribuição em todo o Brasil.",
    color: "#609DFF",
  },
  {
    icon: <TrendingUp size={24} strokeWidth={1.5} />,
    tag: "Governo que Investe",
    title: "R$ 137,6 bi em pipeline",
    body: "Fundo Soberano do ES + logística como setor prioritário de 2024 a 2029, com novos portos e parques logísticos em implantação.",
    color: "#2dd47e",
  },
  {
    icon: <Shield size={24} strokeWidth={1.5} />,
    tag: "Estado mais Fiscal do Brasil",
    title: "Nota A · 1º em equilíbrio fiscal",
    body: "O Espírito Santo lidera o ranking nacional de responsabilidade fiscal — governo previsível, sem risco de reversão de incentivos.",
    color: "#F0D78C",
  },
  {
    icon: <Calendar size={24} strokeWidth={1.5} />,
    tag: "Incentivo com Raiz",
    title: "Compete ES desde 2003",
    body: "Mais de 20 anos de vigência contínua. Convalidado no CONFAZ e estendido até 2032 — base legal sólida para planejamento de longo prazo.",
    color: "#C9A84C",
  },
];

export function SlideESVantagens() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-3xl max-w-4xl">
        Por que o Espírito Santo?
      </SlideHeadline>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-5 mt-6">
        {cards.map((c) => (
          <ESCard key={c.tag} {...c} />
        ))}
      </div>
    </SlideWrapper>
  );
}
