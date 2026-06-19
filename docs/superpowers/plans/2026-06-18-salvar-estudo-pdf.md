# Salvar Estudo (PDF) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um botão "Salvar Estudo (PDF)" ao `fluir_estudo_viabilidade_ES.html` que gera, via `window.print()` nativo do navegador, um PDF com o relatório completo (tabela, waterfall, paridade, KPIs, gauges) duplicado para os dois cenários (Primavera e Fim da Primavera), sem alterar nenhuma fórmula fiscal nem o comportamento normal da tela.

**Architecture:** As 5 funções de renderização do relatório (`renderCalcTable`, `renderWaterfall`, `renderParity`, `renderKpis`, `renderGauges`) ganham um parâmetro opcional `suffix` (default `''`) usado para compor o ID de destino. Um bloco HTML oculto (`#print-report`) contém duas cópias completas das 5 seções com IDs sufixados. A função `salvarEstudo()` chama as 5 funções duas vezes (uma por cenário) e aciona `window.print()`. CSS de impressão esconde o painel de inputs e o relatório de tela, mostrando só o bloco de impressão.

**Tech Stack:** HTML, CSS, JavaScript vanilla (sem dependências externas, sem CDN). Node.js apenas para verificação de sintaxe via `node --check` (descartável, não committado).

---

## Referência: spec aprovado

`docs/superpowers/specs/2026-06-18-salvar-estudo-pdf-design.md`

## Referência: estado atual do arquivo (linhas relevantes antes da mudança)

- Painel de inputs (header com botão "Limpar dados"): `public/fluir_estudo_viabilidade_ES.html:349-353`
- 5 seções do relatório de tela (calc table, waterfall, parity, kpi cards, gauges): `public/fluir_estudo_viabilidade_ES.html:466-572`
- Início da seção "PROJECTION 24M": `public/fluir_estudo_viabilidade_ES.html:574`
- `renderCalcTable()`: `public/fluir_estudo_viabilidade_ES.html:679-714`
- `renderWaterfall()`: `public/fluir_estudo_viabilidade_ES.html:716-786`
- `renderParity()`: `public/fluir_estudo_viabilidade_ES.html:788-813`
- `renderKpis()`: `public/fluir_estudo_viabilidade_ES.html:815-827`
- `setGauge()` / `renderGauges()`: `public/fluir_estudo_viabilidade_ES.html:857-880`
- `render()`: `public/fluir_estudo_viabilidade_ES.html:910-922`
- Fim do bloco `<style>`: `public/fluir_estudo_viabilidade_ES.html:326-332`

**Nota para quem executar:** os números de linha podem estar desatualizados (o arquivo já passou por várias edições nesta sessão). Sempre localize pelo **conteúdo exato** mostrado em "Localizar", não pelo número de linha.

---

### Task 1: Adicionar `id="input-panel"` e o botão "Salvar Estudo (PDF)"

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Substituir o cabeçalho do painel de inputs**

Localizar:

```html
  <!-- ===== INPUTS ===== -->
  <div class="panel">
    <div class="panel-header">
      <span>Dados de Entrada</span>
      <button class="btn btn-gold" onclick="clearAll()">Limpar dados</button>
    </div>
```

Substituir por:

```html
  <!-- ===== INPUTS ===== -->
  <div class="panel" id="input-panel">
    <div class="panel-header">
      <span>Dados de Entrada</span>
      <button class="btn btn-gold" onclick="clearAll()">Limpar dados</button>
      <button class="btn btn-gold" onclick="salvarEstudo()">Salvar Estudo (PDF)</button>
    </div>
```

(O botão chama `salvarEstudo()`, que ainda não existe — será criado na Task 9 deste plano. Isso é esperado; o botão só falha se clicado antes da Task 9.)

- [ ] **Step 2: Verificação visual**

