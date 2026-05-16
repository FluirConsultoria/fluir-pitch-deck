import logo from "@/assets/fluir-logo.png";

interface Props {
  size?: number;
  className?: string;
}

export function FluirLogo({ size = 40, className }: Props) {
  return (
    <img
      src={logo}
      alt="Fluir Consultoria"
      className={className}
      style={{
        height: size,
        width: "auto",
        objectFit: "contain",
        filter: "brightness(0) invert(1)",
      }}
    />
  );
}
