# Design: Frete em Trechos (Indústria → Matriz/Filial → Cliente)

## Contexto

O `fluir_estudo_viabilidade_ES.html` recebeu recentemente a feature de Frete/Logística via Operador (spec `2026-06-18-frete-logistica-operador-design.md`), com campos únicos `freteAtual` e `freteNovo` (R$/mês cada).

Para deixar a comparação mais granular e fiel à operação real, o frete passa a ser informado em dois trechos por rota:
- **Frete atual:** Indústria (fábrica) → Matriz SP → Cliente Final
- **Frete novo:** Indústria (fábrica) → Filial ES → Cliente Final

## Objetivo

Substituir os 2 campos únicos (`freteAtual`, `freteNovo`) por 4 campos de trecho, somados internamente para alimentar a mesma fórmula de `deltaFreteRS` já existente. Nenhum outro cálculo (fiscal, logística via operador, tabela, waterfall) muda.

## Mudanças no painel de inputs

**Campos removidos:**
- `Frete atual (Indústria → Matriz SP → Cliente)` (`freteAtual`)
- `Frete novo (Indústria → Filial ES → Cliente)` (`freteNovo`)

**Campos adicionados (agrupados por rota, no lugar dos removidos):**

| Campo | id | Unidade | Default |
|---|---|---|---|
| Frete Indústria → Matriz | `freteIndMatriz` | R$/mês | 0 |
| Frete Matriz → Cliente | `freteMatrizCliente` | R$/mês | 0 |
| Frete Indústria → Filial ES | `freteIndFilial` | R$/mês | 0 |
| Frete Filial ES → Cliente | `freteFilialCliente` | R$/mês | 0 |

Ordem visual: os 2 campos do frete atual primeiro, depois os 2 do frete novo, depois a badge de diferença (`frete-diff-badge`, mantida).

**Não há campos de total** (frete atual total / frete novo total) — só os 4 inputs e a badge final de diferença, para manter o painel compacto.

**Ajuste visual:** o campo da badge `frete-diff-badge` ganha uma classe adicional dedicada `field-compact` (em vez de depender só de `.field-markup`, que já é compartilhada pelo badge de Markup original e pelo badge de diferença de logística — reduzir `.field-markup` direto encolheria os três). Nova regra CSS: `.field-compact { max-width: 180px; }`, aplicada só nesse campo.

```html
<div class="field field-markup field-compact">
  <label>Diferença de frete (novo − atual)</label>
  <div id="frete-diff-badge" class="markup-badge">—</div>
</div>
```

## Mudanças no cálculo

Em `calcScenario()`, a linha atual:

```js
const deltaFreteRS = inp.freteNovo - inp.freteAtual;
```

é substituída por:

```js
const freteAtualTotal = inp.freteIndMatriz + inp.freteMatrizCliente;
const freteNovoTotal = inp.freteIndFilial + inp.freteFilialCliente;
const deltaFreteRS = freteNovoTotal - freteAtualTotal;
```

`deltaFreteRS` mantém o mesmo nome e significado de antes — só passa a ser calculado a partir da soma de 2 trechos em vez de 1 valor único. Nenhum consumidor downstream (`beneficioMes`, `renderCalcTable`, `renderWaterfall`) precisa mudar.

## Mudanças em `renderFreteLogistica(inp)`

A linha atual:

```js
const freteDiff = inp.freteNovo - inp.freteAtual;
```

é substituída por:

```js
const freteAtualTotal = inp.freteIndMatriz + inp.freteMatrizCliente;
const freteNovoTotal = inp.freteIndFilial + inp.freteFilialCliente;
const freteDiff = freteNovoTotal - freteAtualTotal;
```

(mesma soma usada em `calcScenario`, duplicada aqui propositalmente — `renderFreteLogistica` já é uma função independente de `calcScenario`, seguindo o padrão estabelecido por `renderMarkup`.)

## Mudanças em `DEFAULTS` e `getInputs()`

`DEFAULTS`: remove `freteAtual: 0, freteNovo: 0,`, adiciona `freteIndMatriz: 0, freteMatrizCliente: 0, freteIndFilial: 0, freteFilialCliente: 0,`.

`getInputs()`: remove `freteAtual: num('freteAtual'), freteNovo: num('freteNovo'),`, adiciona as 4 chaves correspondentes via `num(...)`.

## Mudanças em `clearAll()`

Os 4 novos campos voltam para `DEFAULTS` (todos 0), substituindo as 2 linhas de reset de `freteAtual`/`freteNovo`.

## Fora de escopo

- Nenhuma fórmula fiscal, de Operador Logístico, consultoria, ou exibição (tabela/waterfall/badges de logística) é alterada.
- Não há campos de total de frete exibidos — só os 4 trechos e a diferença final.
- O botão de "salvar estudo em pasta" pedido pelo usuário é um sub-projeto separado, com seu próprio spec — não faz parte desta mudança.
