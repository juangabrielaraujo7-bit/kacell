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


## Avaliações em movimento — revisão posterior

As seis avaliações passam a ser exibidas, em duas colunas verticais com perspectiva no computador e duas fileiras horizontais no celular. Nomes, notas, datas e transcrições foram preservados; Nivaldo continua como trecho identificado. O movimento pausa ao passar o mouse, focar a área ou acionar o botão de pausa. A preferência de movimento reduzido e a navegação sem JavaScript mostram os registros sem animação.

A logo Google Reviews foi fornecida em public/oogle-review-logo-png-google-reviews-transparent.webp. O fundo quadriculado foi removido e a versão otimizada fica em public/images/brands/google-reviews.webp. A nota geral 5,0 foi informada pelo responsável nesta solicitação, sem consulta automática ao Google.

O efeito do componente React enviado foi adaptado para Astro e CSS na arquitetura existente, sem dependências adicionais.


## Hero com celular — 15/10/2026

Origem: public/hero/25c7d364-f393-4fa9-954a-8590db0716cb.png (921 × 1707, com transparência). O aparelho aparece inteiro à direita do título e dos botões no desktop e abaixo deles no celular. Foram produzidas versões WebP sem perdas, com 300, 520 e 921 pixels de largura, em public/images/hero/. A tela e o conteúdo da imagem não foram retocados.

O brilho acompanha o canal de transparência por drop-shadow em CSS, com luz difusa adicional atrás do aparelho. Gradientes laterais usam baixa opacidade; efeitos mais fracos no celular. Estilos em src/styles/hero.css; preparação reproduzível em scripts/prepare-hero.mjs.

Conferência: sete larguras (320, 390, 430, 768, 1024, 1440 e 1920 pixels), imagem completa, ordem dos elementos, altura compacta, ausência de rolagem horizontal, transparência e contraste. Capturas em artifacts/hero-1440.png e artifacts/hero-390.png; relatório em artifacts/hero-verification.json.


## Mapa automático e carrossel Antes e depois

Conforme confirmação do responsável, o efeito do prompt foi aplicado às fotos de Antes e depois. A foto central fica nítida e as laterais aparecem menores, com perspectiva e desfoque. Há avanço automático a cada quatro segundos enquanto a seção está visível, botões, teclado e gesto horizontal. A rotação pausa durante interação, ao abrir a ampliação ou por botão; movimento reduzido desativa a rotação automática. Sem JavaScript, as três fotos continuam disponíveis em grade. As imagens reais e suas legendas foram preservadas.

O mapa Google é carregado automaticamente no HTML, com link direto para abrir a localização. O botão Carregar mapa foi removido. A descrição de privacidade foi atualizada para refletir o carregamento automático.

Verificações específicas em scripts/verify-result-carousel.mjs; capturas em artifacts/carrossel-resultados-1440.png, artifacts/carrossel-resultados-390.png e artifacts/mapa-automatico-1440.png.
