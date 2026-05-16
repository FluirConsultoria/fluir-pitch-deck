import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";
import { FluirLogo } from "@/components/FluirLogo";

export function Slide8CTA() {
  return (
    <SlideWrapper showLogo={false} gradient>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <GoldDivider className="mb-12" />

        <h1
          className="text-5xl md:text-6xl max-w-5xl leading-tight"
          style={{ color: "#F0D78C", fontWeight: 800 }}
        >
          Vamos ver se você está deixando ICMS na mesa?
        </h1>

        <p
          className="mt-8 text-lg md:text-xl max-w-3xl"
          style={{ color: "#F5F0F0", fontWeight: 400 }}
        >
          Em 15 minutos, calculamos juntos o quanto a sua operação pode
          economizar — agora mesmo.
        </p>

        <button
          className="mt-10 px-10 py-5 rounded-xl text-lg transition-transform hover:scale-105"
          style={{
            backgroundColor: "#C9A84C",
            color: "#041938",
            fontWeight: 800,
            boxShadow: "0 10px 30px -10px rgba(201, 168, 76, 0.5)",
          }}
        >
          → Abrir Planilha de Pré-Viabilidade
        </button>

        <div className="mt-12">
          <FluirLogo size={64} />
        </div>
        <div
          className="mt-4 text-sm"
          style={{ color: "#E2E6E9", fontWeight: 400 }}
        >
          contato@fluirconsultoria.com.br · Vitória — Espírito Santo
        </div>
      </div>
    </SlideWrapper>
  );
}
