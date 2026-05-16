import logo from "@/assets/fluir-logo.png";

interface Props {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export function FluirLogo({ size = 80, className, showWordmark = true }: Props) {
  if (!showWordmark) {
    return (
      <img
        src={logo}
        alt="Fluir Consultoria"
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  // Wordmark lockup: icon + "FLUIR" serif, with "I" in blue accent
  const fontSize = size * 0.62;

  return (
    <div
      className={`inline-flex items-center ${className ?? ""}`}
      style={{ gap: size * 0.18 }}
    >
      <img
        src={logo}
        alt="Fluir Consultoria"
        style={{ width: size, height: size, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
          fontWeight: 600,
          fontSize,
          letterSpacing: size * 0.025,
          color: "#F5F0F0",
          lineHeight: 1,
        }}
      >
        FLU<span style={{ color: "#609DFF" }}>I</span>R
      </span>
    </div>
  );
}
