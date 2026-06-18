# Frete em Trechos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir os campos únicos `freteAtual`/`freteNovo` no `fluir_estudo_viabilidade_ES.html` por 4 campos de trecho (Indústria→Matriz, Matriz→Cliente, Indústria→Filial ES, Filial ES→Cliente), somados internamente para alimentar a mesma fórmula de `deltaFreteRS` já existente, sem alterar nenhuma outra lógica.

**Architecture:** Arquivo único HTML/CSS/JS sem build step nem framework de teste. As mudanças são: 4 novos campos de input substituindo 2, 1 classe CSS nova (`.field-compact`) para a badge de frete, e ajustes pontuais em `DEFAULTS`, `getInputs`, `calcScenario`, `renderFreteLogistica` e `clearAll`. Verificação por script Node.js ad-hoc seguido de checagem do `git diff`.

**Tech Stack:** HTML, CSS, JavaScript vanilla (sem dependências). Node.js apenas para o script de verificação aritmética (descartável, não committado).

---

## Referência: spec aprovado

`docs/superpowers/specs/2026-06-18-frete-trechos-design.md`

## Referência: estado atual do arquivo (linhas relevantes antes da mudança)

- Inputs: `public/fluir_estudo_viabilidade_ES.html:419-431`
- `DEFAULTS`: `public/fluir_estudo_viabilidade_ES.html:597`
- `getInputs()`: `public/fluir_estudo_viabilidade_ES.html:623-626`
- `calcScenario()`: `public/fluir_estudo_viabilidade_ES.html:650-652`
- `renderFreteLogistica()`: `public/fluir_estudo_viabilidade_ES.html:882-885`
- `clearAll()`: `public/fluir_estudo_viabilidade_ES.html:921-923`

**Nota para quem executar:** os números de linha acima podem já estar desatualizados quando você for executar as tasks (o arquivo já passou por várias edições anteriores nesta sessão). Sempre localize o trecho pelo **conteúdo exato** mostrado em "Localizar", não pelo número de linha.

---

### Task 1: Substituir os campos de input de frete

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (dentro da seção "Frete, Logística e Consultoria")

- [ ] **Step 1: Substituir o bloco HTML**

Localizar:

```html
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
```

Substituir por:

```html
      <div class="field">
        <label>Frete Indústria → Matriz</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteIndMatriz" value="0" step="100"></div>
      </div>
      <div class="field">
        <label>Frete Matriz → Cliente</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteMatrizCliente" value="0" step="100"></div>
      </div>
      <div class="field">
        <label>Frete Indústria → Filial ES</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteIndFilial" value="0" step="100"></div>
      </div>
      <div class="field">
        <label>Frete Filial ES → Cliente</label>
        <div class="input-row"><span class="unit-sym">R$</span><input type="number" id="freteFilialCliente" value="0" step="100"></div>
      </div>
      <div class="field field-markup field-compact">
        <label>Diferença de frete (novo − atual)</label>
        <div id="frete-diff-badge" class="markup-badge">—</div>
      </div>
```

- [ ] **Step 2: Verificação visual rápida**

Abrir o arquivo no navegador e confirmar:
- Aparecem 4 campos: "Frete Indústria → Matriz", "Frete Matriz → Cliente", "Frete Indústria → Filial ES", "Frete Filial ES → Cliente"
- A badge "Diferença de frete (novo − atual)" continua existindo, mostrando "—"
- Os campos antigos `freteAtual`/`freteNovo` não existem mais

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: dividir frete atual/novo em 4 campos de trecho"
```

---

### Task 2: Adicionar a classe CSS `.field-compact`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (bloco de CSS, próximo de `.markup-badge`)

- [ ] **Step 1: Localizar a regra `.markup-badge` existente**

Procurar por este bloco (já existente no arquivo):

```css
.markup-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 700;
  background: #e8f0fb;
  color: #1e4080;
  border: 1px solid #b8cce0;
  min-width: 70px;
  text-align: center;
}
```

Adicionar imediatamente depois desse bloco:

```css
.field-compact { max-width: 180px; }
```

- [ ] **Step 2: Verificação visual**

Abrir o arquivo no navegador. Confirmar que **só** a badge "Diferença de frete" ficou mais estreita que os campos de input vizinhos — a badge de Markup (Faturamento/Compras) e a badge de "Diferença de logística" continuam do tamanho normal (sem `.field-compact`).

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "style: adicionar classe field-compact para a badge de diferenca de frete"
```

