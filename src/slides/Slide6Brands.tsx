import { useState } from "react";
import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";
import boticario from "@/assets/brands/boticario.png";
import adcos from "@/assets/brands/adcos.png";
import principia from "@/assets/brands/principia.png";
import amend from "@/assets/brands/amend.png";
import lola from "@/assets/brands/lola.png";
import revlon from "@/assets/brands/revlon.png";
import widicare from "@/assets/brands/widicare.png";
import alfaparf from "@/assets/brands/alfaparf.png";
import jequiti from "@/assets/brands/jequiti.png";
import unilever from "@/assets/brands/unilever.png";
import bioterra from "@/assets/brands/bioterra.png";
import arvensis from "@/assets/brands/arvensis.png";

const brands: { name: string; logo: string }[] = [
  { name: "O Boticário", logo: boticario },
  { name: "Adcos", logo: adcos },
  { name: "Princípia", logo: principia },
  { name: "Amend", logo: amend },
  { name: "Lola", logo: lola },
  { name: "Revlon", logo: revlon },
  { name: "Widi Care", logo: widicare },
  { name: "Alfaparf", logo: alfaparf },
  { name: "Jequiti", logo: jequiti },
  { name: "Unilever", logo: unilever },
  { name: "Bioterra", logo: bioterra },
  { name: "Arvensis", logo: arvensis },
];

function BrandCard({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="rounded-lg flex items-center justify-center text-center transition-all duration-200 cursor-default px-6 py-5"
      style={{
        backgroundColor: "#09151A",
        border: "1px solid #194A99",
        minHeight: 130,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C9A84C")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#194A99")}
    >
      {failed ? (
        <div
          className="text-2xl tracking-wide"
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
            maxHeight: 80,
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
        Marcas do setor que já operam com o incentivo.
      </SlideHeadline>

      <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-6 mt-8 max-w-6xl mx-auto w-full content-center">
        {brands.map((b) => (
          <BrandCard key={b.name} name={b.name} logo={b.logo} />
        ))}
      </div>
    </SlideWrapper>
  );
}
