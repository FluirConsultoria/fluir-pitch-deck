import { Shield, Calendar, TrendingUp } from "lucide-react";
import {
  SlideWrapper,
  SlideHeadline,
  MetricCard,
  LegalFooter,
} from "@/components/deck-primitives";

export function Slide5Legal() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-4xl md:text-5xl max-w-5xl">
        Base legal consolidada. Incentivos convalidados e prorrogados até 2032.
      </SlideHeadline>
      <p
        className="mt-4 text-base max-w-3xl"
        style={{ color: "#E2E6E9", fontWeight: 500 }}
      >
        Convalidados via LC 160/2017 e Convênio ICMS 190/2017 do CONFAZ
      </p>

      <div className="flex-1 grid grid-cols-3 gap-8 items-center max-w-6xl mx-auto w-full px-8">
        <MetricCard
          icon={<Shield size={56} strokeWidth={1.5} />}
          title="Convalidado no CONFAZ"
          goldBorder
        />
        <MetricCard
          icon={<Calendar size={56} strokeWidth={1.5} />}
          title="Válido até 2032"
          goldBorder
        />
        <MetricCard
          icon={<TrendingUp size={56} strokeWidth={1.5} />}
          title="Previsibilidade para o investidor"
          goldBorder
        />
      </div>

      <LegalFooter>
        Base legal: LC 160/2017 · Convênio ICMS 190/2017 · LC 186/2021 ·
        Legislação estadual ES
      </LegalFooter>
    </SlideWrapper>
  );
}
