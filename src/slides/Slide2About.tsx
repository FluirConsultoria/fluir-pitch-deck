import { Shield, Truck, Settings } from "lucide-react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";
import vitoriaNoite from "@/assets/vitoria-noite.png";

export function Slide2About() {
  return (
    <SlideWrapper>
      <img
        src={vitoriaNoite}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 70%",
          transform: "scale(1.03)",
          opacity: 0.9,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(4,25,56,0.96) 0%, rgba(4,25,56,0.80) 45%, rgba(4,25,56,0.30) 100%)",
          zIndex: 1,
        }}
      />
      <div className="flex-1 flex flex-col justify-center gap-[clamp(20px,4vh,48px)]" style={{ position: "relative", zIndex: 2 }}>
        <div>
          <SlideHeadline className="text-3xl md:text-4xl max-w-4xl">
            O que fazemos
          </SlideHeadline>

          <div
            className="mt-8 rounded-lg p-4 max-w-4xl"
            style={{ backgroundColor: "#09151A", border: "2px solid #C9A84C" }}
          >
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#F0D78C", fontWeight: 600 }}>
              Nossa Missão
            </div>
            <div className="text-base leading-snug" style={{ color: "#F5F0F0", fontWeight: 600 }}>
              Transformar incentivo fiscal em vantagem competitiva real, da estruturação ao dia a dia da operação.
            </div>
          </div>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed" style={{ color: "#E2E6E9" }}>
            A Fluir é uma consultoria full-service especializada em estruturar operações no Espírito Santo: estrutura,
            processo e resultado, do início ao dia a dia da operação. Cada etapa conduzida com os especialistas certos,
            assegurando o sucesso de cada entrega.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-w-5xl w-full">
          {[
            { icon: <Shield size={36} strokeWidth={1.4} />, label: "Estruturação Tributária" },
            { icon: <Truck size={36} strokeWidth={1.4} />, label: "Consultoria Logística" },
            { icon: <Settings size={36} strokeWidth={1.4} />, label: "Operação Completa" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl px-6 py-12 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: "#09151A", border: "1px solid #194A99" }}
            >
              <div className="mb-4" style={{ color: "#609DFF" }}>
                {icon}
              </div>
              <div className="text-base font-semibold" style={{ color: "#F5F0F0" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}
