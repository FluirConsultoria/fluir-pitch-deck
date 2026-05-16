import { SlideWrapper, SlideHeadline, PipelineStep } from "@/components/deck-primitives";

const steps = [
  { n: 1, label: "Viabilidade", desc: "Planilha atacadista da operação", highlight: true },
  { n: 2, label: "Logística", desc: "Assessoria na escolha de parceiros" },
  { n: 3, label: "Abertura", desc: "Todas as obrigações societárias" },
  { n: 4, label: "Incentivo", desc: "Solicitação e aprovação junto ao estado" },
  { n: 5, label: "Apuração", desc: "Mensal durante todo o contrato" },
];

export function Slide7Pipeline() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-4xl md:text-5xl max-w-5xl">
        Da decisão à operação: entregamos tudo, de ponta a ponta.
      </SlideHeadline>

      <div className="flex-1 flex items-center justify-center mt-10">
        <div className="relative w-full max-w-6xl">
          {/* Connector line */}
          <div
            className="absolute top-7 left-[8%] right-[8%] h-0.5"
            style={{
              background:
                "linear-gradient(90deg, #194A99 0%, #609DFF 100%)",
            }}
          />
          <div className="relative flex justify-between items-start">
            {steps.map((s) => (
              <PipelineStep
                key={s.n}
                number={s.n}
                label={s.label}
                description={s.desc}
                highlight={s.highlight}
              />
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
