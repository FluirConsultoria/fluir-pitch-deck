import { Shield, Truck, Settings } from "lucide-react";
import { SlideWrapper, SlideHeadline, MetricCard } from "@/components/deck-primitives";

export function Slide2About() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-xl md:text-2xl max-w-4xl">
        Você provavelmente está pagando mais ICMS do que precisa.
      </SlideHeadline>
      <div
        className="mt-3 rounded-lg p-4 max-w-4xl"
        style={{
          backgroundColor: "#09151A",
          border: "2px solid #C9A84C",
        }}
      >
        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#F0D78C", fontWeight: 600 }}>
          Nossa Missão
        </div>
        <div className="text-base md:text-lg leading-snug" style={{ color: "#F5F0F0", fontWeight: 600 }}>
          Transformar incentivo fiscal em vantagem competitiva real — da estruturação ao dia a dia da operação.
        </div>
      </div>
      <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: "#E2E6E9", fontWeight: 400 }}>
        A Fluir é uma consultoria full-service especializada em estruturar operações no Espírito Santo — o estado com os
        incentivos fiscais mais competitivos do Brasil para atacado, e-commerce e importação. Não vendemos consultoria.
        Entregamos a operação funcionando, do incentivo aprovado à apuração mensal.
      </p>
      <div className="grid grid-cols-3 gap-3 mt-4 max-w-5xl">
        <MetricCard icon={<Shield size={22} strokeWidth={1.6} />} title="Estruturação Tributária" />
        <MetricCard icon={<Truck size={22} strokeWidth={1.6} />} title="Consultoria Logística" />
        <MetricCard icon={<Settings size={22} strokeWidth={1.6} />} title="Operação Completa" />
      </div>
    </SlideWrapper>
  );
}
