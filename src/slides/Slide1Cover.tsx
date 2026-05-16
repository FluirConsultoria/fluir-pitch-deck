import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";
import { FluirLogo } from "@/components/FluirLogo";

export function Slide1Cover() {
  return (
    <SlideWrapper showLogo={false} gradient>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <FluirLogo size={120} />
        <div
          className="mt-4 text-3xl tracking-wide"
          style={{ color: "#F0D78C", fontWeight: 700 }}
        >
          Fluir Consultoria
        </div>
        <GoldDivider className="my-8" />
        <h1
          className="text-5xl md:text-6xl max-w-5xl leading-tight"
          style={{ color: "#F5F0F0", fontWeight: 800 }}
        >
          Conectamos Oportunidades.
          <br />
          Impulsionamos o Espírito Santo.
        </h1>
        <p
          className="mt-8 text-lg md:text-xl max-w-3xl"
          style={{ color: "#E2E6E9", fontWeight: 400 }}
        >
          Consultoria especializada em estruturação tributária e atração de
          operações para o Espírito Santo
        </p>
      </div>
    </SlideWrapper>
  );
}
