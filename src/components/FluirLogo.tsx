interface Props {
  size?: number;
  className?: string;
}

export function FluirLogo({ size = 80, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bold F */}
      <path
        d="M18 18 H62 V32 H34 V52 H56 V66 H34 V102 H18 Z"
        fill="#1a2a4d"
      />
      {/* Ascending bar chart */}
      <rect x="68" y="78" width="8" height="24" fill="#6B7B8C" />
      <rect x="80" y="66" width="8" height="36" fill="#6B7B8C" />
      <rect x="92" y="50" width="8" height="52" fill="#6B7B8C" />
      {/* Curved upward arrow */}
      <path
        d="M68 60 Q86 28 104 38"
        stroke="#609DFF"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M104 38 L98 34 M104 38 L100 46"
        stroke="#609DFF"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