Abrir o arquivo no navegador. Confirmar que aparecem 2 botões dourados no cabeçalho "Dados de Entrada": "Limpar dados" e "Salvar Estudo (PDF)".

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: adicionar id input-panel e botao Salvar Estudo (PDF)"
```

---

### Task 2: Envolver as 5 seções de relatório em `#screen-report`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Inserir a abertura do wrapper antes da seção "SCENARIO + CALC TABLE"**

Localizar:

```html
    </div>
  </div>

  <!-- ===== SCENARIO + CALC TABLE ===== -->
  <div class="panel">
    <div class="tab-bar">
```

Substituir por:

```html
    </div>
  </div>

  <div id="screen-report">
  <!-- ===== SCENARIO + CALC TABLE ===== -->
  <div class="panel">
    <div class="tab-bar">
```

- [ ] **Step 2: Inserir o fechamento do wrapper antes da seção "PROJECTION 24M"**

Localizar (final da seção GAUGES, com os 3 `</div>` de fechamento):

```html
      </div>
    </div>
  </div>

  <!-- ===== PROJECTION 24M ===== -->
```

Substituir por:

```html
      </div>
    </div>
  </div>
  </div>

  <!-- ===== PROJECTION 24M ===== -->
```

- [ ] **Step 3: Verificação visual**

Abrir o arquivo no navegador. Confirmar que a tela continua exatamente igual a antes (tabela, waterfall, paridade, KPIs, gauges, projeção de 24 meses, tudo visível e funcionando normalmente) — a única mudança é estrutural (uma `<div>` nova por fora, invisível).

