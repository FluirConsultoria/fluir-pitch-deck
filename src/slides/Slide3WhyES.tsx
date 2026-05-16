import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";

function ProgramCard({
  label,
  audience,
  rate,
  rateSuffix,
  note,
  noteColor,
}: {
  label: string;
  audience: string;
  rate: string;
  rateSuffix: string;
  note: string;
  noteColor: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#09151A",
        border: "1px solid #194A99",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#609DFF",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "#F5F0F0",
          fontWeight: 700,
          fontSize: 16,
          marginBottom: 12,
        }}
      >
        {audience}
      </div>
      <div
        style={{
          color: "#609DFF",
          fontSize: 52,
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {rate}
      </div>
      <div style={{ color: "#E2E6E9", fontSize: 13, marginTop: 6 }}>
        {rateSuffix}
      </div>
      <div style={{ color: noteColor, fontSize: 12, marginTop: 10 }}>
        {note}
      </div>
    </div>
  );
}

function EsMap() {
  return (
    <svg viewBox="0 0 280 380" className="w-full h-full" style={{ maxHeight: "100%" }}>
      <defs>
        <radialGradient id="vitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0D78C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F0D78C" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Approximate Espírito Santo silhouette */}
      <path
        d="M118 18
           C 138 12, 162 16, 178 32
           C 192 50, 198 72, 196 92
           C 200 112, 212 128, 218 148
           C 226 172, 232 196, 234 220
           C 236 244, 230 268, 222 290
           C 214 312, 204 330, 188 346
           C 172 360, 152 366, 134 362
           C 116 358, 102 346, 92 330
           C 80 310, 72 288, 66 264
           C 58 238, 54 210, 56 184
           C 58 156, 64 130, 74 106
           C 84 82, 96 58, 108 38
           C 112 28, 114 22, 118 18 Z"
        fill="#194A99"
        fillOpacity={0.6}
        stroke="#609DFF"
        strokeWidth={1.5}
      />

      {/* Other cities */}
      <circle cx="150" cy="160" r="3" fill="#8FB8FF" />
      <text x="158" y="163" fill="#8FB8FF" fontSize="10" fontWeight={500}>
        Serra
      </text>

      <circle cx="135" cy="310" r="3" fill="#8FB8FF" />
      <text x="143" y="313" fill="#8FB8FF" fontSize="10" fontWeight={500}>
        Cachoeiro
      </text>

      {/* Vitória glow */}
      <circle cx="172" cy="220" r="22" fill="url(#vitGlow)" />
      <circle cx="172" cy="220" r="6" fill="#C9A84C" />
      <circle cx="172" cy="220" r="6" fill="none" stroke="#F0D78C" strokeWidth={1.5} />
      <text x="184" y="224" fill="#F0D78C" fontSize="13" fontWeight={700}>
        Vitória
      </text>
    </svg>
  );
}

export function Slide3WhyES() {
  return (
    <SlideWrapper>
      <h1
        className="max-w-5xl leading-tight tracking-tight"
        style={{
          color: "#F5F0F0",
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        }}
      >
        O Espírito Santo transformou incentivo fiscal em vantagem competitiva
        permanente.
      </h1>

      <div className="grid grid-cols-2 gap-10 mt-8 flex-1 min-h-0">
        <div className="flex flex-col gap-4 justify-center">
          <ProgramCard
            label="COMPETE-ES"
            audience="E-commerce e Atacado"
            rate="1,14%"
            rateSuffix="nas vendas interestaduais"
            note="vs. 12%–18% no regime normal"
            noteColor="#c44545"
          />
          <ProgramCard
            label="INVEST-ES"
            audience="Importadores"
            rate="1,085%"
            rateSuffix="na saída"
            note="100% ICMS diferido na entrada"
            noteColor="#2dd47e"
          />
        </div>

        <div className="flex items-center justify-center" style={{ height: "100%" }}>
          <div style={{ height: "80%" }}>
            <EsMap />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <GoldDivider className="mb-3" />
        <div
          className="text-center"
          style={{ color: "#E2E6E9", fontSize: 12, fontWeight: 500 }}
        >
          Hub logístico estratégico — Porto de Vitória · Acesso ao Sudeste
        </div>
      </div>
    </SlideWrapper>
  );
}
