# Design — Rota Segura (Landing de Seguro Auto)

## Direção
Motorsport noturno: fundo full-bleed com carro esportivo em estúdio escuro, overlay em gradiente, tipografia condensada em itálico (sensação de velocidade) e um acento âmbar "farol". Confiança vem do formulário limpo e da faixa de seguradoras parceiras.

## Cores
- `--ink` #07080A (fundo base)
- `--steel` #12151B (superfícies)
- `--line` rgba(255,255,255,.10)
- `--amber` #FFB400 (acento principal, CTAs)
- `--amber-deep` #E89A00
- `--paper` #F4F1EA (texto claro / seção clara)
- `--wa` #25D366 (WhatsApp)

## Tipografia
- Display: Barlow Condensed 700/800 italic, caixa alta, tracking apertado
- Corpo: Poppins 300–600
- Hierarquia: H1 clamp(3rem, 7vw, 6.5rem); eyebrow 12px tracking .3em

## Layout
- Hero 2 colunas assimétricas (7/5): copy à esquerda, card de formulário à direita sobrepondo a borda inferior do hero
- Faixa de logos em marquee em fundo claro (`--paper`)
- Seções: Hero+Form, Seguradoras, Coberturas (lista numerada, não grid de cards), Como funciona (3 passos em linha), CTA final, rodapé
- Botão flutuante WhatsApp fixo no canto inferior direito

## Movimento
- Entrada escalonada no hero (fade + slide), marquee contínuo de logos, linhas de "velocidade" sutis
