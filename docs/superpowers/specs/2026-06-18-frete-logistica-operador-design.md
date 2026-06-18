# Design: Frete e Logística via Operador (Indústria → Filial ES)

## Contexto

O `fluir_estudo_viabilidade_ES.html` hoje calcula o impacto de custos incrementais de logística e frete usando dois campos percentuais simples (`deltaLogPct`, `deltaFretePct`), aplicados direto sobre o faturamento.

Existe um perfil de cliente cuja operação é: **Indústria (fábrica) → Filial ES → Cliente Final**, a ser comparada com a operação atual: **Indústria (fábrica) → Matriz SP → Cliente Final**. Para esses casos, o consultor precisa apresentar um número claro da diferença real de frete e de logística entre as duas rotas — não uma estimativa percentual.

Toda a lógica fiscal (ICMS, desconto de compensação, economia bruta, cenários Primavera/Fim da Primavera, consultoria, parity, KPIs, gauges, projeção de 24 meses, campo de markup) **permanece inalterada**. Esta mudança afeta exclusivamente as linhas 7 e 8 da tabela de cálculo (Δ Logística e Δ Frete) e os campos de input que as alimentam.

## Objetivo

Substituir os campos percentuais de Δ Logística/Δ Frete por uma estrutura que compara custo atual vs. custo novo em valores reais, calculando a diferença automaticamente — tornando o argumento de venda mais concreto e rastreável para o cliente.

## Mudanças no painel de inputs

**Seção renomeada:** "Custos Incrementais e Consultoria" → "Frete, Logística e Consultoria"

**Campos removidos:**
- `Δ Logística ES − SP (% do faturamento)` (`deltaLogPct`)
- `Δ Frete ES − SP (% do faturamento)` (`deltaFretePct`)

**Campos adicionados:**

| Campo | id | Unidade | Default |
|---|---|---|---|
| Frete atual (Indústria → Matriz SP → Cliente) | `freteAtual` | R$/mês | 0 |
| Frete novo (Indústria → Filial ES → Cliente) | `freteNovo` | R$/mês | 0 |
| Operador Logístico ES | `operadorLogPct` | % do faturamento | 0 |
| Custo atual da operação logística | `custoLogAtual` | R$/mês | 0 |

**Badges de diferença calculada** (mesmo padrão visual do campo de markup já existente — `.markup-badge`):
- Ao lado do par de frete: mostra `Frete novo − Frete atual` em R$, atualizado em tempo real via `render()`.
- Ao lado do par de logística: mostra o valor do Operador ES convertido para R$ (`operadorLogPct × faturamento`) ao lado do campo, e a diferença `Operador ES (R$) − Custo atual` em outra badge.

**Campos mantidos sem alteração:** Consultoria (% da economia bruta), Consultoria — mínimo mensal.

## Mudanças no cálculo (`calcScenario`)

```js
const operadorLogRS = (inp.operadorLogPct / 100) * inp.faturamento;
const deltaLogRS = operadorLogRS - inp.custoLogAtual;
const deltaFreteRS = inp.freteNovo - inp.freteAtual;
```

Essas duas variáveis substituem o cálculo atual (que usa `deltaLogPct`/`deltaFretePct` × faturamento). O restante da fórmula do Benefício Líquido não muda:

```js
const beneficioMes = economiaBruta - descontoCliente - consultoria - deltaLogRS - deltaFreteRS;
```

## Mudanças na exibição

**Tabela de cálculo (linhas 7 e 8):**
- Continuam rotuladas como `Δ Logística (R$)` e `Δ Frete (R$)`.
- Hoje sempre exibidas em vermelho (custo). Com a nova lógica, se o valor calculado for **negativo** (operação via ES mais barata que a atual), a linha passa a ser exibida com estilo positivo (verde, mesmo padrão das linhas de ganho), já que representa uma economia adicional somada ao benefício.

**Waterfall SVG:**
- As barras de Δ Logística e Δ Frete usam o valor real em R$ calculado (não mais um % aplicado).
- Se o valor for negativo, a barra sobe (ganho) em vez de descer (custo), seguindo a mesma convenção visual das demais barras do waterfall.

## Defaults (`DEFAULTS` object)

Remove:
```js
deltaLogPct: 0, deltaFretePct: 0,
```

Adiciona:
```js
freteAtual: 0, freteNovo: 0, operadorLogPct: 0, custoLogAtual: 0,
```

## `clearAll()`

Os 4 novos campos (`freteAtual`, `freteNovo`, `operadorLogPct`, `custoLogAtual`) voltam para os valores de `DEFAULTS` (todos 0), seguindo o mesmo padrão dos demais campos.

## Fora de escopo

- Nenhuma fórmula fiscal (ICMS SP, desconto de compensação, ICMS ES, economia bruta) é alterada.
- Cenários Primavera / Fim da Primavera permanecem idênticos.
- Parity block, KPIs, gauges, projeção de 24 meses e campo de markup não são tocados.
- Não há toggle entre modelo simples (%) e modelo detalhado (R$) — a estrutura detalhada substitui o modelo percentual para todos os usos do estudo.
