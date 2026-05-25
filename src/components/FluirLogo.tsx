interface Props {
  size?: number;
  className?: string;
}

export function FluirLogo({ size = 40, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      {/* F letterform */}
      <path
        d="M10 10 L10 90 L22 90 L22 55 L52 55 L52 46 L22 46 L22 19 L60 19 L60 10 Z"
        fill="white"
      />
      {/* Bar chart */}
      <rect x="48" y="73" width="10" height="17" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="61" y="60" width="10" height="30" rx="1" fill="white" fillOpacity="0.5" />
      <rect x="74" y="47" width="10" height="43" rx="1" fill="white" fillOpacity="0.5" />
      {/* Curved arrow */}
      <path d="M 8 92 C 28 68 60 40 86 12" stroke="#8FB8FF" strokeWidth="5" strokeLinecap="round" />
      <path d="M 86 12 L 73 16 M 86 12 L 82 25" stroke="#8FB8FF" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