- [ ] **Step 4: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: envolver as 5 secoes de relatorio em wrapper screen-report"
```

---

### Task 3: Refatorar `renderCalcTable()` para aceitar `suffix`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Substituir a função inteira**

Localizar:

```js
function renderCalcTable(r, scenario, inp) {
  const icmsSPLabel = scenario === 'primavera'
    ? 'ICMS SP a pagar (valor auditado SPED)'
    : 'ICMS SP a pagar (projetado: rSP × Faturamento − créd.entrada SP × Compras)';
  const consultoriaLabel = `Consultoria (${fmtPct(inp.consultoriaPct)} da economia, mín. ${fmtBRL(inp.consultoriaMin)})`;

  const deltaLogIsGain = r.deltaLogRS < 0;
  const deltaFreteIsGain = r.deltaFreteRS < 0;
  const deltaLogVal = (deltaLogIsGain ? '+ ' : '− ') + fmtBRL(Math.abs(r.deltaLogRS));
  const deltaFreteVal = (deltaFreteIsGain ? '+ ' : '− ') + fmtBRL(Math.abs(r.deltaFreteRS));

  const rows = [
    ['1', icmsSPLabel, fmtBRL(r.icmsSP), false, false],
    ['', `Alíquota SP blendada: ${fmtPct(r.rSP)}`, '', true, false],
    ['2', 'Desconto de compensação ao cliente', '− ' + fmtBRL(r.descontoCliente), false, true],
    ['3', 'Faturamento ES (Faturamento − Desconto)', fmtBRL(r.faturamentoES), false, false],
    ['4', 'ICMS ES (carga efetiva Compete)', fmtBRL(r.icmsES), false, false],
    ['5', 'Economia bruta de ICMS', fmtBRL(r.economiaBruta), false, false, true],
    ['6', consultoriaLabel, '− ' + fmtBRL(r.consultoria), false, true],
    ['7', 'Δ Logística (R$)', deltaLogVal, false, !deltaLogIsGain, false, false, deltaLogIsGain],
    ['8', 'Δ Frete (R$)', deltaFreteVal, false, !deltaFreteIsGain, false, false, deltaFreteIsGain],
    ['9', 'BENEFÍCIO LÍQUIDO / MÊS', fmtBRL(r.beneficioMes), false, false, false, true],
    ['10', 'Benefício líquido / ano', fmtBRL(r.beneficioAno), false, false]
  ];
  const tbody = document.getElementById('calc-table-body');
  tbody.innerHTML = rows.map(row => {
    const [n, label, val, isSub, isNeg, isIcms, isFinal, isPos] = row;
    let cls = '';
    if (isSub) cls = 'sub';
    else if (isFinal) cls = 'final-row';
    else if (isIcms) cls = 'icms-row';
    else if (isPos) cls = 'pos-row';
    else if (isNeg) cls = 'neg-row';
    return `<tr class="${cls}"><td>${n ? n + '. ' : ''}${label}</td><td class="right">${val}</td></tr>`;
  }).join('');
}
```

Substituir por (única mudança: 4º parâmetro `suffix = ''` e `getElementById('calc-table-body' + suffix)`):

```js
function renderCalcTable(r, scenario, inp, suffix = '') {
  const icmsSPLabel = scenario === 'primavera'
    ? 'ICMS SP a pagar (valor auditado SPED)'
    : 'ICMS SP a pagar (projetado: rSP × Faturamento − créd.entrada SP × Compras)';
  const consultoriaLabel = `Consultoria (${fmtPct(inp.consultoriaPct)} da economia, mín. ${fmtBRL(inp.consultoriaMin)})`;

  const deltaLogIsGain = r.deltaLogRS < 0;
  const deltaFreteIsGain = r.deltaFreteRS < 0;
  const deltaLogVal = (deltaLogIsGain ? '+ ' : '− ') + fmtBRL(Math.abs(r.deltaLogRS));
  const deltaFreteVal = (deltaFreteIsGain ? '+ ' : '− ') + fmtBRL(Math.abs(r.deltaFreteRS));

  const rows = [
    ['1', icmsSPLabel, fmtBRL(r.icmsSP), false, false],
    ['', `Alíquota SP blendada: ${fmtPct(r.rSP)}`, '', true, false],
    ['2', 'Desconto de compensação ao cliente', '− ' + fmtBRL(r.descontoCliente), false, true],
    ['3', 'Faturamento ES (Faturamento − Desconto)', fmtBRL(r.faturamentoES), false, false],
    ['4', 'ICMS ES (carga efetiva Compete)', fmtBRL(r.icmsES), false, false],
    ['5', 'Economia bruta de ICMS', fmtBRL(r.economiaBruta), false, false, true],
    ['6', consultoriaLabel, '− ' + fmtBRL(r.consultoria), false, true],
    ['7', 'Δ Logística (R$)', deltaLogVal, false, !deltaLogIsGain, false, false, deltaLogIsGain],
    ['8', 'Δ Frete (R$)', deltaFreteVal, false, !deltaFreteIsGain, false, false, deltaFreteIsGain],
    ['9', 'BENEFÍCIO LÍQUIDO / MÊS', fmtBRL(r.beneficioMes), false, false, false, true],
    ['10', 'Benefício líquido / ano', fmtBRL(r.beneficioAno), false, false]
  ];
  const tbody = document.getElementById('calc-table-body' + suffix);
  tbody.innerHTML = rows.map(row => {
    const [n, label, val, isSub, isNeg, isIcms, isFinal, isPos] = row;
    let cls = '';
    if (isSub) cls = 'sub';
    else if (isFinal) cls = 'final-row';
    else if (isIcms) cls = 'icms-row';
    else if (isPos) cls = 'pos-row';
    else if (isNeg) cls = 'neg-row';
    return `<tr class="${cls}"><td>${n ? n + '. ' : ''}${label}</td><td class="right">${val}</td></tr>`;
  }).join('');
}
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: renderCalcTable aceita suffix opcional para destino do ID"
```

---

### Task 4: Refatorar `renderWaterfall()` para aceitar `suffix`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Trocar a assinatura e o `getElementById`**

Localizar:

```js
function renderWaterfall(r) {
  const svg = document.getElementById('waterfall-svg');
```

Substituir por:

```js
function renderWaterfall(r, suffix = '') {
  const svg = document.getElementById('waterfall-svg' + suffix);
```

(O restante da função — cálculo de barras, cores, SVG — não muda.)

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: renderWaterfall aceita suffix opcional para destino do ID"
```

---

### Task 5: Refatorar `renderParity()` para aceitar `suffix`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Substituir a função inteira**

Localizar:

```js
function renderParity(r, inp) {
  const spPreco = inp.faturamento;
  const spCredito = (r.rSP / 100) * inp.faturamento;
  const spLiquido = spPreco - spCredito;

  const esPreco = r.faturamentoES;
  const esCredito = (inp.destaqueSaidaES / 100) * r.faturamentoES;
  const esLiquido = esPreco - esCredito;

  document.getElementById('par-sp-preco').textContent = fmtBRL(spPreco);
  document.getElementById('par-sp-credito').textContent = fmtBRL(spCredito);
  document.getElementById('par-sp-liquido').textContent = fmtBRL(spLiquido);
  document.getElementById('par-es-preco').textContent = fmtBRL(esPreco);
  document.getElementById('par-es-credito').textContent = fmtBRL(esCredito);
  document.getElementById('par-es-liquido').textContent = fmtBRL(esLiquido);

  const diff = spLiquido - esLiquido;
  const resultEl = document.getElementById('parity-result');
  if (Math.abs(diff) < Math.max(1, inp.faturamento * 0.005)) {
    resultEl.className = 'parity-result parity-ok';
    resultEl.textContent = `Paridade confirmada — diferença de custo líquido: ${fmtBRL(diff)} (≈ R$ 0)`;
  } else {
    resultEl.className = 'parity-result parity-warn';
    resultEl.textContent = `Atenção — diferença de custo líquido: ${fmtBRL(diff)}`;
  }
}
```

Substituir por:

```js
function renderParity(r, inp, suffix = '') {
  const spPreco = inp.faturamento;
  const spCredito = (r.rSP / 100) * inp.faturamento;
  const spLiquido = spPreco - spCredito;

  const esPreco = r.faturamentoES;
  const esCredito = (inp.destaqueSaidaES / 100) * r.faturamentoES;
  const esLiquido = esPreco - esCredito;

  document.getElementById('par-sp-preco' + suffix).textContent = fmtBRL(spPreco);
  document.getElementById('par-sp-credito' + suffix).textContent = fmtBRL(spCredito);
  document.getElementById('par-sp-liquido' + suffix).textContent = fmtBRL(spLiquido);
  document.getElementById('par-es-preco' + suffix).textContent = fmtBRL(esPreco);
  document.getElementById('par-es-credito' + suffix).textContent = fmtBRL(esCredito);
  document.getElementById('par-es-liquido' + suffix).textContent = fmtBRL(esLiquido);

  const diff = spLiquido - esLiquido;
  const resultEl = document.getElementById('parity-result' + suffix);
  if (Math.abs(diff) < Math.max(1, inp.faturamento * 0.005)) {
    resultEl.className = 'parity-result parity-ok';
    resultEl.textContent = `Paridade confirmada — diferença de custo líquido: ${fmtBRL(diff)} (≈ R$ 0)`;
  } else {
    resultEl.className = 'parity-result parity-warn';
    resultEl.textContent = `Atenção — diferença de custo líquido: ${fmtBRL(diff)}`;
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: renderParity aceita suffix opcional para destino do ID"
```

---

### Task 6: Refatorar `renderKpis()` para aceitar `suffix`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Substituir a função inteira**

Localizar:

```js
function renderKpis(r) {
  document.getElementById('kpi-mes').textContent = fmtBRL(r.beneficioMes);
  document.getElementById('kpi-ano').textContent = fmtBRL(r.beneficioAno);
  const card = document.getElementById('kpi-veredicto-card');
  const veredicto = document.getElementById('kpi-veredicto');
  if (r.beneficioMes > 0) {
    card.className = 'kpi-card verdict-ok';
    veredicto.textContent = 'VIÁVEL';
  } else {
    card.className = 'kpi-card verdict-bad';
    veredicto.textContent = 'INVIÁVEL';
  }
}
```

Substituir por:

```js
function renderKpis(r, suffix = '') {
  document.getElementById('kpi-mes' + suffix).textContent = fmtBRL(r.beneficioMes);
  document.getElementById('kpi-ano' + suffix).textContent = fmtBRL(r.beneficioAno);
  const card = document.getElementById('kpi-veredicto-card' + suffix);
  const veredicto = document.getElementById('kpi-veredicto' + suffix);
  if (r.beneficioMes > 0) {
    card.className = 'kpi-card verdict-ok';
    veredicto.textContent = 'VIÁVEL';
  } else {
    card.className = 'kpi-card verdict-bad';
    veredicto.textContent = 'INVIÁVEL';
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: renderKpis aceita suffix opcional para destino do ID"
```

---

### Task 7: Refatorar `renderGauges()` para aceitar `suffix`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Substituir a função inteira**

Localizar:

```js
function renderGauges(r) {
  if (!r.economiaBruta) {
    setGauge('gauge-liquido-fg', 'gauge-liquido-pct', 'gauge-liquido-texto', 0);
    setGauge('gauge-desconto-fg', 'gauge-desconto-pct', 'gauge-desconto-texto', 0);
    return;
  }
  const pctLiquido = (r.beneficioMes / r.economiaBruta) * 100;
  const pctDesconto = (r.descontoCliente / r.economiaBruta) * 100;
  setGauge('gauge-liquido-fg', 'gauge-liquido-pct', 'gauge-liquido-texto', pctLiquido);
  setGauge('gauge-desconto-fg', 'gauge-desconto-pct', 'gauge-desconto-texto', pctDesconto);
}
```

Substituir por:

```js
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

(`setGauge()` em si não muda — já recebe IDs como string.)

- [ ] **Step 2: Verificação visual de todas as refatorações (Tasks 3-7)**

Abrir o arquivo no navegador. Confirmar que a tela continua 100% igual a antes: tabela, waterfall, paridade, KPIs e gauges respondendo normalmente a mudanças nos inputs, troca de aba Primavera/Fim da Primavera funcionando. Nenhuma diferença visível — as 5 funções continuam sendo chamadas sem o parâmetro `suffix` em `render()`, então usam o default `''` e escrevem nos mesmos IDs de sempre.

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: renderGauges aceita suffix opcional para destino do ID"
```

---

### Task 8: Adicionar o bloco oculto `#print-report` com as duas cópias do relatório

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Inserir o bloco antes da seção "PROJECTION 24M"**

Localizar:

```html
  </div>

  <!-- ===== PROJECTION 24M ===== -->
```

Substituir por:

```html
  </div>

  <div id="print-report" style="display:none">
    <h2>Cenário: Primavera (SP 12%)</h2>
    <div class="panel">
      <table>
        <thead>
          <tr><th>Linha de cálculo</th><th class="right">Valor</th></tr>
        </thead>
        <tbody id="calc-table-body-print-primavera"></tbody>
      </table>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Cascata do Benefício Líquido</span></div>
      <div class="waterfall-wrap">
        <svg id="waterfall-svg-print-primavera" viewBox="0 0 1100 420" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Lado do Cliente — Paridade de Custo Líquido</span></div>
      <div class="parity-grid">
        <div class="parity-col">
          <div class="parity-head sp">Comprando do concorrente (SP)</div>
          <table>
            <tr><td>Preço pago</td><td class="right" id="par-sp-preco-print-primavera">—</td></tr>
            <tr><td>Crédito de ICMS</td><td class="right" id="par-sp-credito-print-primavera">—</td></tr>
            <tr><td><strong>Custo líquido</strong></td><td class="right"><strong id="par-sp-liquido-print-primavera">—</strong></td></tr>
          </table>
        </div>
        <div class="parity-col">
          <div class="parity-head es">Comprando da empresa (ES)</div>
          <table>
            <tr><td>Preço pago</td><td class="right" id="par-es-preco-print-primavera">—</td></tr>
            <tr><td>Crédito de ICMS</td><td class="right" id="par-es-credito-print-primavera">—</td></tr>
            <tr><td><strong>Custo líquido</strong></td><td class="right"><strong id="par-es-liquido-print-primavera">—</strong></td></tr>
          </table>
        </div>
        <div class="parity-result" id="parity-result-print-primavera">—</div>
      </div>
    </div>
    <div class="panel">
      <div class="kpi-cards">
        <div class="kpi-card">
          <div class="kpi-title">Benefício líquido / mês</div>
          <div class="kpi-value" id="kpi-mes-print-primavera">—</div>
          <div class="kpi-desc">cenário Primavera</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Benefício líquido / ano</div>
          <div class="kpi-value" id="kpi-ano-print-primavera">—</div>
          <div class="kpi-desc">cenário Primavera × 12</div>
        </div>
        <div class="kpi-card" id="kpi-veredicto-card-print-primavera">
          <div class="kpi-title">Veredicto</div>
          <div class="kpi-value" id="kpi-veredicto-print-primavera">—</div>
          <div class="kpi-desc">migração SP → ES</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Quanto da Economia Bruta Vira Benefício Real</span></div>
      <div class="gauge-grid">
        <div class="gauge-card">
          <div class="gauge-card-head">Benefício Líquido / Economia Bruta</div>
          <div class="gauge-card-body">
            <div class="gauge-ring-wrap">
              <svg viewBox="0 0 140 140">
                <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="14"></circle>
                <circle id="gauge-liquido-fg-print-primavera" class="gauge-fg" cx="70" cy="70" r="58" stroke-width="14" stroke="#c9a227"></circle>
              </svg>
              <div class="gauge-center">
                <div class="gauge-pct" id="gauge-liquido-pct-print-primavera">—</div>
              </div>
            </div>
            <div class="gauge-desc">
              O <strong>benefício líquido</strong> representa <strong id="gauge-liquido-texto-print-primavera">—</strong> da economia bruta de ICMS — o restante foi consumido por desconto ao cliente, consultoria, logística e frete.
            </div>
          </div>
        </div>
        <div class="gauge-card">
          <div class="gauge-card-head">Desconto ao Cliente / Economia Bruta</div>
          <div class="gauge-card-body">
            <div class="gauge-ring-wrap">
              <svg viewBox="0 0 140 140">
                <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="14"></circle>
                <circle id="gauge-desconto-fg-print-primavera" class="gauge-fg" cx="70" cy="70" r="58" stroke-width="14" stroke="#1e4080"></circle>
              </svg>
              <div class="gauge-center">
                <div class="gauge-pct" id="gauge-desconto-pct-print-primavera">—</div>
              </div>
            </div>
            <div class="gauge-desc">
              O <strong>desconto de compensação ao cliente</strong> consome <strong id="gauge-desconto-texto-print-primavera">—</strong> da economia bruta — quanto menor essa fatia, mais margem fica para o distribuidor.
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>Cenário: Fim da Primavera (mix de produtos)</h2>
    <div class="panel">
      <table>
        <thead>
          <tr><th>Linha de cálculo</th><th class="right">Valor</th></tr>
        </thead>
        <tbody id="calc-table-body-print-fim"></tbody>
      </table>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Cascata do Benefício Líquido</span></div>
      <div class="waterfall-wrap">
        <svg id="waterfall-svg-print-fim" viewBox="0 0 1100 420" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Lado do Cliente — Paridade de Custo Líquido</span></div>
      <div class="parity-grid">
        <div class="parity-col">
          <div class="parity-head sp">Comprando do concorrente (SP)</div>
          <table>
            <tr><td>Preço pago</td><td class="right" id="par-sp-preco-print-fim">—</td></tr>
            <tr><td>Crédito de ICMS</td><td class="right" id="par-sp-credito-print-fim">—</td></tr>
            <tr><td><strong>Custo líquido</strong></td><td class="right"><strong id="par-sp-liquido-print-fim">—</strong></td></tr>
          </table>
        </div>
        <div class="parity-col">
          <div class="parity-head es">Comprando da empresa (ES)</div>
          <table>
            <tr><td>Preço pago</td><td class="right" id="par-es-preco-print-fim">—</td></tr>
            <tr><td>Crédito de ICMS</td><td class="right" id="par-es-credito-print-fim">—</td></tr>
            <tr><td><strong>Custo líquido</strong></td><td class="right"><strong id="par-es-liquido-print-fim">—</strong></td></tr>
          </table>
        </div>
        <div class="parity-result" id="parity-result-print-fim">—</div>
      </div>
    </div>
    <div class="panel">
      <div class="kpi-cards">
        <div class="kpi-card">
          <div class="kpi-title">Benefício líquido / mês</div>
          <div class="kpi-value" id="kpi-mes-print-fim">—</div>
          <div class="kpi-desc">cenário Fim da Primavera</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-title">Benefício líquido / ano</div>
          <div class="kpi-value" id="kpi-ano-print-fim">—</div>
          <div class="kpi-desc">cenário Fim da Primavera × 12</div>
        </div>
        <div class="kpi-card" id="kpi-veredicto-card-print-fim">
          <div class="kpi-title">Veredicto</div>
          <div class="kpi-value" id="kpi-veredicto-print-fim">—</div>
          <div class="kpi-desc">migração SP → ES</div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header"><span>Quanto da Economia Bruta Vira Benefício Real</span></div>
      <div class="gauge-grid">
        <div class="gauge-card">
          <div class="gauge-card-head">Benefício Líquido / Economia Bruta</div>
          <div class="gauge-card-body">
            <div class="gauge-ring-wrap">
              <svg viewBox="0 0 140 140">
                <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="14"></circle>
                <circle id="gauge-liquido-fg-print-fim" class="gauge-fg" cx="70" cy="70" r="58" stroke-width="14" stroke="#c9a227"></circle>
              </svg>
              <div class="gauge-center">
                <div class="gauge-pct" id="gauge-liquido-pct-print-fim">—</div>
              </div>
            </div>
            <div class="gauge-desc">
              O <strong>benefício líquido</strong> representa <strong id="gauge-liquido-texto-print-fim">—</strong> da economia bruta de ICMS — o restante foi consumido por desconto ao cliente, consultoria, logística e frete.
            </div>
          </div>
        </div>
        <div class="gauge-card">
          <div class="gauge-card-head">Desconto ao Cliente / Economia Bruta</div>
          <div class="gauge-card-body">
            <div class="gauge-ring-wrap">
              <svg viewBox="0 0 140 140">
                <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="14"></circle>
                <circle id="gauge-desconto-fg-print-fim" class="gauge-fg" cx="70" cy="70" r="58" stroke-width="14" stroke="#1e4080"></circle>
              </svg>
              <div class="gauge-center">
                <div class="gauge-pct" id="gauge-desconto-pct-print-fim">—</div>
              </div>
            </div>
            <div class="gauge-desc">
              O <strong>desconto de compensação ao cliente</strong> consome <strong id="gauge-desconto-texto-print-fim">—</strong> da economia bruta — quanto menor essa fatia, mais margem fica para o distribuidor.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===== PROJECTION 24M ===== -->
```

- [ ] **Step 2: Verificação**

Abrir o arquivo no navegador. Confirmar que a tela continua igual a antes (o bloco `#print-report` tem `style="display:none"`, então fica invisível). Usar Ctrl+F ou inspecionar elemento para confirmar que o bloco existe no HTML, mesmo oculto.

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: adicionar bloco oculto print-report com as duas copias do relatorio"
```

---

### Task 9: Criar a função `salvarEstudo()`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Adicionar a função antes de `render()`**

Localizar:

```js
function render() {
  const inp = getInputs();
  renderSubtitle(inp);
  renderMarkup(inp);
  renderFreteLogistica(inp);
```

Substituir por:

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

function render() {
  const inp = getInputs();
  renderSubtitle(inp);
  renderMarkup(inp);
  renderFreteLogistica(inp);
```

- [ ] **Step 2: Verificação no navegador**

Abrir o arquivo, preencher Empresa = "Teste", Faturamento = 1500000, Compras = 500000, ICMS SPED = 125000, mix 20% shampoo. Clicar "Salvar Estudo (PDF)". Confirmar que o diálogo de impressão do navegador abre (Ctrl+P equivalente) — não precisa completar a impressão, só confirmar que `window.print()` foi acionado sem erro no console (F12 → Console, sem mensagens vermelhas).

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: adicionar funcao salvarEstudo que renderiza os dois cenarios e aciona impressao"
```

---

### Task 10: Adicionar o CSS de impressão

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

- [ ] **Step 1: Inserir as regras antes de `</style>`**

Localizar:

```css
@media (max-width: 720px) {
  .parity-grid { grid-template-columns: 1fr; }
  .kpi-cards { grid-template-columns: 1fr; }
  .header-inner { flex-direction: column; }
  .header-text { text-align: center; }
}
</style>
```

Substituir por:

```css
@media (max-width: 720px) {
  .parity-grid { grid-template-columns: 1fr; }
  .kpi-cards { grid-template-columns: 1fr; }
  .header-inner { flex-direction: column; }
  .header-text { text-align: center; }
}

@media print {
  #input-panel, #screen-report { display: none; }
  #print-report { display: block; }
  body { background: #fff; }
}
</style>
```

- [ ] **Step 2: Verificação**

Abrir o arquivo no navegador, preencher alguns dados, clicar "Salvar Estudo (PDF)" e, no diálogo de impressão, olhar a pré-visualização: deve mostrar só os dois relatórios completos (Primavera e Fim da Primavera) com seus títulos `<h2>`, mais a projeção de 24 meses, a nota da reforma e o rodapé — sem o painel de inputs e sem o relatório de tela duplicado.

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: adicionar CSS de impressao para o botao Salvar Estudo"
```

---

### Task 11: Verificação de sintaxe e checklist final

**Files:** nenhum (verificação)

- [ ] **Step 1: Extrair e validar a sintaxe do `<script>`**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
node -e "
const fs = require('fs');
const html = fs.readFileSync('public/fluir_estudo_viabilidade_ES.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
fs.writeFileSync('/tmp/extracted_check.js', match[1]);
"
node --check /tmp/extracted_check.js
```

Expected: nenhuma saída (sintaxe OK). Se aparecer `SyntaxError`, revisar as Tasks 3-9 antes de continuar.

- [ ] **Step 2: Confirmar que as 5 funções de renderização aceitam o parâmetro `suffix`**

```bash
grep -n "function renderCalcTable\|function renderWaterfall\|function renderParity\|function renderKpis\|function renderGauges" C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html
```

Expected: as 5 linhas devem mostrar `suffix = ''` no final da lista de parâmetros de cada função.

- [ ] **Step 3: Repetir o teste de paridade fiscal já validado**

No navegador, com Faturamento 1.5M, Compras 500k, ICMS SPED 125k, mix 20/80, frete/logística todos 0, consultoria 8% mín 2500: confirmar que a tela normal (sem clicar em Salvar Estudo) mostra Benefício Líquido / Mês = R$69.268 (Primavera) e R$29.094 (Fim da Primavera) — igual a antes desta feature. Isso garante que o refactor de `suffix` não alterou o comportamento da tela.

- [ ] **Step 4: Push**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git push
```

- [ ] **Step 5: Confirmar publicação**

Aguardar build do Cloudflare Pages (1-3 min) e abrir `https://fluir-pitch-deck.pages.dev/fluir_estudo_viabilidade_ES.html`. Preencher dados de teste e clicar "Salvar Estudo (PDF)" para confirmar que o diálogo de impressão mostra os dois cenários completos.
