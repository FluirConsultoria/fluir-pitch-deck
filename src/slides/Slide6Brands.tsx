import { SlideWrapper, SlideHeadline } from "@/components/deck-primitives";

const brands = [
  "O Boticário", "Adcos", "Princípia", "Amend",
  "Lola", "Revlon", "Widi Care", "Alfaparf",
  "Jequiti", "Unilever", "L'Oréal", "Arvensis",
];

export function Slide6Brands() {
  return (
    <SlideWrapper>
      <SlideHeadline className="text-4xl md:text-5xl max-w-5xl">
        As maiores marcas do Brasil já operam aqui.
        <br />
        Seu concorrente provavelmente também.
      </SlideHeadline>

      <div className="flex-1 grid grid-cols-4 grid-rows-3 gap-5 mt-10 max-w-6xl mx-auto w-full">
        {brands.map((b) => (
          <div
            key={b}
            className="rounded-lg flex items-center justify-center text-center transition-all duration-200 cursor-default"
            style={{
              backgroundColor: "#09151A",
              border: "1px solid #194A99",
              minHeight: 90,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#C9A84C")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#194A99")
            }
          >
            <div
              className="text-xl tracking-wide px-3"
              style={{ color: "#F5F0F0", fontWeight: 700 }}
            >
              {b}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
