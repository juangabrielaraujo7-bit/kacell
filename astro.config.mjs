import { defineConfig } from 'astro/config';
const site = process.env.SITE_URL?.replace(/\/$/, '');
if (site && (!site.startsWith('https://') || new URL(site).pathname !== '/')) {
  throw new Error('SITE_URL deve ser a origem HTTPS do domínio definitivo, sem caminho.');
}
if (process.env.INDEX_SITE === 'true' && !site) throw new Error('Defina SITE_URL antes de habilitar a indexação.');
export default defineConfig({ site, output: 'static', trailingSlash: 'always', build: { inlineStylesheets: 'never' }, vite: { build: { assetsInlineLimit: 0 } }, devToolbar: { enabled: false } });
