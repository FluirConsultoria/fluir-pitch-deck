import pptxgen from "pptxgenjs";

const W = 10;
const H = 5.625;
const PX = 0.55;
const PT = 0.95;
const PB = 0.4;
const CW = W - PX * 2;

const BG      = "041938";
const BG_CARD = "09151A";
const BLUE    = "609DFF";
const GOLD    = "C9A84C";
const GOLD_L  = "F0D78C";
const TEXT    = "F5F0F0";
const TEXT_S  = "E2E6E9";
const BORDER  = "194A99";
const BLUE_L  = "8FB8FF";
const RED     = "c44545";
const GREEN   = "2dd47e";

type Slide = pptxgen.Slide;

function logo(s: Slide) {
  s.addText([
    { text: "FLU", options: { color: TEXT } },
    { text: "I",   options: { color: BLUE } },
    { text: "R",   options: { color: TEXT } },
  ], { x: PX, y: 0.15, w: 1.5, h: 0.35, fontSize: 16, bold: true, charSpacing: 3 });
}

function card(s: Slide, x: number, y: number, w: number, h: number, borderColor = BORDER) {
  s.addShape("roundRect" as pptxgen.ShapeType, {
    x, y, w, h,
    fill: { color: BG_CARD },
    line: { color: borderColor, width: 0.75 },
    rectRadius: 0.08,
  });
}

