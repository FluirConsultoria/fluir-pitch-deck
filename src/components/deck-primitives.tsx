import { ReactNode } from "react";
import { FluirLogo } from "./FluirLogo";

export function SlideHeader() {
  return (
    <div className="absolute z-20 flex items-center gap-3" style={{ top: 16, left: 32 }}>
      <FluirLogo size={52} />
      <span
        style={{
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: "0.15em",
          color: "#F5F0F0",
          lineHeight: 1,
        }}
      >
        FLU<span style={{ color: "#609DFF" }}>I</span>R
      </span>
    </div>
  );
}

export function SlideWrapper({
  children,
  showLogo = true,
  gradient = false,
  className = "",
}: {
  children: ReactNode;
  showLogo?: boolean;
  gradient?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden px-16 pb-8 flex flex-col ${className}`}
      style={{
        paddingTop: gradient ? 48 : showLogo ? 96 : 48,
        ...(gradient
          ? {
              background: "linear-gradient(180deg, #0A2A5C 0%, #020D1F 100%)",
            }
          : { backgroundColor: "#041938" }),
      }}
    >
      {showLogo && <SlideHeader />}
      {children}
    </div>
  );
}

export function SlideHeadline({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={`font-extrabold tracking-tight leading-tight ${className}`}
      style={{ color: "#F5F0F0", fontWeight: 800 }}
    >
      {children}
    </h1>
  );
}

export function MetricCard({
  icon,
  title,
  subtitle,
  goldBorder = false,
  className = "",
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  goldBorder?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl p-5 flex flex-col items-center text-center transition-transform hover:scale-[1.02] ${className}`}
      style={{
        backgroundColor: "#09151A",
        border: `1px solid ${goldBorder ? "#C9A84C" : "#194A99"}`,
      }}
    >
      {icon && (
        <div className="mb-3 flex items-center justify-center" style={{ color: goldBorder ? "#F0D78C" : "#609DFF" }}>
          {icon}
        </div>
      )}
      <div className="font-semibold text-base" style={{ color: "#F5F0F0", fontWeight: 600 }}>
        {title}
      </div>
      {subtitle && (
        <div className="text-sm mt-1" style={{ color: "#E2E6E9" }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function ProgramCard({
  program,
  audience,
  rate,
  rateSuffix,
  note,
  noteColor = "#E2E6E9",
}: {
  program: string;
  audience: string;
  rate: string;
  rateSuffix: string;
  note?: string;
  noteColor?: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col"
      style={{
        backgroundColor: "#09151A",
        border: "1px solid #194A99",
      }}
    >
      <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8FB8FF", fontWeight: 600 }}>
        {program}
      </div>
      <div className="text-base mb-3" style={{ color: "#F5F0F0", fontWeight: 600 }}>
        {audience}
      </div>
      <div className="font-extrabold leading-none" style={{ color: "#609DFF", fontSize: "3rem", fontWeight: 800 }}>
        {rate}
      </div>
      <div className="text-sm mt-2" style={{ color: "#E2E6E9" }}>
        {rateSuffix}
      </div>
      {note && (
        <div className="text-xs mt-2" style={{ color: noteColor }}>
          {note}
        </div>
      )}
    </div>
  );
}

export function PipelineStep({
  number,
  label,
  description,
  highlight = false,
}: {
  number: number;
  label: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center w-44">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-lg mb-2"
        style={{
          backgroundColor: highlight ? "#C9A84C" : "#09151A",
          color: highlight ? "#041938" : "#C9A84C",
          border: `2px solid #C9A84C`,
          fontWeight: 800,
        }}
      >
        {number}
      </div>
      <div className="text-sm mb-1" style={{ color: "#F5F0F0", fontWeight: 600 }}>
        {label}
      </div>
      <div className="text-xs" style={{ color: "#E2E6E9" }}>
        {description}
      </div>
    </div>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-24 mx-auto ${className}`} style={{ backgroundColor: "#C9A84C" }} />;
}

export function LegalFooter({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
      style={{ color: "#E2E6E9", fontSize: "10px", fontWeight: 400 }}
    >
      {children}
    </div>
  );
}
