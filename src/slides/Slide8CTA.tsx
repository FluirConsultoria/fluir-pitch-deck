import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";

export function Slide8CTA() {
  return (
    <SlideWrapper gradient>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <GoldDivider className="mb-12" />

        <h1
          className="text-6xl max-w-5xl leading-tight"
          style={{ color: "#F0D78C", fontWeight: 800 }}
        >
          Vamos ver se você está deixando ICMS na mesa?
        </h1>

        <p
          className="mt-8 text-xl max-w-3xl"
          style={{ color: "#F5F0F0", fontWeight: 400 }}
        >
          Em 15 minutos, calculamos juntos o quanto a sua operação pode
          economizar, agora mesmo.
        </p>

        <a
          href="https://fluir-pitch-deck.pages.dev/simulacao_fluir"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block px-10 py-5 rounded-xl text-xl transition-transform hover:scale-105"
          style={{
            backgroundColor: "#C9A84C",
            color: "#041938",
            fontWeight: 800,
            boxShadow: "0 10px 30px -10px rgba(201, 168, 76, 0.5)",
          }}
        >
          → Abrir Planilha de Pré-Viabilidade
        </a>

        <div
          className="mt-12 text-base"
          style={{ color: "#E2E6E9", fontWeight: 400 }}
        >
          carlos@fluirconsultoriaes.com.br · Vitória, Espírito Santo
        </div>
      </div>
    </SlideWrapper>
  );
}
