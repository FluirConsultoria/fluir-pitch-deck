import { Shield, Calendar, TrendingUp, Newspaper } from "lucide-react";
import { ReactNode } from "react";
import {
  SlideWrapper,
  SlideHeadline,
  LegalFooter,
} from "@/components/deck-primitives";

function PillarCard({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div
      className="rounded-xl flex items-center gap-4 px-6 py-8 w-full"
      style={{
        backgroundColor: "#09151A",
        border: "1px solid #C9A84C",
      }}
    >
      <div style={{ color: "#F0D78C" }}>{icon}</div>
      <div
        style={{
          color: "#F5F0F0",
          fontWeight: 600,
          fontSize: 15,
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>
    </div>
  );
}

function PressCard({
  source,
  sourceBg,
  sourceColor,
  date,
  headline,
  highlight,
}: {
  source: string;
  sourceBg: string;
  sourceColor: string;
  date: string;
  headline: string;
  highlight: string;
}) {
  const parts = headline.split(highlight);
  return (
    <div
      className="rounded-lg overflow-hidden flex items-stretch"
      style={{
        backgroundColor: "#F5F0F0",
        boxShadow: "0 8px 24px -10px rgba(0,0,0,0.5)",
        borderLeft: "4px solid #C9A84C",
        minHeight: 110,
      }}
    >
      {/* Source strip */}
      <div
        className="flex flex-col items-center justify-center px-4"
        style={{
          backgroundColor: sourceBg,
          minWidth: 110,
        }}
      >
        <Newspaper size={20} style={{ color: sourceColor, opacity: 0.85 }} />
        <span
          style={{
            color: sourceColor,
            fontWeight: 800,
            fontSize: 14,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop: 6,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          {source}
        </span>
        <span
          style={{
            color: sourceColor,
            opacity: 0.7,
            fontSize: 9,
            marginTop: 3,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Imprensa
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-5 py-3">
        <div
          style={{
            color: "#8B7355",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 5,
          }}
        >
          {date}
        </div>
        <div
          style={{
            color: "#1a1a1a",
            fontWeight: 700,
            fontSize: 15,
            lineHeight: 1.3,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {parts[0]}
          <span style={{ color: "#a8842a" }}>{highlight}</span>
          {parts[1]}
        </div>
      </div>
    </div>
  );
}

export function Slide5Legal() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-2xl md:text-3xl max-w-4xl">
        Base legal consolidada. Incentivos válidos até 2032.
      </SlideHeadline>
      <p
        className="mt-2 text-sm max-w-3xl"
        style={{ color: "#E2E6E9", fontWeight: 500 }}
      >
        Convalidados via LC 160/2017 e Convênio ICMS 190/2017 do CONFAZ
      </p>

      <div className="flex-1 grid grid-cols-5 gap-6 mt-6 min-h-0 pb-10">
        {/* Left: pillars */}
        <div className="col-span-2 flex flex-col gap-3 justify-center">
          <PillarCard
            icon={<Shield size={24} strokeWidth={1.6} />}
            title="Convalidado no CONFAZ"
          />
          <PillarCard
            icon={<Calendar size={24} strokeWidth={1.6} />}
            title="Válido até 2032"
          />
          <PillarCard
            icon={<TrendingUp size={24} strokeWidth={1.6} />}
            title="Previsibilidade para o investidor"
          />
        </div>

        {/* Right: press clippings */}
        <div className="col-span-3 flex flex-col gap-4 justify-center">
          <PressCard
            source="Gazeta ES"
            sourceBg="rgba(30, 58, 138, 0.12)"
            sourceColor="#1e3a8a"
            date="Reforma Tributária"
            headline="ES poderá manter incentivos fiscais até 2032 após reforma"
            highlight="até 2032"
          />
          <PressCard
            source="G1"
            sourceBg="#c4202a"
            sourceColor="#FFFFFF"
            date="Senado Federal"
            headline="Senado aprova projeto que prorroga incentivos fiscais do ICMS até 2032"
            highlight="prorroga incentivos fiscais"
          />
        </div>
      </div>

      <LegalFooter>
        Base legal: LC 160/2017 · Convênio ICMS 190/2017 · LC 186/2021 ·
        Legislação estadual ES
      </LegalFooter>
    </SlideWrapper>
  );
}
