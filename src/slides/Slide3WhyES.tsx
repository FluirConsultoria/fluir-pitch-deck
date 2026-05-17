import { SlideWrapper, GoldDivider } from "@/components/deck-primitives";

export function Slide3WhyES() {
  return (
    <SlideWrapper>
      <h1
        className="max-w-5xl leading-tight tracking-tight mt-4"
        style={{
          color: "#F5F0F0",
          fontWeight: 800,
          fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
        }}
      >
        O Espírito Santo transformou incentivo fiscal em vantagem competitiva
        permanente.
      </h1>

      {/* Two program cards on top */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        {[
          {
            label: "COMPETE-ES",
            audience: "E-commerce e Atacado",
            rate: "1,14%",
            suffix: "nas vendas interestaduais",
          },
          {
            label: "INVEST-ES",
            audience: "Importadores",
            rate: "1,085%",
            suffix: "na saída · 100% diferido na entrada",
          },
        ].map((p) => (
          <div
            key={p.label}
            className="rounded-xl p-5 flex items-center gap-5"
            style={{
              backgroundColor: "#09151A",
              border: "1px solid #194A99",
            }}
          >
            <div
              style={{
                color: "#609DFF",
                fontSize: 44,
                fontWeight: 800,
                lineHeight: 1,
                minWidth: 130,
              }}
            >
              {p.rate}
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  color: "#8FB8FF",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  color: "#F5F0F0",
                  fontSize: 15,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                {p.audience}
              </span>
              <span style={{ color: "#E2E6E9", fontSize: 12, marginTop: 4 }}>
                {p.suffix}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison panel */}
      <div className="mt-8 flex-1 flex flex-col min-h-0">
        <div
          style={{
            color: "#E2E6E9",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          A diferença na prática
        </div>

        <div
          className="grid items-stretch gap-4 flex-1"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          {/* Sem ES */}
          <ComparePanel
            title="Sem ES"
            color="#c44545"
            rows={[
              ["ICMS Atacado / E-commerce", "12% a 18%"],
              ["ICMS Importação (entrada)", "Cobrado integral"],
            ]}
            result="Margem comprimida"
          />

          <div
            className="flex items-center justify-center px-2"
            style={{
              color: "#C9A84C",
              fontWeight: 800,
              fontSize: 26,
              letterSpacing: "0.05em",
            }}
          >
            VS
          </div>

          {/* Com ES */}
          <ComparePanel
            title="Com ES"
            color="#2dd47e"
            rows={[
              ["ICMS Atacado / E-commerce", "1,14%"],
              ["ICMS Importação (entrada)", "100% diferido"],
            ]}
            result="Vantagem competitiva real"
          />
        </div>
      </div>

    </SlideWrapper>
  );
}

function ComparePanel({
  title,
  color,
  rows,
  result,
}: {
  title: string;
  color: string;
  rows: [string, string][];
  result: string;
}) {
  return (
    <div
      className="rounded-lg p-5 flex flex-col"
      style={{
        backgroundColor: "#09151A",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        style={{
          color,
          fontSize: 13,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 14,
        }}
      >
        {title}
      </div>
      <div className="flex flex-col gap-3 flex-1">
        {rows.map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                color: "#8FB8FF",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {k}
            </div>
            <div
              style={{
                color: "#F5F0F0",
                fontSize: 16,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-4 pt-3"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color,
          fontSize: 13,
          fontWeight: 700,
          fontStyle: "italic",
        }}
      >
        {result}
      </div>
    </div>
  );
}
