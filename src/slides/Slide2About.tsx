import { Shield, Truck, Settings } from "lucide-react";
import { SlideWrapper, SlideHeadline, MetricCard } from "@/components/deck-primitives";

export function Slide2About() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-2xl md:text-3xl max-w-4xl">
        Você provavelmente está pagando mais ICMS do que precisa.
      </SlideHeadline>

      <div
        className="mt-5 rounded-xl p-5 max-w-4xl"
        style={{
          backgroundColor: "#09151A",
          border: "2px solid #C9A84C",
        }}
      >
        <div
          className="text-[11px] uppercase tracking-widest mb-1"
          style={{ color: "#F0D78C", fontWeight: 600 }}
        >
          Nossa Missão
        </div>
        <div
          className="text-base md:text-lg leading-snug"
          style={{ color: "#F5F0F0", fontWeight: 600 }}
        >
          Transformar incentivo fiscal em vantagem competitiva real — da
          estruturação ao dia a dia da operação.
        </div>
      </div>

      <p
        className="mt-4 max-w-4xl text-[13px] leading-relaxed"
        style={{ color: "#E2E6E9", fontWeight: 400 }}
      >
        A Fluir é uma consultoria full-service especializada em estruturar
        operações no Espírito Santo — o estado com os incentivos fiscais mais
        competitivos do Brasil para atacado, e-commerce e importação. Não
        vendemos consultoria. Entregamos a operação funcionando, do incentivo
        aprovado à apuração mensal.
      </p>

      <div className="grid grid-cols-3 gap-5 mt-auto pt-6 max-w-5xl">
        <MetricCard icon={<Shield size={28} strokeWidth={1.6} />} title="Estruturação Tributária" />
        <MetricCard icon={<Truck size={28} strokeWidth={1.6} />} title="Consultoria Logística" />
        <MetricCard icon={<Settings size={28} strokeWidth={1.6} />} title="Operação Completa" />
      </div>
    </SlideWrapper>
  );
}