export async function exportToPptx() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";

  // ── Slide 1: Cover ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    s.addText("FLUIR", { x: PX, y: 0.15, w: 1.5, h: 0.35, fontSize: 16, bold: true, color: TEXT, charSpacing: 3 });
    s.addShape("rect" as pptxgen.ShapeType, {
      x: W / 2 - 0.4, y: 1.55, w: 0.8, h: 0,
      line: { color: GOLD, width: 1.5 },
    });
    s.addText("Conectamos Oportunidades.\nImpulsionamos o Espírito Santo.", {
      x: PX, y: 1.75, w: CW, h: 1.1,
      fontSize: 30, bold: true, color: TEXT, align: "center", lineSpacingMultiple: 1.25,
    });
    s.addText("Consultoria especializada em estruturação tributária e atração de operações para o Espírito Santo", {
      x: PX + 0.5, y: 3.0, w: CW - 1, h: 0.55,
      fontSize: 13, color: TEXT_S, align: "center",
    });
  }

  // ── Slide 2: About ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("Você provavelmente está pagando mais ICMS do que precisa.", {
      x: PX, y: PT, w: CW, h: 0.5,
      fontSize: 19, bold: true, color: TEXT,
    });

    card(s, PX, PT + 0.6, CW, 0.78, GOLD);
    s.addText("NOSSA MISSÃO", {
      x: PX + 0.18, y: PT + 0.66, w: CW, h: 0.2,
      fontSize: 7.5, bold: true, color: GOLD_L, charSpacing: 2,
    });
    s.addText("Transformar incentivo fiscal em vantagem competitiva real — da estruturação ao dia a dia da operação.", {
      x: PX + 0.18, y: PT + 0.85, w: CW - 0.3, h: 0.4,
      fontSize: 12, bold: true, color: TEXT,
    });

    s.addText("A Fluir é uma consultoria full-service especializada em estruturar operações no Espírito Santo — o estado com os incentivos fiscais mais competitivos do Brasil para atacado, e-commerce e importação. Não vendemos consultoria. Entregamos a operação funcionando, do incentivo aprovado à apuração mensal.", {
      x: PX, y: PT + 1.5, w: CW, h: 0.65,
      fontSize: 11, color: TEXT_S,
    });

    const cardW = (CW - 0.2) / 3;
    const cardY = PT + 2.3;
    const cardH = 1.75;
    ["Estruturação\nTributária", "Consultoria\nLogística", "Operação\nCompleta"].forEach((label, i) => {
      const cx = PX + i * (cardW + 0.1);
      card(s, cx, cardY, cardW, cardH);
      s.addText(label, {
        x: cx, y: cardY, w: cardW, h: cardH,
        fontSize: 12, bold: true, color: TEXT, align: "center", valign: "middle",
        lineSpacingMultiple: 1.4,
      });
    });
  }

  // ── Slide 3: Why ES ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("O Espírito Santo transformou incentivo fiscal em vantagem competitiva permanente.", {
      x: PX, y: PT - 0.1, w: CW, h: 0.55,
      fontSize: 16, bold: true, color: TEXT,
    });

    const progW = (CW - 0.15) / 2;
    const progY = PT + 0.55;
    const progH = 0.82;

    // COMPETE-ES
    card(s, PX, progY, progW, progH);
    s.addText("1,14%", { x: PX + 0.15, y: progY + 0.08, w: 1.3, h: 0.6, fontSize: 30, bold: true, color: BLUE, valign: "middle" });
    s.addText("COMPETE-ES", { x: PX + 1.55, y: progY + 0.1, w: progW - 1.7, h: 0.2, fontSize: 8, bold: true, color: BLUE_L, charSpacing: 2 });
    s.addText("E-commerce e Atacado", { x: PX + 1.55, y: progY + 0.3, w: progW - 1.7, h: 0.25, fontSize: 11, bold: true, color: TEXT });
    s.addText("nas vendas interestaduais", { x: PX + 1.55, y: progY + 0.54, w: progW - 1.7, h: 0.2, fontSize: 9, color: TEXT_S });

    // INVEST-ES
    const c2x = PX + progW + 0.15;
    card(s, c2x, progY, progW, progH);
    s.addText("1,085%", { x: c2x + 0.15, y: progY + 0.08, w: 1.4, h: 0.6, fontSize: 26, bold: true, color: BLUE, valign: "middle" });
    s.addText("INVEST-ES", { x: c2x + 1.65, y: progY + 0.1, w: progW - 1.8, h: 0.2, fontSize: 8, bold: true, color: BLUE_L, charSpacing: 2 });
    s.addText("Importadores", { x: c2x + 1.65, y: progY + 0.3, w: progW - 1.8, h: 0.25, fontSize: 11, bold: true, color: TEXT });
    s.addText("na saída · 100% diferido na entrada", { x: c2x + 1.65, y: progY + 0.54, w: progW - 1.8, h: 0.2, fontSize: 9, color: TEXT_S });

    // Comparison
    const cmpY = progY + progH + 0.25;
    s.addText("A DIFERENÇA NA PRÁTICA", { x: PX, y: cmpY, w: CW, h: 0.2, fontSize: 8, bold: true, color: TEXT_S, charSpacing: 2 });

    const panelY = cmpY + 0.25;
    const panelH = 1.35;
    const panelW = (CW - 0.55) / 2;

    card(s, PX, panelY, panelW, panelH, RED);
    s.addText("SEM ES", { x: PX + 0.15, y: panelY + 0.1, w: panelW, h: 0.2, fontSize: 9, bold: true, color: RED, charSpacing: 2 });
    s.addText("ICMS Atacado / E-commerce", { x: PX + 0.15, y: panelY + 0.35, w: panelW - 0.2, h: 0.18, fontSize: 9, color: BLUE_L });
    s.addText("12% a 18%", { x: PX + 0.15, y: panelY + 0.52, w: panelW - 0.2, h: 0.22, fontSize: 13, bold: true, color: TEXT });
    s.addText("ICMS Importação (entrada)", { x: PX + 0.15, y: panelY + 0.78, w: panelW - 0.2, h: 0.18, fontSize: 9, color: BLUE_L });
    s.addText("Cobrado integral", { x: PX + 0.15, y: panelY + 0.95, w: panelW - 0.2, h: 0.22, fontSize: 13, bold: true, color: TEXT });

    s.addText("VS", { x: PX + panelW + 0.02, y: panelY + 0.5, w: 0.5, h: 0.4, fontSize: 18, bold: true, color: GOLD, align: "center" });

    const esX = PX + panelW + 0.55;
    card(s, esX, panelY, panelW, panelH, GREEN);
    s.addText("COM ES", { x: esX + 0.15, y: panelY + 0.1, w: panelW, h: 0.2, fontSize: 9, bold: true, color: GREEN, charSpacing: 2 });
    s.addText("ICMS Atacado / E-commerce", { x: esX + 0.15, y: panelY + 0.35, w: panelW - 0.2, h: 0.18, fontSize: 9, color: BLUE_L });
    s.addText("1,14%", { x: esX + 0.15, y: panelY + 0.52, w: panelW - 0.2, h: 0.22, fontSize: 13, bold: true, color: TEXT });
    s.addText("ICMS Importação (entrada)", { x: esX + 0.15, y: panelY + 0.78, w: panelW - 0.2, h: 0.18, fontSize: 9, color: BLUE_L });
    s.addText("100% diferido", { x: esX + 0.15, y: panelY + 0.95, w: panelW - 0.2, h: 0.22, fontSize: 13, bold: true, color: TEXT });
  }

  // ── Slide 4: Scale ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("+4.600 empresas já operam com incentivo fiscal no ES.", {
      x: PX, y: PT, w: CW, h: 0.65,
      fontSize: 24, bold: true, color: TEXT,
    });

    const barY = PT + 0.9;
    const labelW = 1.5;
    const barX = PX + labelW + 0.1;
    const maxBarW = 5.2;

    s.addText("COMPETE-ES", { x: PX, y: barY + 0.05, w: labelW, h: 0.5, fontSize: 11, bold: true, color: TEXT, valign: "middle" });
    s.addShape("roundRect" as pptxgen.ShapeType, { x: barX, y: barY + 0.05, w: maxBarW, h: 0.5, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.06 });
    s.addText("+4.000 empresas", { x: barX + maxBarW + 0.1, y: barY, w: 2, h: 0.6, fontSize: 14, bold: true, color: TEXT, valign: "middle" });

    const b2Y = barY + 0.9;
    const goldW = maxBarW * (600 / 4000);
    s.addText("INVEST-ES", { x: PX, y: b2Y + 0.05, w: labelW, h: 0.5, fontSize: 11, bold: true, color: TEXT, valign: "middle" });
    s.addShape("roundRect" as pptxgen.ShapeType, { x: barX, y: b2Y + 0.05, w: goldW, h: 0.5, fill: { color: GOLD }, line: { color: GOLD, width: 0 }, rectRadius: 0.06 });
    s.addText("+600 empresas", { x: barX + goldW + 0.1, y: b2Y, w: 2, h: 0.6, fontSize: 14, bold: true, color: TEXT, valign: "middle" });

    const sideX = W - PX - 2;
    card(s, sideX, barY, 1.9, 0.75, RED);
    s.addText("↓  Sem incentivo\nICMS cheio", { x: sideX + 0.15, y: barY + 0.1, w: 1.6, h: 0.55, fontSize: 10, color: RED, lineSpacingMultiple: 1.4 });

    card(s, sideX, b2Y, 1.9, 0.75, GREEN);
    s.addText("↑  Com incentivo\nEconomia real", { x: sideX + 0.15, y: b2Y + 0.1, w: 1.6, h: 0.55, fontSize: 10, color: GREEN, lineSpacingMultiple: 1.4 });
  }

  // ── Slide 5: Legal ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("Base legal consolidada. Incentivos válidos até 2032.", {
      x: PX, y: PT, w: CW, h: 0.48, fontSize: 20, bold: true, color: TEXT,
    });
    s.addText("Convalidados via LC 160/2017 e Convênio ICMS 190/2017 do CONFAZ", {
      x: PX, y: PT + 0.5, w: CW, h: 0.25, fontSize: 10, bold: true, color: TEXT_S,
    });

    const pillarW = 3.5;
    const pillarY = PT + 0.9;
    const pillarH = 0.55;
    const gap = 0.22;
    ["Convalidado no CONFAZ", "Válido até 2032", "Previsibilidade para o investidor"].forEach((label, i) => {
      const py = pillarY + i * (pillarH + gap);
      card(s, PX, py, pillarW, pillarH, GOLD);
      s.addText(label, { x: PX + 0.2, y: py, w: pillarW - 0.3, h: pillarH, fontSize: 12, bold: true, color: TEXT, valign: "middle" });
    });

    const pressX = PX + pillarW + 0.3;
    const pressW = CW - pillarW - 0.3;
    const pressH = 0.95;
    [
      { source: "Gazeta ES", date: "REFORMA TRIBUTÁRIA", headline: 'ES poderá manter incentivos fiscais "até 2032"', srcBg: "D8E4F5", srcTxt: "1e3a8a" },
      { source: "G1",        date: "SENADO FEDERAL",     headline: "Senado aprova projeto que prorroga incentivos fiscais do ICMS até 2032", srcBg: "c4202a", srcTxt: "FFFFFF" },
    ].forEach((pc, i) => {
      const py = pillarY + i * (pressH + 0.2);
      s.addShape("roundRect" as pptxgen.ShapeType, { x: pressX, y: py, w: pressW, h: pressH, fill: { color: "F5F0F0" }, line: { color: GOLD, width: 0.75 }, rectRadius: 0.08 });
      s.addShape("roundRect" as pptxgen.ShapeType, { x: pressX, y: py, w: 0.85, h: pressH, fill: { color: pc.srcBg }, line: { color: pc.srcBg, width: 0 }, rectRadius: 0.08 });
      s.addText(pc.source, { x: pressX, y: py + pressH / 2 - 0.15, w: 0.85, h: 0.3, fontSize: 8.5, bold: true, color: pc.srcTxt, align: "center" });
      s.addText(pc.date, { x: pressX + 0.95, y: py + 0.1, w: pressW - 1.05, h: 0.2, fontSize: 7, bold: true, color: "8B7355" });
      s.addText(pc.headline, { x: pressX + 0.95, y: py + 0.3, w: pressW - 1.05, h: 0.55, fontSize: 10, bold: true, color: "1a1a1a", lineSpacingMultiple: 1.2 });
    });

    s.addText("Base legal: LC 160/2017 · Convênio ICMS 190/2017 · LC 186/2021 · Legislação estadual ES", {
      x: PX, y: H - 0.28, w: CW, h: 0.2, fontSize: 7, color: TEXT_S, align: "center",
    });
  }

  // ── Slide 6: Brands ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("Grandes marcas já operam aqui.", {
      x: PX, y: PT, w: CW, h: 0.4, fontSize: 20, bold: true, color: TEXT,
    });

    const cols = 4;
    const rows = 3;
    const cardW = (CW - 0.3) / cols;
    const cardH = (H - PT - 0.5 - PB) / rows - 0.08;
    const gridY = PT + 0.5;

    ["O Boticário", "Adcos", "Princípia", "Amend", "Lola", "Revlon", "Widi Care", "Alfaparf", "Jequiti", "Unilever", "L'Oréal", "Arvensis"].forEach((name, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = PX + col * (cardW + 0.1);
      const cy = gridY + row * (cardH + 0.08);
      card(s, cx, cy, cardW, cardH);
      s.addText(name, { x: cx, y: cy, w: cardW, h: cardH, fontSize: 11, bold: true, color: TEXT, align: "center", valign: "middle" });
    });
  }

  // ── Slide 7: Pipeline ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    logo(s);

    s.addText("Da decisão à operação: entregamos tudo, de ponta a ponta.", {
      x: PX, y: PT, w: CW, h: 0.55, fontSize: 22, bold: true, color: TEXT,
    });

    const boxY = PT + 0.7;
    const boxH = H - boxY - PB;
    card(s, PX, boxY, CW, boxH);

    const steps = [
      { n: 1, label: "Viabilidade",  desc: "Planilha da operação"  },
      { n: 2, label: "Logística",    desc: "Escolha de parceiros"  },
      { n: 3, label: "Abertura",     desc: "Obrigações societárias"},
      { n: 4, label: "Incentivo",    desc: "Aprovação estadual"    },
      { n: 5, label: "Apuração",     desc: "Mensal no contrato"    },
    ];

    const stepW = CW / steps.length;
    const circleY = boxY + 0.3;

    s.addShape("rect" as pptxgen.ShapeType, {
      x: PX + stepW * 0.5, y: circleY + 0.22, w: CW - stepW, h: 0,
      line: { color: BORDER, width: 1.5 },
    });

    steps.forEach((step, i) => {
      const cx = PX + i * stepW + stepW / 2;
      s.addShape("ellipse" as pptxgen.ShapeType, {
        x: cx - 0.28, y: circleY + 0.07, w: 0.56, h: 0.56,
        fill: { color: BG_CARD }, line: { color: BLUE, width: 1.5 },
      });
      s.addShape("ellipse" as pptxgen.ShapeType, {
        x: cx - 0.05, y: circleY - 0.04, w: 0.22, h: 0.22,
        fill: { color: GOLD }, line: { color: GOLD, width: 0 },
      });
      s.addText(String(step.n), {
        x: cx - 0.05, y: circleY - 0.04, w: 0.22, h: 0.22,
        fontSize: 7, bold: true, color: "041938", align: "center", valign: "middle",
      });
      s.addText(step.label, {
        x: cx - stepW / 2 + 0.05, y: circleY + 0.72, w: stepW - 0.1, h: 0.3,
        fontSize: 11, bold: true, color: TEXT, align: "center",
      });
      s.addText(step.desc, {
        x: cx - stepW / 2 + 0.05, y: circleY + 1.02, w: stepW - 0.1, h: 0.3,
        fontSize: 9, color: TEXT_S, align: "center",
      });
    });
  }

  // ── Slide 8: CTA ──────────────────────────────────────
  {
    const s = pptx.addSlide();
    s.background = { color: BG };
    s.addText("FLUIR", { x: PX, y: 0.15, w: 1.5, h: 0.35, fontSize: 16, bold: true, color: TEXT, charSpacing: 3 });

    s.addShape("rect" as pptxgen.ShapeType, {
      x: W / 2 - 0.4, y: 1.5, w: 0.8, h: 0,
      line: { color: GOLD, width: 1.5 },
    });
    s.addText("Vamos ver se você está deixando ICMS na mesa?", {
      x: PX, y: 1.65, w: CW, h: 1.0,
      fontSize: 26, bold: true, color: GOLD_L, align: "center", lineSpacingMultiple: 1.25,
    });
    s.addText("Em 15 minutos, calculamos juntos o quanto a sua operação pode economizar — agora mesmo.", {
      x: PX + 0.5, y: 2.8, w: CW - 1, h: 0.55,
      fontSize: 13, color: TEXT, align: "center",
    });

    s.addShape("roundRect" as pptxgen.ShapeType, {
      x: W / 2 - 2.1, y: 3.5, w: 4.2, h: 0.62,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 }, rectRadius: 0.1,
    });
    s.addText("→ Abrir Planilha de Pré-Viabilidade", {
      x: W / 2 - 2.1, y: 3.5, w: 4.2, h: 0.62,
      fontSize: 13, bold: true, color: "041938", align: "center", valign: "middle",
    });

    s.addText("contato@fluirconsultoria.com.br  ·  Vitória — Espírito Santo", {
      x: PX, y: 4.35, w: CW, h: 0.25, fontSize: 10, color: TEXT_S, align: "center",
    });
  }

  await pptx.writeFile({ fileName: "Fluir-Pitch-Deck.pptx" });
}
