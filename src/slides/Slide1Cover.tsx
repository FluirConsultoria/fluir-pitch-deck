import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";
import { FluirLogo } from "@/components/FluirLogo";
import porto from "@/assets/porto-vitoria.jpeg";

export function Slide1Cover() {
  return (
    <SlideWrapper gradient showLogo={false}>
      {/* Blurred port background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${porto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(14px) brightness(0.35)",
          transform: "scale(1.1)",
          opacity: 0.55,
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,42,92,0.55) 0%, rgba(2,13,31,0.85) 100%)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-6">
          <FluirLogo size={120} />
          <span
            style={{
              fontWeight: 700,
              fontSize: "clamp(4rem, 8vw, 7rem)",
              letterSpacing: "0.15em",
              color: "#F5F0F0",
              lineHeight: 1,
            }}
          >
            FLU<span style={{ color: "#609DFF" }}>I</span>R
          </span>
        </div>
        <GoldDivider className="mt-10 mb-8" />
        <p
          className="text-lg md:text-xl max-w-3xl"
          style={{ color: "#E2E6E9", fontWeight: 400 }}
        >
          Consultoria especializada em estruturação tributária e atração de
          operações para o Espírito Santo
        </p>
      </div>
    </SlideWrapper>
  );
}
