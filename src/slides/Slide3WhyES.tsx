import { SlideWrapper, SlideHeadline, ProgramCard, GoldDivider } from "@/components/deck-primitives";

export function Slide3WhyES() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-4xl md:text-5xl max-w-5xl">
        O Espírito Santo transformou incentivo fiscal em vantagem competitiva
        permanente.
      </SlideHeadline>

      <div className="grid grid-cols-2 gap-10 mt-10 flex-1 items-center">
        <div className="grid grid-cols-1 gap-5">
          <ProgramCard
            program="COMPETE-ES"
            audience="E-commerce e Atacado"
            rate="1,14%"
            rateSuffix="nas vendas interestaduais"
            note="vs. 12%–18% no regime normal"
            noteColor="#c44545"
          />
          <ProgramCard
            program="INVEST-ES"
            audience="Importadores"
            rate="1,085%"
            rateSuffix="na saída"
            note="100% ICMS diferido na entrada"
            noteColor="#8FB8FF"
          />
        </div>

        {/* ES State Map Outline */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 300 400" className="w-full max-w-sm">
            <defs>
              <linearGradient id="esGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A2A5C" />
                <stop offset="100%" stopColor="#020D1F" />
              </linearGradient>
            </defs>
            <path
              d="M150 20 Q180 25 195 50 Q210 80 220 110 Q235 140 240 175 Q245 210 240 240 Q235 275 220 305 Q205 335 185 360 Q165 380 145 380 Q125 375 115 350 Q100 320 95 285 Q88 250 85 215 Q82 180 88 145 Q95 110 110 80 Q125 50 145 30 Z"
              fill="url(#esGrad)"
              stroke="#609DFF"
              strokeWidth="2"
            />
            {/* Vitória star */}
            <circle cx="200" cy="240" r="5" fill="#C9A84C" />
            <text x="210" y="244" fill="#F0D78C" fontSize="12" fontWeight="600">
              Vitória
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <GoldDivider className="mb-3" />
        <div
          className="text-center text-sm"
          style={{ color: "#E2E6E9", fontWeight: 500 }}
        >
          Hub logístico estratégico — Porto de Vitória · Acesso ao Sudeste
        </div>
      </div>
    </SlideWrapper>
  );
}
