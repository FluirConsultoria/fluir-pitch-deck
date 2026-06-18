# Design: Salvar Estudo (PDF)

## Contexto

O `fluir_estudo_viabilidade_ES.html` é uma página estática hospedada no Cloudflare Pages, sem servidor ou banco de dados por trás, e sem nenhuma dependência externa (CDN). O usuário precisa de uma forma de gerar um arquivo para enviar ao cliente com o estudo completo, incluindo os dois cenários (Primavera e Fim da Primavera) lado a lado — hoje a tela só mostra um cenário por vez, controlado pelas abas.

## Objetivo

Adicionar um botão "Salvar Estudo (PDF)" que gera um PDF com o relatório completo (tabela de cálculo, waterfall, paridade, KPIs e gauges) duplicado para os dois cenários, mais a projeção de 24 meses (compartilhada, já que ela já combina os dois regimes ao longo do tempo). Sem dependências externas — usa o `window.print()` nativo do navegador.

## Decisão de arquitetura

As 5 funções de renderização do relatório (`renderCalcTable`, `renderWaterfall`, `renderParity`, `renderKpis`, `renderGauges`) hoje escrevem sempre nos mesmos IDs fixos (`calc-table-body`, `waterfall-svg` etc.), pois a tela mostra só um cenário por vez.

Para o PDF mostrar os dois cenários completos sem duplicar a lógica de cálculo/desenho (o que criaria dois lugares para manter sincronizados), essas 5 funções passam a aceitar um **parâmetro opcional `suffix`** (default `''`), usado para compor o ID de destino (`'calc-table-body' + suffix`). As chamadas existentes na tela normal não passam esse parâmetro — comportamento 100% idêntico ao atual.

Um bloco de HTML novo e oculto (`#print-report`) contém duas cópias completas da estrutura visual das 5 seções, com os IDs sufixados `-print-primavera` e `-print-fim`. Na hora de salvar, uma nova função `salvarEstudo()` chama as 5 funções de renderização duas vezes (uma vez por cenário, usando o sufixo correspondente) e então aciona `window.print()`.

**Nada na lógica fiscal, no `calcScenario()`, ou na visualização normal da tela é alterado.** Esta é uma mudança puramente aditiva.

## Mudanças estruturais no HTML

1. O painel "Dados de Entrada" ganha `id="input-panel"`.
2. As 5 seções existentes (painel "SCENARIO + CALC TABLE", "WATERFALL", "PARITY", "KPI CARDS", "GAUGES") passam a ficar envolvidas por um wrapper `<div id="screen-report">...</div>`, sem alterar o conteúdo interno de cada uma.
3. Um botão novo "Salvar Estudo (PDF)" é adicionado no `panel-header` do painel "Dados de Entrada", ao lado do botão "Limpar dados" existente: `<button class="btn btn-gold" onclick="salvarEstudo()">Salvar Estudo (PDF)</button>`.
4. Um novo bloco `<div id="print-report" style="display:none">` é adicionado depois do `#screen-report` (antes da seção "PROJECTION 24M"), contendo duas cópias completas da estrutura das 5 seções:
   - Cópia 1: título `<h2>Cenário: Primavera (SP 12%)</h2>` seguido das 5 seções com IDs sufixados `-print-primavera` (ex: `calc-table-body-print-primavera`, `waterfall-svg-print-primavera`, `par-sp-preco-print-primavera`, `kpi-mes-print-primavera`, `gauge-liquido-fg-print-primavera` etc. — todo ID dinâmico das 5 seções leva o sufixo).
   - Cópia 2: título `<h2>Cenário: Fim da Primavera (mix de produtos)</h2>` seguido das mesmas 5 seções com IDs sufixados `-print-fim`.
   - Não há tab-bar (botões de aba) nas cópias do print — cada cópia mostra direto a tabela do seu cenário, sem necessidade de clique (que não funciona em PDF).

## Mudanças no JavaScript

**As 5 funções existentes ganham parâmetro `suffix = ''`:**