---

### Task 3: Atualizar `DEFAULTS` e `getInputs()`

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (objeto `DEFAULTS` e função `getInputs()`)

- [ ] **Step 1: Atualizar `DEFAULTS`**

Localizar:

```js
  pctShampoo: 50, pctCreditantes: 100,
  freteAtual: 0, freteNovo: 0, operadorLogPct: 0, custoLogAtual: 0,
  consultoriaPct: 6, consultoriaMin: 0
```

Substituir por:

```js
  pctShampoo: 50, pctCreditantes: 100,
  freteIndMatriz: 0, freteMatrizCliente: 0, freteIndFilial: 0, freteFilialCliente: 0, operadorLogPct: 0, custoLogAtual: 0,
  consultoriaPct: 6, consultoriaMin: 0
```

- [ ] **Step 2: Atualizar `getInputs()`**

Localizar:

```js
    pctCreditantes: num('pctCreditantes'),
    freteAtual: num('freteAtual'),
    freteNovo: num('freteNovo'),
    operadorLogPct: num('operadorLogPct'),
```

Substituir por:

```js
    pctCreditantes: num('pctCreditantes'),
    freteIndMatriz: num('freteIndMatriz'),
    freteMatrizCliente: num('freteMatrizCliente'),
    freteIndFilial: num('freteIndFilial'),
    freteFilialCliente: num('freteFilialCliente'),
    operadorLogPct: num('operadorLogPct'),
```

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: atualizar DEFAULTS e getInputs para campos de frete em trechos"
```

---

### Task 4: Atualizar `calcScenario()` para somar os trechos

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (dentro de `calcScenario()`)

- [ ] **Step 1: Substituir o cálculo de `deltaFreteRS`**

Localizar:

```js
  const deltaLogRS = operadorLogRS - inp.custoLogAtual;
  const deltaFreteRS = inp.freteNovo - inp.freteAtual;
  const beneficioMes = economiaBruta - descontoCliente - consultoria - deltaLogRS - deltaFreteRS;
```

Substituir por:

```js
  const deltaLogRS = operadorLogRS - inp.custoLogAtual;
  const freteAtualTotal = inp.freteIndMatriz + inp.freteMatrizCliente;
  const freteNovoTotal = inp.freteIndFilial + inp.freteFilialCliente;
  const deltaFreteRS = freteNovoTotal - freteAtualTotal;
  const beneficioMes = economiaBruta - descontoCliente - consultoria - deltaLogRS - deltaFreteRS;
```

- [ ] **Step 2: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: calcular delta frete a partir da soma dos trechos atual/novo"
```

---

### Task 5: Verificar a aritmética com script Node.js descartável

**Files:**
- Create (temporário, não committado): `C:\Users\Cadu\fluir-pitch-deck\tmp_verify_frete_trechos.js`

- [ ] **Step 1: Escrever o script de verificação**

