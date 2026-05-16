import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/Deck";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Fluir Consultoria — Pitch Institucional" },
      {
        name: "description",
        content:
          "Consultoria especializada em estruturação tributária e atração de operações para o Espírito Santo.",
      },
    ],
  }),
});

function Index() {
  return <Deck />;
}
