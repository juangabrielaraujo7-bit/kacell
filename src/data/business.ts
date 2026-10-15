export const business = {
  name: 'Kacell Assistência Técnica e Acessórios',
  phone: '(15) 99749-2826',
  whatsapp: '5515997492826',
  address: 'R. Cel. Nogueira Padilha, 1179',
  neighborhood: 'Vila Hortência', city: 'Sorocaba', state: 'SP', postalCode: '18020-002',
  maps: 'https://maps.app.goo.gl/ygaGbigbcGGphaYy7',
  instagram: 'https://www.instagram.com/kacellmundodatecnologia/',
  hours: null as string | null,
  heroMedia: null as { src: string; alt: string; width: number; height: number } | null,
  facade: null as { src: string; alt: string; width: number; height: number } | null,
};
export const whatsappUrl = (service?: string) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(service ? `Olá, Kacell! Vim pelo site e gostaria de um orçamento para ${service}. Meu aparelho é:` : 'Olá, Kacell! Vim pelo site e gostaria de um orçamento para meu aparelho.')}`;
export type Review = { author: string; text: string; rating: number; date: string };
export const reviews: Review[] = [];
export const reviewsUpdatedAt: string | null = null;
export const results: { src: string; alt: string; caption: string; width: number; height: number }[] = [];
export const homeFaq = [
  { q: 'O orçamento é gratuito?', a: 'Sim, o orçamento é gratuito. Conte pelo WhatsApp o que aconteceu e informe a marca e o modelo do aparelho. A necessidade de avaliação presencial será orientada pela equipe.' },
  { q: 'Os reparos têm garantia?', a: 'Sim. A Kacell oferece garantia nos reparos. Consulte o prazo, a cobertura e as condições para o serviço do seu aparelho antes de autorizar o atendimento.' },
  { q: 'Meu aparelho fica pronto no mesmo dia?', a: 'Alguns reparos podem ser feitos no mesmo dia. O prazo depende do serviço, da avaliação do aparelho e da disponibilidade de peças. Confirme com a equipe.' },
  { q: 'Posso parcelar o reparo?', a: 'Sim, há opção de parcelamento. Consulte com a equipe a quantidade de parcelas, os meios de pagamento e as condições aplicáveis ao seu orçamento.' },
  { q: 'Vocês também atendem tablets?', a: 'Sim, atendemos celulares e tablets. Informe a marca, o modelo e o problema para consultar a disponibilidade do reparo.' },
  { q: 'Qual a diferença entre trocar o vidro e a tela?', a: 'A troca de vidro pode ser uma opção quando a imagem e o toque estão preservados. Quando o display ou o toque apresentam falhas, pode ser necessário substituir o conjunto de tela. A indicação depende da avaliação do aparelho.' },
  { q: 'Onde fica a Kacell?', a: 'Estamos na R. Cel. Nogueira Padilha, 1179, Vila Hortência, Sorocaba - SP, CEP 18020-002. Veja a rota na seção de localização e confirme o horário pelo WhatsApp antes de vir.' },
];
