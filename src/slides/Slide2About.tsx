import { Shield, Truck, Settings } from "lucide-react";
import { SlideHeader, SlideHeadline } from "@/components/deck-primitives";
import vitoriaPorto from "@/assets/vitoria-porto.png";

export function Slide2About() {
  return (
    <div className="relative w-full h-full flex overflow-hidden" style={{ backgroundColor: "#041938" }}>
      <SlideHeader />

      {/* Left column — content */}
      <div
        style={{
          width: "58%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px 48px 48px 64px",
          gap: 32,
        }}
      >
        <div>
          <SlideHeadline className="text-6xl">Quem Somos</SlideHeadline>
          <p className="mt-6 text-xl leading-relaxed" style={{ color: "#E2E6E9" }}>
            A Fluir é uma consultoria full-service especializada em atrair distribuidores e importadores para o Espírito Santo.
            Nossa missão é transformar incentivo fiscal em vantagem competitiva real, cuidando de todo o processo,
            da estruturação à operação plena. Cada etapa com os especialistas certos, assegurando o sucesso de cada entrega.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {[
            "Equipe dedicada à empresa do início ao fim",
            "Acompanhamento contínuo durante o contrato",
            "Especialistas em tributário, logística e jurídico",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span style={{ color: "#609DFF", fontWeight: 700, fontSize: 20 }}>✓</span>
              <span style={{ color: "#E2E6E9", fontSize: 19 }}>{item}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Shield size={32} strokeWidth={1.4} />, label: "Estruturação Tributária" },
            { icon: <Truck size={32} strokeWidth={1.4} />, label: "Consultoria Logística" },
            { icon: <Settings size={32} strokeWidth={1.4} />, label: "Operação Habilitada" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl px-4 py-8 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: "#09151A", border: "1px solid #194A99" }}
            >
              <div className="mb-3" style={{ color: "#609DFF" }}>{icon}</div>
              <div className="text-xl font-semibold" style={{ color: "#F5F0F0" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column — image */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src={vitoriaPorto}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
        {/* Blend gradient — left fade into text column */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 200,
            height: "100%",
            background: "linear-gradient(to right, #041938 0%, rgba(4,25,56,0.80) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 80,
            background: "linear-gradient(to top, #041938, transparent)",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
