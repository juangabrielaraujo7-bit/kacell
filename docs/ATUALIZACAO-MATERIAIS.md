# Atualização para revisão — 15/10/2026

A identidade visual foi mantida. O card e a página “Contato com líquido” foram removidos, incluindo links relacionados. A URL antiga responde 404.

## Antes e depois

Seção imediatamente após os serviços. Cada fotografia permanece inteira, sem recorte do conteúdo ou retoque. Nas três imagens, o aparelho reparado está à esquerda e a peça danificada à direita. Os cards indicam “Depois” e “Antes” nessa mesma ordem. É possível ampliar a foto.

Pasta de origem: `public/antes e depois/`.

| Arquivo original | Card | Imagem otimizada |
|---|---|---|
| Captura de tela 2026-10-15 120251.png | Traseira restaurada | public/images/results/traseira-restaurada-card.webp |
| Captura de tela 2026-10-15 120314.png | Troca do vidro frontal | public/images/results/vidro-frontal-01-card.webp |
| Captura de tela 2026-10-15 120353.png | Vidro frontal recuperado | public/images/results/vidro-frontal-02-card.webp |

Cada foto também possui versão de 440 pixels para telas menores e versão WebP sem perdas para ampliação. Os originais foram preservados.

## Avaliações do Google

Foram escolhidas apenas três, todas com cinco estrelas. As datas relativas foram copiadas dos registros, com aviso sobre o mês de referência (outubro de 2026), sem inventar datas exatas.

| Arquivo na mesma pasta | Nome preservado | Data do registro | Texto |
|---|---|---|---|
| Captura de tela 2026-10-15 115918.png | Eliezer Martins | 5 meses atrás | Completo |
| Captura de tela 2026-10-15 115958.png | Nivaldo Junior | 2 meses atrás | Primeiro parágrafo de texto, identificado como trecho |
| Captura de tela 2026-10-15 120011.png | luiz silveira | 5 meses atrás | Completo |

Reservadas, sem exibição: Clayton Gori (`115943.png`), Mauricio Ribeiro (`120017.png`) e GUILHERME FRATTES JUNQUEIRA (`120029.png`). Os textos completos das seis avaliações estão em `src/data/reviews.ts`, com referência a cada original. A seção não afirma uma nota geral do estabelecimento.

## Marcas atendidas

Pasta de origem: `public/marcas/`.

| Arquivo original | Marca | Saída |
|---|---|---|
| kisspng-apple-iphone-8-plus-apple-iphone-7-plus-iphone-5s-5b07c88e02bb69.0939343215272367500112.jpg | Apple / iPhone | public/images/brands/iphone.webp |
| 256_144_2.avif | Samsung | public/images/brands/samsung.webp |
| Motorola_new_logo.svg | Motorola | public/images/brands/motorola.svg |
| Xiaomi-Logo.png | Xiaomi | public/images/brands/xiaomi.webp |

Fundos claros de Apple/iPhone e Samsung foram removidos por transparência. Motorola foi preservada em vetor; Xiaomi manteve a transparência e as cores originais. Proporções preservadas, com tamanhos visuais ajustados para equilíbrio no desktop e no celular. Nenhuma logo foi redesenhada.

## Revisão local

Prévia: http://127.0.0.1:4323/ após iniciar `node scripts/serve.mjs`.

Capturas das novas seções: `artifacts/antes-e-depois-1440.png`, `artifacts/antes-e-depois-390.png`, `artifacts/avaliacoes-1440.png` e `artifacts/avaliacoes-390.png`.

Relatório de verificações automatizadas: `artifacts/verification.json`. Atualização validada e autorizada para envio à branch main. As próximas alterações deste site também devem ser enviadas ao GitHub após validação, conforme orientação do responsável.
