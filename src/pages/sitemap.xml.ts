import type { APIRoute } from 'astro';
import { services } from '../data/services';
export const GET: APIRoute = ({site}) => {
  const paths=site && import.meta.env.INDEX_SITE === 'true' ? ['/',...services.map(s=>`/servicos/${s.slug}/`),'/privacidade/'] : [];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${new URL(p,site).href.replace(/&/g,'&amp;')}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
