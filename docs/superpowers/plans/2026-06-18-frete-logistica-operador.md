# Frete e Logística via Operador (Indústria → Filial ES) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir os campos percentuais de Δ Logística/Δ Frete no `fluir_estudo_viabilidade_ES.html` por uma estrutura de custo atual vs. custo novo (Indústria → Matriz SP vs Indústria → Filial ES), com badges de diferença calculada automaticamente, sem alterar nenhuma fórmula fiscal existente.

**Architecture:** Arquivo único HTML/CSS/JS sem build step nem framework de teste. As mudanças são: 4 novos campos de input, 1 classe CSS nova (`.pos-row`), 1 função JS nova (`renderFreteLogistica`), e ajustes pontuais em `DEFAULTS`, `getInputs`, `calcScenario`, `renderCalcTable`, `renderWaterfall` e `clearAll`. Verificação por script Node.js ad-hoc (sem framework) reproduzindo a aritmética, seguido de checagem manual no navegador.

**Tech Stack:** HTML, CSS, JavaScript vanilla (sem dependências, sem bundler para este arquivo). Node.js apenas para o script de verificação aritmética (descartável, não committado).

---

## Referência: spec aprovado

`docs/superpowers/specs/2026-06-18-frete-logistica-operador-design.md`

## Referência: estado atual do arquivo (linhas relevantes antes da mudança)

- Inputs: `public/fluir_estudo_viabilidade_ES.html:418-426`
- CSS de linhas da tabela: `public/fluir_estudo_viabilidade_ES.html:187-189`
- `DEFAULTS`: `public/fluir_estudo_viabilidade_ES.html:574-581`
- `getInputs()`: `public/fluir_estudo_viabilidade_ES.html:592-611`
- `calcScenario()`: `public/fluir_estudo_viabilidade_ES.html:613-636`
- `renderCalcTable()`: `public/fluir_estudo_viabilidade_ES.html:645-673`
- `renderWaterfall()`: `public/fluir_estudo_viabilidade_ES.html:675-` (steps em 686-695, cor/label em 715-727)
- `render()`: chama `renderMarkup(inp)` — local de referência para registrar a nova `renderFreteLogistica(inp)`
- `clearAll()`: `public/fluir_estudo_viabilidade_ES.html:864-882`

---

### Task 1: Substituir os campos de input no painel "Custos Incrementais e Consultoria"

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:418-426`

- [ ] **Step 1: Substituir o bloco HTML**

Localizar e remover:

```html
      <div class="input-group-title">Custos Incrementais e Consultoria</div>
      <div class="field">
        <label>Δ Logística ES − SP (% do faturamento)</label>
        <div class="input-row"><input type="number" id="deltaLogPct" value="0" step="0.1"><span class="unit-sym">%</span></div>
      </div>
      <div class="field">
        <label>Δ Frete ES − SP (% do faturamento)</label>
        <div class="input-row"><input type="number" id="deltaFretePct" value="0" step="0.1"><span class="unit-sym">%</span></div>
      </div>
      <div class="field">
        <label>Consultoria (% da economia bruta)</label>
        <div class="input-row"><input type="number" id="consultoriaPct" value="6" step="0.1"><span class="unit-sym">%</span></div>
      </div>
      <div class="field">
        <label>Consultoria — mínimo mensal</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="consultoriaMin" value="0" step="100"></div>
      </div>