```js
function renderCalcTable(r, scenario, inp, suffix = '') {
  // ...
  const tbody = document.getElementById('calc-table-body' + suffix);
  // ...
}

function renderWaterfall(r, suffix = '') {
  const svg = document.getElementById('waterfall-svg' + suffix);
  // ...
}

function renderParity(r, inp, suffix = '') {
  // todos os document.getElementById('par-sp-preco'), etc. recebem + suffix
  // document.getElementById('parity-result' + suffix)
}

function renderKpis(r, suffix = '') {
  document.getElementById('kpi-mes' + suffix).textContent = fmtBRL(r.beneficioMes);
  document.getElementById('kpi-ano' + suffix).textContent = fmtBRL(r.beneficioAno);
  const card = document.getElementById('kpi-veredicto-card' + suffix);
  const veredicto = document.getElementById('kpi-veredicto' + suffix);
  // resto igual
}

function renderGauges(r, suffix = '') {
  if (!r.economiaBruta) {
    setGauge('gauge-liquido-fg' + suffix, 'gauge-liquido-pct' + suffix, 'gauge-liquido-texto' + suffix, 0);
    setGauge('gauge-desconto-fg' + suffix, 'gauge-desconto-pct' + suffix, 'gauge-desconto-texto' + suffix, 0);
    return;
  }
  const pctLiquido = (r.beneficioMes / r.economiaBruta) * 100;
  const pctDesconto = (r.descontoCliente / r.economiaBruta) * 100;
  setGauge('gauge-liquido-fg' + suffix, 'gauge-liquido-pct' + suffix, 'gauge-liquido-texto' + suffix, pctLiquido);
  setGauge('gauge-desconto-fg' + suffix, 'gauge-desconto-pct' + suffix, 'gauge-desconto-texto' + suffix, pctDesconto);
}
```

`setGauge(fgId, pctId, textId, percent)` não muda — já recebe os IDs como string, então passar IDs já sufixados funciona sem alteração nessa função.

**Todas as chamadas existentes em `render()` continuam sem o 4º/5º argumento** (usam o default `''`), preservando o comportamento atual da tela.

**Nova função `salvarEstudo()`:**

```js
function salvarEstudo() {
  const inp = getInputs();
  const rPrimavera = calcScenario('primavera', inp);
  const rFim = calcScenario('fim', inp);

  renderCalcTable(rPrimavera, 'primavera', inp, '-print-primavera');
  renderWaterfall(rPrimavera, '-print-primavera');
  renderParity(rPrimavera, inp, '-print-primavera');
  renderKpis(rPrimavera, '-print-primavera');
  renderGauges(rPrimavera, '-print-primavera');

  renderCalcTable(rFim, 'fim', inp, '-print-fim');
  renderWaterfall(rFim, '-print-fim');
  renderParity(rFim, inp, '-print-fim');
  renderKpis(rFim, '-print-fim');
  renderGauges(rFim, '-print-fim');

  document.title = `Estudo de Viabilidade Fiscal - ${inp.empresa || 'Prospect'} - ${inp.baseSped || ''}`;
  window.print();
}
```

## Mudanças no CSS

```css
#print-report { display: none; }

@media print {
  #input-panel, #screen-report { display: none; }
  #print-report { display: block; }
  body { background: #fff; }
}
```

A projeção de 24 meses, a nota da reforma tributária e o rodapé não fazem parte de `#screen-report` nem de `#print-report` — continuam visíveis tanto na tela quanto no PDF, sem nenhuma duplicação (a projeção já combina os dois regimes ao longo do tempo).

## Fora de escopo

- Nenhuma fórmula fiscal (`calcScenario`) é alterada.
- O comportamento da tela normal (abas, um cenário por vez) não muda.
- Não há geração de PDF via biblioteca externa (jsPDF, html2canvas) — só `window.print()` nativo, mantendo o arquivo sem dependências.
- Não há campo de "total de frete" nem qualquer relação com a feature de Frete em Trechos (spec separado `2026-06-18-frete-trechos-design.md`) — são specs e planos independentes.
