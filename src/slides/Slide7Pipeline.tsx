import { Calculator, Truck, Building2, FileCheck, BarChart3, LucideIcon } from "lucide-react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

type Step = {
  n: number;
  icon: LucideIcon;
  label: string;
  desc: string;
};

const steps: Step[] = [
  { n: 1, icon: Calculator, label: "Viabilidade", desc: "Planilha da operação" },
  { n: 2, icon: Truck, label: "Logística", desc: "Escolha de parceiros" },
  { n: 3, icon: Building2, label: "Abertura", desc: "Obrigações societárias" },
  { n: 4, icon: FileCheck, label: "Incentivo", desc: "Aprovação estadual" },
  { n: 5, icon: BarChart3, label: "Apuração", desc: "Mensal no contrato" },
];

function StepNode({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div className="flex flex-col items-center text-center w-44 relative z-10">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#09151A",
          border: "2px solid #609DFF",
          boxShadow: "0 0 24px #609DFF40",
        }}
      >
        <Icon size={30} strokeWidth={1.8} color="#C9A84C" />
        <div
          className="absolute -top-2 -right-2 flex items-center justify-center"
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#C9A84C",
            color: "#041938",
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          {step.n}
        </div>
      </div>
      <div
        className="mt-5"
        style={{ color: "#F5F0F0", fontWeight: 700, fontSize: 18 }}
      >
        {step.label}
      </div>
      <div
        className="mt-2"
        style={{ color: "#E2E6E9", fontSize: 14, lineHeight: 1.4 }}
      >
        {step.desc}
      </div>
    </div>
  );
}

export function Slide7Pipeline() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-3xl md:text-4xl max-w-5xl mt-6">
        Da decisão à operação: entregamos tudo, de ponta a ponta.
      </SlideHeadline>

      <div className="flex-1 flex items-center justify-center mt-4">
        <div
          className="w-full max-w-6xl rounded-2xl"
          style={{ backgroundColor: "#09151A", padding: 56, border: "1px solid #194A99" }}
        >
          <div className="relative">
            {/* Animated gradient connector */}
            <div
              className="absolute left-[8%] right-[8%] h-[3px] rounded-full"
              style={{
                top: 36,
                background:
                  "linear-gradient(90deg, #194A99 0%, #609DFF 50%, #194A99 100%)",
                backgroundSize: "200% 100%",
                animation: "pipelineFlow 4s linear infinite",
              }}
            />
            <div className="relative flex justify-between items-start">
              {steps.map((s) => (
                <StepNode key={s.n} step={s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pipelineFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </SlideWrapper>
  );
}