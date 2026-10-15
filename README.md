# Kacell | Assistência técnica em Sorocaba

Site estático em Astro e TypeScript, com CSS próprio, fonte Manrope local e ícones Tabler. Home, seis páginas de serviços, política de privacidade e página 404. Os botões de contato abrem o WhatsApp com mensagens específicas; não enviam mensagens automaticamente.

## Executar

Requer Node.js 22.12+ (recomendado: Node 24 LTS).

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

O resultado de produção fica em `dist/`. Não é necessário banco de dados, servidor de aplicação ou chave privada. As versões das dependências estão travadas em `package-lock.json`.

## Conteúdo

- `src/data/business.ts`: contatos, endereço, horários, mídia real da abertura, fachada, perguntas, resultados e avaliações.
- `src/data/services.ts`: seis serviços, textos, sintomas, perguntas e serviços relacionados.
- `src/data/reviews.ts`: seis avaliações transcritas e seleção das seis exibidas.
- `src/styles/global.css`: tokens e composição responsiva.
- `src/components/`: cabeçalho, rodapé, cards, FAQ, localização e prova social.
- `public/images/`: imagens otimizadas em WebP com transparência real, em três resoluções.
- `src/scripts/site.ts`: menus, mapa sob demanda, galeria, carrossel e evento de conversão.
- `docs/ENTREGA.md`: decisões, materiais pendentes e validação.

As imagens originais e o briefing foram preservados na pasta local fornecida pelo responsável. Não foram enviados ao repositório público; guarde um backup desses originais. `scripts/prepare-assets.mjs` permite repetir a preparação se os arquivos originais forem colocados na raiz, com seus nomes originais. A geração inicial dos assets já foi concluída: o build não depende desses arquivos.

As marcas atendidas usam as logos fornecidas pelo responsável, com fundos removidos quando necessário, sem redesenho. A logo Kacell também é a fornecida. Veja `docs/ATUALIZACAO-MATERIAIS.md` para a relação dos novos materiais e `scripts/prepare-update-assets.mjs` para reproduzir a otimização.

## GitHub e hospedagem

Destino autorizado: `juangabrielaraujo7-bit/kacell`, branch `main`. O envio ao GitHub não confirma hospedagem ou deploy.

Para Vercel, importar esse repositório. O arquivo `vercel.json` configura build, diretório estático, barras finais e cabeçalhos. Não há fallback de SPA: URLs inexistentes devem responder HTTP 404 e usar `404.html`.

O domínio definitivo ainda precisa ser informado. Por padrão, todas as páginas usam `noindex`, `robots.txt` bloqueia rastreamento e o sitemap não lista URLs. Nenhum domínio fictício é usado nas canônicas.

Para publicar a versão indexável, configurar no ambiente de **produção**:

```dotenv
SITE_URL=https://DOMINIO-DEFINITIVO-APROVADO
INDEX_SITE=true
```

O texto acima é uma instrução, não uma URL canônica publicada. Use a origem real, sem subdiretório. Refaça o build. A configuração exige HTTPS e recusa indexação sem domínio. As URLs canônicas absolutas, Open Graph, sitemap e breadcrumbs usam esse domínio. Em ambientes de preview, manter `INDEX_SITE=false`. O bloqueio de indexação não torna uma página privada; use proteção de preview da hospedagem se necessário.

Após conectar o domínio, conferir HTTPS, redirecionamento HTTP, domínio preferencial, cabeçalhos, sitemap, URLs canônicas e status 404 no host real. HSTS deve ser ativado somente depois de confirmar HTTPS e subdomínios. Não há acesso ou configuração de Search Console nesta entrega.

## Atualizar mídias e avaliações

As listas `results` e `reviews` contêm três fotografias reais e seis avaliações dos materiais recebidos em 15/10/2026. As transcrições estão preservadas em `src/data/reviews.ts`. Não há fotos fictícias, depoimentos inventados ou nota geral presumida.

1. Adicione fotografias reais autorizadas em `public/images/`.
2. Preencha os objetos tipados em `business.ts`, incluindo dimensões e texto alternativo.
3. Para antes e depois, use uma montagem inteira por item. O botão amplia em um diálogo acessível.
4. Para avaliações, transcreva o conteúdo real, autoria, nota e data da fonte. Preencha `reviewsUpdatedAt` e confira o perfil Google. As avaliações passam em duas fileiras, com pausa por botão, foco e mouse, respeitando movimento reduzido.
5. Preencha horário somente após confirmação. Garantia, parcelas e prazo específico nunca devem ser presumidos.
6. Execute as verificações e revise o conteúdo visualmente antes de enviar a alteração.

## Privacidade e medição

Não há analytics, publicidade, formulário, login ou cookies próprios de rastreamento. O mapa só é inserido após clique; fontes e imagens são locais. A política de privacidade descreve esse comportamento.

O evento local `kacell:conversion` prepara uma futura integração autorizada de analytics. Seu `detail` contém apenas `event`, `page`, `service` e `position`. Nenhum destino analítico está configurado, e o conteúdo das mensagens não é coletado. Cliques indicam intenção de contato, não mensagens recebidas ou vendas.

## Verificar

```sh
npm run check
npm run build
npm run verify
npm audit --audit-level=high
```

`verify` usa Google Chrome instalado em modo headless, inicia um servidor local temporário na porta 4322 e grava resultados e screenshots em `artifacts/` (ignorado pelo Git). Confere todas as páginas, links internos, imagens, metadados, número do WhatsApp, acessibilidade automatizada, oito larguras, menu, Escape, foco, FAQ, carregamento do mapa, modo sem JavaScript, redução de movimento e HTTP 404. Safari iOS e Chrome Android reais precisam de verificação em aparelhos.

## Recuperar uma versão

Reverter o commit desejado por `git revert <sha>` e enviar para `main`; nunca usar force push como rollback. Na hospedagem, também é possível restaurar um deploy anterior aprovado. Guarde cópias das mídias e configure autenticação de dois fatores para as contas responsáveis. A manutenção de domínio e contas fica com o responsável pelo projeto.

## Licenças

Manrope: SIL Open Font License, incluída no pacote `@fontsource-variable/manrope`. Tabler Icons: MIT, incluída no pacote `@tabler/icons`. As mídias da Kacell foram fornecidas pelo responsável e não são distribuídas como banco de imagens.
