import { useState } from "react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

const brands: { name: string; logo: string }[] = [
  { name: "O Boticário", logo: "https://logo.clearbit.com/grupoboticario.com.br" },
  { name: "Adcos", logo: "https://logo.clearbit.com/adcos.com.br" },
  { name: "Princípia", logo: "https://logo.clearbit.com/principia.com.br" },
  { name: "Amend", logo: "https://logo.clearbit.com/amend.com.br" },
  { name: "Lola", logo: "https://logo.clearbit.com/lolacosmetics.com.br" },
  { name: "Revlon", logo: "https://logo.clearbit.com/revlon.com" },
  { name: "Widi Care", logo: "https://logo.clearbit.com/widicare.com.br" },
  { name: "Alfaparf", logo: "https://logo.clearbit.com/alfaparf.com.br" },
  { name: "Jequiti", logo: "https://logo.clearbit.com/jequiti.com.br" },
  { name: "Unilever", logo: "https://logo.clearbit.com/unilever.com" },
  { name: "L'Oréal", logo: "https://logo.clearbit.com/loreal.com" },
  { name: "Arvensis", logo: "https://logo.clearbit.com/arvensis.com.br" },
];

function BrandCard({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="rounded-lg flex items-center justify-center text-center transition-all duration-200 cursor-default px-4"
      style={{
        backgroundColor: "#09151A",
        border: "1px solid #194A99",
        minHeight: 90,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#194A99")}
    >
      {failed ? (
        <div
          className="text-xl tracking-wide"
          style={{ color: "#F5F0F0", fontWeight: 700 }}
        >
          {name}
        </div>
      ) : (
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          style={{
            maxHeight: 48,
            maxWidth: "100%",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
      )}
    </div>
  );
}

export function Slide6Brands() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-2xl md:text-3xl max-w-4xl">
        Grandes marcas já operam aqui.
      </SlideHeadline>

      <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-5 mt-10 max-w-6xl mx-auto w-full">
        {brands.map((b) => (
          <BrandCard key={b.name} name={b.name} logo={b.logo} />
        ))}
      </div>
    </SlideWrapper>
  );
}