```js
// tmp_verify_frete_trechos.js — script descartável, não committar
function assertEqual(actual, expected, label) {
  if (Math.abs(actual - expected) > 0.01) {
    console.error(`FALHOU: ${label} — esperado ${expected}, obteve ${actual}`);
    process.exitCode = 1;
  } else {
    console.log(`OK: ${label} = ${actual}`);
  }
}

// Caso 1: frete novo (ES) mais barato que o atual (SP)
const inp1 = { freteIndMatriz: 3000, freteMatrizCliente: 5000, freteIndFilial: 2000, freteFilialCliente: 3500 };
const freteAtualTotal1 = inp1.freteIndMatriz + inp1.freteMatrizCliente;
const freteNovoTotal1 = inp1.freteIndFilial + inp1.freteFilialCliente;
const deltaFreteRS1 = freteNovoTotal1 - freteAtualTotal1;
assertEqual(freteAtualTotal1, 8000, 'freteAtualTotal (caso 1)');
assertEqual(freteNovoTotal1, 5500, 'freteNovoTotal (caso 1)');
assertEqual(deltaFreteRS1, -2500, 'deltaFreteRS (caso 1 — ganho, frete novo mais barato)');

// Caso 2: frete novo mais caro que o atual
const inp2 = { freteIndMatriz: 2000, freteMatrizCliente: 3000, freteIndFilial: 4000, freteFilialCliente: 4000 };
const freteAtualTotal2 = inp2.freteIndMatriz + inp2.freteMatrizCliente;
const freteNovoTotal2 = inp2.freteIndFilial + inp2.freteFilialCliente;
const deltaFreteRS2 = freteNovoTotal2 - freteAtualTotal2;
assertEqual(freteAtualTotal2, 5000, 'freteAtualTotal (caso 2)');
assertEqual(freteNovoTotal2, 8000, 'freteNovoTotal (caso 2)');
assertEqual(deltaFreteRS2, 3000, 'deltaFreteRS (caso 2 — custo, frete novo mais caro)');

// Caso 3: tudo zerado (defaults) — não deve gerar NaN
const inp3 = { freteIndMatriz: 0, freteMatrizCliente: 0, freteIndFilial: 0, freteFilialCliente: 0 };
const freteAtualTotal3 = inp3.freteIndMatriz + inp3.freteMatrizCliente;
const freteNovoTotal3 = inp3.freteIndFilial + inp3.freteFilialCliente;
const deltaFreteRS3 = freteNovoTotal3 - freteAtualTotal3;
assertEqual(deltaFreteRS3, 0, 'deltaFreteRS (caso 3 — defaults zerados)');

console.log('Verificação concluída.');
```

- [ ] **Step 2: Executar e confirmar que tudo passa**

Run: `node C:\Users\Cadu\fluir-pitch-deck\tmp_verify_frete_trechos.js`

Expected output:
```
OK: freteAtualTotal (caso 1) = 8000
OK: freteNovoTotal (caso 1) = 5500
OK: deltaFreteRS (caso 1 — ganho, frete novo mais barato) = -2500
OK: freteAtualTotal (caso 2) = 5000
OK: freteNovoTotal (caso 2) = 8000
OK: deltaFreteRS (caso 2 — custo, frete novo mais caro) = 3000
OK: deltaFreteRS (caso 3 — defaults zerados) = 0
Verificação concluída.
```

Se algum `FALHOU` aparecer, revisar o Task 4 antes de continuar.

- [ ] **Step 3: Apagar o script descartável**

```bash
rm C:\Users\Cadu\fluir-pitch-deck\tmp_verify_frete_trechos.js
```

(Nada para commitar neste task.)

---

### Task 6: Atualizar `renderFreteLogistica()` para usar a soma dos trechos

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (dentro de `renderFreteLogistica(inp)`)

- [ ] **Step 1: Substituir o cálculo de `freteDiff`**

Localizar:

```js
function renderFreteLogistica(inp) {
  const freteDiff = inp.freteNovo - inp.freteAtual;
  document.getElementById('frete-diff-badge').textContent =
    (freteDiff >= 0 ? '+ ' : '− ') + fmtBRL(Math.abs(freteDiff));
```

Substituir por:

```js
function renderFreteLogistica(inp) {
  const freteAtualTotal = inp.freteIndMatriz + inp.freteMatrizCliente;
  const freteNovoTotal = inp.freteIndFilial + inp.freteFilialCliente;
  const freteDiff = freteNovoTotal - freteAtualTotal;
  document.getElementById('frete-diff-badge').textContent =
    (freteDiff >= 0 ? '+ ' : '− ') + fmtBRL(Math.abs(freteDiff));
```

