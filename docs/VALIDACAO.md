# Verificações executadas

Data: 15/10/2026. Ambiente: Windows, Node 24.18.0, Astro 7.3.8, Google Chrome headless instalado. Build estático local com os cabeçalhos CSP, Referrer-Policy, Permissions-Policy, X-Frame-Options e X-Content-Type-Options previstos para Vercel.

## Resultado

- Build concluído: 10 páginas HTML, incluindo 404, mais robots.txt e sitemap.xml.
- Astro check: 19 arquivos, zero erros, avisos ou sugestões.
- Auditoria npm: zero vulnerabilidades reportadas.
- Navegação: home, sete serviços e privacidade respondendo 200; URL inexistente respondendo 404.
- Todas as páginas públicas com um H1, título e descrição próprios; JSON-LD válido como JSON.
- Links internos, imagens, número internacional e codificação das mensagens de WhatsApp conferidos em todas as páginas.
- Axe: nenhuma violação detectada nos critérios WCAG A/AA selecionados, nas nove páginas testadas. Isso não substitui auditoria humana completa.
- Layout da home e de troca de bateria: 320, 360, 390, 430, 768, 1024, 1440 e 1920 px, sem rolagem horizontal; imagens carregadas.
- Capturas de home e troca de bateria verificadas visualmente em 390 e 1440 px.
- Menu móvel, dropdown, Escape, retorno do foco e fechamento após navegação testados.
- FAQ, mapa inserido somente após clique e evento local de conversão testados.
- Refluxo equivalente a zoom de 200%, orientação horizontal e redução de movimento conferidos.
- Conteúdo, FAQ e navegação utilizáveis sem JavaScript.
- Nenhum erro de console identificado no fluxo verificado.
- Transparência alfa conferida nas 21 variantes de imagens dos serviços.

## Lighthouse

Home, build de produção local, perfil móvel com limitação simulada. Medição final feita sem os testes de navegação concorrentes:

| Indicador | Resultado |
| --- | --- |
| Desempenho | 98/100 |
| Acessibilidade | 100/100 |
| Boas práticas | 100/100 |
| SEO | 66/100 |
| FCP | 1,3 s |
| LCP | 2,3 s |
| TBT | 0 ms |
| CLS | 0 |

SEO foi reduzido pelo bloqueio intencional de indexação enquanto o domínio não é definido. Não remover esse bloqueio em previews. A configuração final de domínio e `INDEX_SITE=true` precisa ser validada em produção. O teste local não aplica todas as regras de cache por caminho da hospedagem, e o Lighthouse ainda sugere ganhos possíveis de cache e compressão de imagens.

São resultados de laboratório de uma execução, não métricas de usuários reais nem garantia de resultados em produção. INP real exige dados de campo.

## Limites da verificação

Safari iOS e Chrome Android em aparelhos físicos não foram testados. HTTPS, redirecionamentos, cabeçalhos efetivamente servidos, domínio, canônicas absolutas, sitemap populado e Search Console dependem da hospedagem definitiva. O WhatsApp foi verificado pelo destino e conteúdo dos links; nenhuma mensagem foi enviada. O conteúdo remoto do Google Maps e a disponibilidade do atendimento não são controlados pelo site.

Antes e depois, avaliações e fachada seguem ocultos porque os materiais não foram fornecidos. Os componentes preparados para galeria e carrossel devem ser revisados com conteúdo real quando forem ativados.

Relatórios completos e capturas: `artifacts/verification.json`, `artifacts/lighthouse.json`, `artifacts/lighthouse-summary.json` e PNGs em `artifacts/`. Esses arquivos de revisão são mantidos localmente.
