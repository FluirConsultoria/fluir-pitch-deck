import { Shield, Truck, Settings } from "lucide-react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

export function Slide2About() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-xl md:text-2xl max-w-4xl">
        Você provavelmente está pagando mais ICMS do que precisa.
      </SlideHeadline>
      <div
        className="mt-3 rounded-lg p-4 max-w-4xl"
        style={{ backgroundColor: "#09151A", border: "2px solid #C9A84C" }}
      >
        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#F0D78C", fontWeight: 600 }}>
          Nossa Missão
        </div>
        <div className="text-base leading-snug" style={{ color: "#F5F0F0", fontWeight: 600 }}>
          Transformar incentivo fiscal em vantagem competitiva real — da estruturação ao dia a dia da operação.
        </div>
      </div>
      <p className="mt-3 max-w-4xl text-lg leading-relaxed" style={{ color: "#E2E6E9" }}>
        A Fluir é uma consultoria full-service especializada em estruturar operações no Espírito Santo — o estado com os
        incentivos fiscais mais competitivos do Brasil para atacado, e-commerce e importação. Não vendemos consultoria.
        Entregamos a operação funcionando, do incentivo aprovado à apuração mensal.
      </p>
      <div className="flex-1 flex items-end pb-16">
        <div className="grid grid-cols-3 gap-4 w-full max-w-5xl">
          {[
            { icon: <Shield size={32} strokeWidth={1.4} />, label: "Estruturação Tributária" },
            { icon: <Truck size={32} strokeWidth={1.4} />, label: "Consultoria Logística" },
            { icon: <Settings size={32} strokeWidth={1.4} />, label: "Operação Completa" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="rounded-xl py-10 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: "#09151A", border: "1px solid #194A99" }}
            >
              <div className="mb-3" style={{ color: "#609DFF" }}>
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