(O restante da função — bloco do Operador Logístico/`logistica-diff-badge` — não muda.)

- [ ] **Step 2: Verificação visual**

Abrir o arquivo no navegador, preencher Frete Indústria→Matriz = 3000, Matriz→Cliente = 5000, Indústria→Filial = 2000, Filial→Cliente = 3500. Confirmar que a badge "Diferença de frete" mostra `− R$2.500,00` (8000−5500=2500, frete atual maior, então `freteNovoTotal − freteAtualTotal` = 5500−8000 = −2500 → exibido como "− R$2.500,00").

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: badge de frete usa soma dos trechos atual/novo"
```

---

### Task 7: Atualizar `clearAll()` com os novos campos

**Files:**
- Modify: `C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html` (dentro de `clearAll()`)

- [ ] **Step 1: Substituir as linhas de reset**

Localizar:

```js
  document.getElementById('pctCreditantes').value = DEFAULTS.pctCreditantes;
  document.getElementById('freteAtual').value = DEFAULTS.freteAtual;
  document.getElementById('freteNovo').value = DEFAULTS.freteNovo;
  document.getElementById('operadorLogPct').value = DEFAULTS.operadorLogPct;
```

Substituir por:

```js
  document.getElementById('pctCreditantes').value = DEFAULTS.pctCreditantes;
  document.getElementById('freteIndMatriz').value = DEFAULTS.freteIndMatriz;
  document.getElementById('freteMatrizCliente').value = DEFAULTS.freteMatrizCliente;
  document.getElementById('freteIndFilial').value = DEFAULTS.freteIndFilial;
  document.getElementById('freteFilialCliente').value = DEFAULTS.freteFilialCliente;
  document.getElementById('operadorLogPct').value = DEFAULTS.operadorLogPct;
```

- [ ] **Step 2: Verificação visual**

Abrir o arquivo, preencher os 4 campos de frete com valores diferentes de 0, clicar "Limpar dados", confirmar que os 4 campos voltam a 0 e a badge de frete volta a "—" (ou "+ R$0,00", dependendo do valor exibido para zero).

- [ ] **Step 3: Commit**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git add public/fluir_estudo_viabilidade_ES.html
git commit -m "feat: clearAll reseta os campos de frete em trechos"
```

---

### Task 8: Checklist final e publicação

**Files:** nenhum (verificação + deploy)

- [ ] **Step 1: Confirmar que não há mais referências aos campos antigos**

Run: `grep -n "freteAtual\b\|freteNovo\b" C:\Users\Cadu\fluir-pitch-deck\public\fluir_estudo_viabilidade_ES.html`

Expected: nenhuma linha encontrada (note que `freteAtualTotal` e `freteNovoTotal` são nomes de variável diferentes e não devem casar com esse grep se ele usar `\b` corretamente — confirme visualmente que as ocorrências, se houver, são só essas variáveis locais, não os IDs antigos).

- [ ] **Step 2: Repetir o teste de paridade fiscal já validado anteriormente**

Faturamento 1.5M, compras 500k, ICMS SPED 125k, mix 20/80, todos os campos de frete/logística em 0. Confirmar que o Benefício Líquido / Mês continua R$69.268 (Primavera) e R$29.094 (Fim da Primavera) — isso garante que a divisão do frete em trechos não afetou nenhuma fórmula fiscal.

- [ ] **Step 3: Push**

```bash
cd C:\Users\Cadu\fluir-pitch-deck
git push
```

- [ ] **Step 4: Confirmar publicação**

Aguardar build do Cloudflare Pages (1-3 min) e abrir `https://fluir-pitch-deck.pages.dev/fluir_estudo_viabilidade_ES.html` para confirmar que os 4 campos de frete em trechos estão no ar.