```

Substituir por:

```html
      <div class="input-group-title">Frete, Logística e Consultoria</div>
      <div class="field">
        <label>Frete atual (Indústria → Matriz SP → Cliente)</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteAtual" value="0" step="100"></div>
      </div>
      <div class="field">
        <label>Frete novo (Indústria → Filial ES → Cliente)</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteNovo" value="0" step="100"></div>
      </div>
      <div class="field field-markup">
        <label>Diferença de frete (novo − atual)</label>
        <div id="frete-diff-badge" class="markup-badge">—</div>
      </div>
      <div class="field">
        <label>Operador Logístico ES (% do faturamento)</label>
        <div class="input-row"><input type="number" id="operadorLogPct" value="0" step="0.1"><span class="unit-sym">%</span></div>
        <div class="field-hint">Equivalente em R$/mês: <span id="operador-log-rs">—</span></div>
      </div>
      <div class="field">
        <label>Custo atual da operação logística</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="custoLogAtual" value="0" step="100"></div>
      </div>
      <div class="field field-markup">
        <label>Diferença de logística (operador ES − atual)</label>
        <div id="logistica-diff-badge" class="markup-badge">—</div>
      </div>
      <div class="field">
        <label>Consultoria (% da economia bruta)</label>
        <div class="input-row"><input type="number" id="consultoriaPct" value="6" step="0.1"><span class="unit-sym">%</span></div>
      </div>
      <div class="field">
        <label>Consultoria — mínimo mensal</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="consultoriaMin" value="0" step="100"></div>
      </div>
```

- [ ] **Step 2: Verificação visual rápida**

Abrir o arquivo direto no navegador (duplo clique ou `start public/fluir_estudo_viabilidade_ES.html` no Windows) e confirmar:
- A seção agora se chama "Frete, Logística e Consultoria"
- Aparecem os 6 novos campos + 2 badges com "—"
- Os campos antigos (`Δ Logística ES − SP`, `Δ Frete ES − SP`) não existem mais

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: substituir campos % de delta logistica/frete por estrutura atual vs novo"
```

---

