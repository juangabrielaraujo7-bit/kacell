# Entrega e revisão

Data: 15 de outubro de 2026.

## Escopo implementado

Home e sete páginas próprias: troca de tela, vidro, bateria, conector de carga, placa, câmeras/áudio/microfone e contato com líquido. Inclui páginas de privacidade e 404, dados centralizados, links de WhatsApp contextuais, endereço, navegação por teclado, FAQ semântico, mapa sob demanda e metadados por página.

A marca verde, a logo fornecida, a fonte Manrope, a abertura escura e as seções alternadas seguem o briefing. A identidade recebeu CSS próprio, com movimento apenas de feedback. Os cards mantêm a ordem e o conteúdo dos sete serviços. A imagem de vidro foi recortada preservando o aparelho e as linhas do vidro; alguns reflexos claros do original são reduzidos porque o quadriculado estava incorporado ao JPEG. Os originais permanecem intocados na pasta local.

## Decisões autorizadas para esta versão

O responsável autorizou seguir com os materiais disponíveis e enviar ao GitHub. Sem fotos reais de reparo, a abertura usa somente a identidade da marca como apoio visual. Nenhuma imagem ilustrativa é apresentada como trabalho realizado. Antes e depois, carrossel de avaliações e fachada ficam ocultos até receber material confirmado; a implementação para inserir esses conteúdos está preparada. A localização mostra endereço, mapa sob demanda e acesso ao Google Maps.

O telefone, endereço, Instagram, quatro marcas atendidas e as condições genéricas vieram do briefing. O site não informa nota do Google, número de clientes, certificações, preço, quantidade de parcelas, juros ou prazo fixo de garantia. O contato pelo WhatsApp permite confirmar horários.

## Materiais para a próxima atualização

- Foto/vídeo real da abertura, montagens de antes e depois e fachada.
- Avaliações reais, com autoria, nota, data e data de conferência.
- Horários de atendimento.
- Condições detalhadas de garantia e parcelamento.
- Confirmação da técnica de preservação do display e disponibilidade por modelo.
- Domínio definitivo, hospedagem e responsáveis pelos acessos.

## Publicação e indexação

O envio autorizado é para GitHub, branch `main`. Nenhuma hospedagem ou domínio é presumido. O build inicial permanece com `noindex`, sem canônica fictícia, sitemap vazio e rastreamento bloqueado. Defina `SITE_URL` e `INDEX_SITE=true` somente no ambiente de produção aprovado e refaça o build. Depois confira sitemap, canônicas, Open Graph e breadcrumbs no domínio real.

Os cabeçalhos de segurança estão declarados para Vercel e são usados pelo servidor dos testes. A resposta da hospedagem, HTTPS, redirecionamentos e HSTS só podem ser confirmados após um deploy real. A CSP permite apenas recursos locais e o iframe de mapa do Google.

## Evidências de verificação

Os resultados efetivamente executados são registrados em `docs/VALIDACAO.md`. Capturas e relatórios detalhados ficam localmente em `artifacts/`, fora do repositório público. Testes de laboratório não equivalem a métricas reais de visitantes. Os dispositivos móveis físicos e a hospedagem final ainda devem ser conferidos.
