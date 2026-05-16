import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slide1Cover } from "@/slides/Slide1Cover";
import { Slide2About } from "@/slides/Slide2About";
import { Slide3WhyES } from "@/slides/Slide3WhyES";
import { Slide4Scale } from "@/slides/Slide4Scale";
import { Slide5Legal } from "@/slides/Slide5Legal";
import { Slide6Brands } from "@/slides/Slide6Brands";
import { Slide7Pipeline } from "@/slides/Slide7Pipeline";
import { Slide8CTA } from "@/slides/Slide8CTA";

const slides = [
  Slide1Cover,
  Slide2About,
  Slide3WhyES,
  Slide4Scale,
  Slide5Legal,
  Slide6Brands,
  Slide7Pipeline,
  Slide8CTA,
];

export function Deck() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: number) => {
    if (next < 0 || next >= slides.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const Current = slides[index];

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{ backgroundColor: "#020D1F" }}
      onClick={(e) => {
        // Don't advance when clicking buttons
        const t = e.target as HTMLElement;
        if (t.closest("button")) return;
        go(index + 1);
      }}
    >
      {/* 16:9 stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative shadow-2xl"
          style={{
            aspectRatio: "16 / 9",
            width: "min(100vw, calc(100vh * 16 / 9))",
            height: "min(100vh, calc(100vw * 9 / 16))",
          }}
        >
          <div
            key={index}
            className="absolute inset-0"
            style={{
              animation: `slideIn-${direction === 1 ? "right" : "left"} 0.45s ease-out`,
            }}
          >
            <Current />
          </div>
        </div>
      </div>

      {/* Nav controls */}
      <button
        onClick={() => go(index - 1)}
        disabled={index === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-opacity disabled:opacity-20 hover:opacity-100 opacity-60"
        style={{ backgroundColor: "rgba(9,21,26,0.7)", color: "#F5F0F0" }}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => go(index + 1)}
        disabled={index === slides.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-opacity disabled:opacity-20 hover:opacity-100 opacity-60"
        style={{ backgroundColor: "rgba(9,21,26,0.7)", color: "#F5F0F0" }}
        aria-label="Próximo slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide counter */}
      <div
        className="absolute bottom-6 right-8 text-sm font-mono"
        style={{ color: "#8FB8FF", fontWeight: 500 }}
      >
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      <style>{`
        @keyframes slideIn-right {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideIn-left {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