### Task 2: Adicionar classe CSS `.pos-row` para linhas de ganho na tabela

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:187-189`

- [ ] **Step 1: Adicionar a regra CSS**

Localizar:

```css
tr.icms-row td { background: #d5e4f5; font-weight: 700; }
tr.neg-row td { color: #b02a2a; }
tr.final-row td { background: #0b1a35; color: #c9a227; font-weight: 700; font-size: 13px; }
```

Substituir por:

```css
tr.icms-row td { background: #d5e4f5; font-weight: 700; }
tr.neg-row td { color: #b02a2a; }
tr.pos-row td { color: #1a7a3a; }
tr.final-row td { background: #0b1a35; color: #c9a227; font-weight: 700; font-size: 13px; }
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "style: adicionar classe pos-row para linhas de ganho na tabela de calculo"
```

---

### Task 3: Atualizar `DEFAULTS` e `getInputs()`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:574-581` (DEFAULTS)
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:592-611` (getInputs)

- [ ] **Step 1: Atualizar `DEFAULTS`**

Localizar:

```js
const DEFAULTS = {
  empresa: '', baseSped: '',
  faturamento: 0, compras: 0, icmsSpedAtual: 0,
  creditoEntradaSP: 12, creditoEntradaES: 7, destaqueSaidaES: 12, cargaEfetivaES: 1.14,
  pctShampoo: 50, pctCreditantes: 100,
  deltaLogPct: 0, deltaFretePct: 0,
  consultoriaPct: 6, consultoriaMin: 0
};
```

Substituir por:

```js
const DEFAULTS = {
  empresa: '', baseSped: '',
  faturamento: 0, compras: 0, icmsSpedAtual: 0,
  creditoEntradaSP: 12, creditoEntradaES: 7, destaqueSaidaES: 12, cargaEfetivaES: 1.14,
  pctShampoo: 50, pctCreditantes: 100,
  freteAtual: 0, freteNovo: 0, operadorLogPct: 0, custoLogAtual: 0,
  consultoriaPct: 6, consultoriaMin: 0
};
```

- [ ] **Step 2: Atualizar `getInputs()`**

Localizar:

```js
    pctCreditantes: num('pctCreditantes'),
    deltaLogPct: num('deltaLogPct'),
    deltaFretePct: num('deltaFretePct'),
    consultoriaPct: num('consultoriaPct'),
    consultoriaMin: num('consultoriaMin')
```

Substituir por:

```js
    pctCreditantes: num('pctCreditantes'),
    freteAtual: num('freteAtual'),
    freteNovo: num('freteNovo'),
    operadorLogPct: num('operadorLogPct'),
    custoLogAtual: num('custoLogAtual'),
    consultoriaPct: num('consultoriaPct'),
    consultoriaMin: num('consultoriaMin')
```

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: atualizar DEFAULTS e getInputs para novos campos de frete/logistica"
```

---

### Task 4: Atualizar `calcScenario()` para calcular `deltaLogRS`/`deltaFreteRS` a partir dos novos campos

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:628-631`

- [ ] **Step 1: Substituir o cálculo de delta**

Localizar:

```js
  const consultoria = Math.max(inp.consultoriaMin, (inp.consultoriaPct / 100) * economiaBruta);
  const deltaLogRS = (inp.deltaLogPct / 100) * inp.faturamento;
  const deltaFreteRS = (inp.deltaFretePct / 100) * inp.faturamento;
  const beneficioMes = economiaBruta - descontoCliente - consultoria - deltaLogRS - deltaFreteRS;
```

Substituir por:

```js
  const consultoria = Math.max(inp.consultoriaMin, (inp.consultoriaPct / 100) * economiaBruta);
  const operadorLogRS = (inp.operadorLogPct / 100) * inp.faturamento;
  const deltaLogRS = operadorLogRS - inp.custoLogAtual;
  const deltaFreteRS = inp.freteNovo - inp.freteAtual;
  const beneficioMes = economiaBruta - descontoCliente - consultoria - deltaLogRS - deltaFreteRS;
```

(`deltaLogRS` e `deltaFreteRS` continuam sendo retornados no objeto final — essa parte do `return` não muda.)

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: calcular delta logistica e frete a partir de custo atual vs novo"
```

---

### Task 5: Verificar a aritmética com script Node.js descartável

**Files:**
- Create (temporário, não committado): `C:\Users\Cadu\fluir-pitch-deck\tmp_verify_delta.js`

- [ ] **Step 1: Escrever o script de verificação**

```js
// tmp_verify_delta.js — script descartável, não committar
function assertEqual(actual, expected, label) {
  if (Math.abs(actual - expected) > 0.01) {
    console.error(`FALHOU: ${label} — esperado ${expected}, obteve ${actual}`);
    process.exitCode = 1;
  } else {
    console.log(`OK: ${label} = ${actual}`);
  }
}

// Caso 1: frete novo mais barato (ganho), operador mais caro que atual (custo)
const inp1 = { faturamento: 1000000, freteAtual: 8000, freteNovo: 5500, operadorLogPct: 3, custoLogAtual: 25000 };
const operadorLogRS1 = (inp1.operadorLogPct / 100) * inp1.faturamento;
const deltaLogRS1 = operadorLogRS1 - inp1.custoLogAtual;
const deltaFreteRS1 = inp1.freteNovo - inp1.freteAtual;
assertEqual(operadorLogRS1, 30000, 'operadorLogRS (caso 1)');
assertEqual(deltaLogRS1, 5000, 'deltaLogRS (caso 1 — custo, operador mais caro)');
assertEqual(deltaFreteRS1, -2500, 'deltaFreteRS (caso 1 — ganho, frete novo mais barato)');

// Lógica de sinal para a tabela (linhas 7 e 8)
const deltaLogIsGain1 = deltaLogRS1 < 0;
const deltaFreteIsGain1 = deltaFreteRS1 < 0;
assertEqual(deltaLogIsGain1 ? 1 : 0, 0, 'deltaLog deve ser CUSTO (vermelho) no caso 1');
assertEqual(deltaFreteIsGain1 ? 1 : 0, 1, 'deltaFrete deve ser GANHO (verde) no caso 1');

// Lógica de sinal para o waterfall (b.value = -delta)
const waterfallValLog1 = -deltaLogRS1;
const waterfallValFrete1 = -deltaFreteRS1;
assertEqual(waterfallValLog1, -5000, 'waterfall Δ Logistica (caso 1 — barra desce, custo)');
assertEqual(waterfallValFrete1, 2500, 'waterfall Δ Frete (caso 1 — barra sobe, ganho)');

// Caso 2: tudo zerado (defaults) — não deve gerar NaN
const inp2 = { faturamento: 0, freteAtual: 0, freteNovo: 0, operadorLogPct: 0, custoLogAtual: 0 };
const operadorLogRS2 = (inp2.operadorLogPct / 100) * inp2.faturamento;
const deltaLogRS2 = operadorLogRS2 - inp2.custoLogAtual;
const deltaFreteRS2 = inp2.freteNovo - inp2.freteAtual;
assertEqual(deltaLogRS2, 0, 'deltaLogRS (caso 2 — defaults zerados)');
assertEqual(deltaFreteRS2, 0, 'deltaFreteRS (caso 2 — defaults zerados)');

console.log('Verificação concluída.');
```

- [ ] **Step 2: Executar e confirmar que tudo passa**

Run: `node C:\Users\Cadu\fluir-pitch-deck\tmp_verify_delta.js`

Expected output:
```
OK: operadorLogRS (caso 1) = 30000
OK: deltaLogRS (caso 1 — custo, operador mais caro) = 5000
OK: deltaFreteRS (caso 1 — ganho, frete novo mais barato) = -2500
OK: deltaLog deve ser CUSTO (vermelho) no caso 1 = 0
OK: deltaFrete deve ser GANHO (verde) no caso 1 = 1
OK: waterfall Δ Logistica (caso 1 — barra desce, custo) = -5000
OK: waterfall Δ Frete (caso 1 — barra sobe, ganho) = 2500
OK: deltaLogRS (caso 2 — defaults zerados) = 0
OK: deltaFreteRS (caso 2 — defaults zerados) = 0
Verificação concluída.
```

Se algum `FALHOU` aparecer, revisar o Task 4 antes de continuar.

- [ ] **Step 3: Apagar o script descartável**

```bash
rm C:\Users\Cadu\fluir-pitch-deck\tmp_verify_delta.js
```

(Nada para commitar neste task — é só uma checagem de aritmética antes de seguir.)

---

### Task 6: Atualizar `renderCalcTable()` para sinal dinâmico nas linhas 7 e 8

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:645-673`

- [ ] **Step 1: Substituir a função inteira**

Localizar:

```js
function renderCalcTable(r, scenario, inp) {
  const icmsSPLabel = scenario === 'primavera'
    ? 'ICMS SP a pagar (valor auditado SPED)'
    : 'ICMS SP a pagar (projetado: rSP × Faturamento − créd.entrada SP × Compras)';
  const consultoriaLabel = `Consultoria (${fmtPct(inp.consultoriaPct)} da economia, mín. ${fmtBRL(inp.consultoriaMin)})`;
  const rows = [
    ['1', icmsSPLabel, fmtBRL(r.icmsSP), false, false],
    ['', `Alíquota SP blendada: ${fmtPct(r.rSP)}`, '', true, false],
    ['2', 'Desconto de compensação ao cliente', '− ' + fmtBRL(r.descontoCliente), false, true],
    ['3', 'Faturamento ES (Faturamento − Desconto)', fmtBRL(r.faturamentoES), false, false],
    ['4', 'ICMS ES (carga efetiva Compete)', fmtBRL(r.icmsES), false, false],
    ['5', 'Economia bruta de ICMS', fmtBRL(r.economiaBruta), false, false, true],
    ['6', consultoriaLabel, '− ' + fmtBRL(r.consultoria), false, true],
    ['7', 'Δ Logística (R$)', '− ' + fmtBRL(r.deltaLogRS), false, true],
    ['8', 'Δ Frete (R$)', '− ' + fmtBRL(r.deltaFreteRS), false, true],
    ['9', 'BENEFÍCIO LÍQUIDO / MÊS', fmtBRL(r.beneficioMes), false, false, false, true],
    ['10', 'Benefício líquido / ano', fmtBRL(r.beneficioAno), false, false]
  ];
  const tbody = document.getElementById('calc-table-body');
  tbody.innerHTML = rows.map(row => {
    const [n, label, val, isSub, isNeg, isIcms, isFinal] = row;
    let cls = '';
    if (isSub) cls = 'sub';
    else if (isFinal) cls = 'final-row';
    else if (isIcms) cls = 'icms-row';
    else if (isNeg) cls = 'neg-row';
    return `<tr class="${cls}"><td>${n ? n + '. ' : ''}${label}</td><td class="right">${val}</td></tr>`;
  }).join('');
}
```

Substituir por:

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

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: linhas 7-8 da tabela mostram ganho em verde quando delta e negativo"
```

---

### Task 7: Atualizar `renderWaterfall()` para sinal dinâmico nas barras de Δ Logística/Δ Frete

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (dentro de `renderWaterfall`, bloco de cor/label por barra)

- [ ] **Step 1: Substituir o bloco de cor e label**

Localizar:

```js
    let color = '#c9852a';
    if (b.type === 'start') color = '#1e4080';
    else if (b.type === 'final') color = b.value >= 0 ? '#1a7a3a' : '#b02a2a';

    svgContent += `<rect x="${cx - barW / 2}" y="${top}" width="${barW}" height="${height}" fill="${color}" rx="3"/>`;

    const valLabel = (b.type === 'decrease' ? '− ' : '') + fmtBRL(Math.abs(b.value));
```

Substituir por:

```js
    let color = '#c9852a';
    if (b.type === 'start') color = '#1e4080';
    else if (b.type === 'final') color = b.value >= 0 ? '#1a7a3a' : '#b02a2a';
    else if (b.type === 'decrease' && b.value >= 0) color = '#1a7a3a';

    svgContent += `<rect x="${cx - barW / 2}" y="${top}" width="${barW}" height="${height}" fill="${color}" rx="3"/>`;

    const valLabel = b.type === 'decrease'
      ? (b.value < 0 ? '− ' : '+ ') + fmtBRL(Math.abs(b.value))
      : fmtBRL(Math.abs(b.value));
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: waterfall mostra barra de ganho em verde quando delta logistica/frete e negativo"
```

---

### Task 8: Criar `renderFreteLogistica(inp)` e registrar no `render()`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (função `render()`, próximo de onde `renderMarkup(inp)` é chamado)

- [ ] **Step 1: Adicionar a função `renderFreteLogistica`**

Localizar a função `renderMarkup` (já existente) e adicionar imediatamente depois dela:

```js
function renderFreteLogistica(inp) {
  const freteDiff = inp.freteNovo - inp.freteAtual;
  document.getElementById('frete-diff-badge').textContent =
    (freteDiff >= 0 ? '+ ' : '− ') + fmtBRL(Math.abs(freteDiff));

  const operadorRS = (inp.operadorLogPct / 100) * inp.faturamento;
  document.getElementById('operador-log-rs').textContent = fmtBRL(operadorRS);

  const logDiff = operadorRS - inp.custoLogAtual;
  document.getElementById('logistica-diff-badge').textContent =
    (logDiff >= 0 ? '+ ' : '− ') + fmtBRL(Math.abs(logDiff));
}
```

- [ ] **Step 2: Registrar a chamada em `render()`**

Localizar:

```js
function render() {
  const inp = getInputs();
  renderSubtitle(inp);
  renderMarkup(inp);
  const r = calcScenario(activeScenario, inp);
```

Substituir por:

```js
function render() {
  const inp = getInputs();
  renderSubtitle(inp);
  renderMarkup(inp);
  renderFreteLogistica(inp);
  const r = calcScenario(activeScenario, inp);
```

- [ ] **Step 3: Verificação visual**

Abrir o arquivo no navegador, preencher Faturamento = 1000000, Frete atual = 8000, Frete novo = 5500, Operador Logístico = 3%, Custo atual log = 25000. Confirmar:
- Badge "Diferença de frete (novo − atual)" mostra `− R$2.500,00` (porque 5500−8000=−2500; o label do campo já deixa claro que é "novo − atual", então o sinal é literal, sem necessidade de cor)
- Span "Equivalente em R$/mês" ao lado do Operador Logístico mostra "R$ 30.000,00"
- Badge "Diferença de logística (operador ES − atual)" mostra `+ R$5.000,00` (porque 30000−25000=5000)

- [ ] **Step 4: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: badges de diferenca calculada para frete e logistica"
```

---

### Task 9: Atualizar `clearAll()` com os novos campos

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html:864-882`

- [ ] **Step 1: Substituir as linhas de reset**

Localizar:

```js
  document.getElementById('pctCreditantes').value = DEFAULTS.pctCreditantes;
  document.getElementById('deltaLogPct').value = DEFAULTS.deltaLogPct;
  document.getElementById('deltaFretePct').value = DEFAULTS.deltaFretePct;
  document.getElementById('consultoriaPct').value = DEFAULTS.consultoriaPct;
```

Substituir por:

```js
  document.getElementById('pctCreditantes').value = DEFAULTS.pctCreditantes;
  document.getElementById('freteAtual').value = DEFAULTS.freteAtual;
  document.getElementById('freteNovo').value = DEFAULTS.freteNovo;
  document.getElementById('operadorLogPct').value = DEFAULTS.operadorLogPct;
  document.getElementById('custoLogAtual').value = DEFAULTS.custoLogAtual;
  document.getElementById('consultoriaPct').value = DEFAULTS.consultoriaPct;
```

- [ ] **Step 2: Verificação visual**

Abrir o arquivo, preencher os novos campos com valores diferentes de 0, clicar "Limpar dados", confirmar que os 4 campos voltam a 0 e as badges voltam a "—"/"R$ 0,00".

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: clearAll reseta os novos campos de frete e logistica"
```

---

### Task 10: Checklist final de verificação manual no navegador

**Files:** nenhum (apenas verificação)

- [ ] **Step 1: Caso custo real (operação ES mais cara em ambos)**

Faturamento = 1.000.000, Frete atual = 5.000, Frete novo = 8.000, Operador Logístico = 3%, Custo atual log = 25.000.
Confirmar: linhas 7 e 8 da tabela aparecem em **vermelho** com "−"; barras correspondentes no waterfall **descem** e ficam na cor dourada/marrom padrão.

- [ ] **Step 2: Caso ganho (operação ES mais barata em ambos)**

Frete atual = 9.000, Frete novo = 5.000, Operador Logístico = 2%, Custo atual log = 30.000 (operadorRS=20.000, deltaLog=20000-30000=-10000).
Confirmar: linhas 7 e 8 aparecem em **verde** com "+"; barras correspondentes no waterfall **sobem** e ficam **verdes**.

- [ ] **Step 3: Caso defaults (tudo zerado)**

Clicar "Limpar dados". Confirmar que não aparece `NaN` em nenhum lugar (tabela, waterfall, badges, KPIs).

- [ ] **Step 4: Confirmar que a lógica fiscal não mudou**

Repetir o teste de paridade já validado anteriormente (faturamento 1.5M, compras 500k, ICMS SPED 125k, mix 20/80) e confirmar que o Benefício Líquido / Mês continua R$69.268 (Primavera) e R$29.094 (Fim da Primavera) — usando Frete atual = Frete novo = 0 e Operador/Custo atual log = 0 para neutralizar os novos campos.

---

### Task 11: Publicar

**Files:** nenhum (deploy)

- [ ] **Step 1: Push**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git push
```

- [ ] **Step 2: Confirmar publicação**

Aguardar build do Cloudflare Pages (1-3 min) e abrir `https://fluir-pitch-deck.pages.dev/fluir_estudo_viabilidade_ES.html` para confirmar que os novos campos estão no ar.
