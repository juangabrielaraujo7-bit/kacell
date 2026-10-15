const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.main-nav');
const dropdown = document.querySelector<HTMLDetailsElement>('.services-dropdown');
document.documentElement.classList.add('js');
const closeMenu = (returnFocus = false) => {
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.setAttribute('aria-label','Abrir menu');
  nav?.classList.remove('is-open');
  if(dropdown) dropdown.open = false;
  if(returnFocus) menuButton?.focus();
};
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav?.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if(event.key !== 'Escape') return;
  if(dropdown?.open) { dropdown.open=false; dropdown.querySelector('summary')?.focus(); }
  else if(menuButton?.getAttribute('aria-expanded')==='true') closeMenu(true);
});
document.addEventListener('click', event => {
  const target = event.target as Element;
  if(!target.closest('.site-header')) closeMenu();
  if(target.closest('.main-nav a')) closeMenu();
  const tracked = target.closest<HTMLAnchorElement>('a[data-event]');
  if(tracked) window.dispatchEvent(new CustomEvent('kacell:conversion', {detail:{event:tracked.dataset.event,page:location.pathname,service:tracked.dataset.service ?? 'geral',position:tracked.dataset.position}}));
});
nav?.addEventListener('focusout', () => { setTimeout(() => { if(!nav.contains(document.activeElement) && document.activeElement!==menuButton) closeMenu(); }, 0); });
matchMedia('(min-width: 1024px)').addEventListener('change', () => closeMenu());
document.querySelector<HTMLButtonElement>('[data-load-map]')?.addEventListener('click', event => {
  const button = event.currentTarget as HTMLButtonElement;
  const host = document.querySelector<HTMLElement>('.map-panel');
  if(!host) return;
  const iframe = document.createElement('iframe');
  iframe.title='Localização da Kacell na R. Cel. Nogueira Padilha, 1179, Sorocaba';
  iframe.src='https://www.google.com/maps?q=R.+Cel.+Nogueira+Padilha,+1179,+Sorocaba,+SP&output=embed';
  iframe.referrerPolicy='no-referrer-when-downgrade';
  iframe.allowFullscreen=true;
  host.replaceChildren(iframe);
  iframe.focus();
  button.remove();
});
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector<HTMLElement>('.review-track');
  const status = carousel.querySelector<HTMLElement>('[data-carousel-status]');
  if(!track) return;
  const update = () => { const cards = [...track.children] as HTMLElement[]; const index = cards.reduce((best, card, i) => Math.abs(card.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0); if(status) status.textContent=`Avaliação ${index+1} de ${cards.length}`; };
  carousel.querySelectorAll<HTMLButtonElement>('[data-direction]').forEach(button => button.addEventListener('click',()=>{ track.scrollBy({left:Number(button.dataset.direction)*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }));
  track.addEventListener('scroll',update,{passive:true});
  track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();track.scrollBy({left:(event.key==='ArrowRight'?1:-1)*track.clientWidth,behavior:'instant'});}});
  update();
});
const gallery = document.querySelector<HTMLDialogElement>('#gallery-dialog');
let galleryTrigger: HTMLButtonElement | null = null;
document.querySelectorAll<HTMLButtonElement>('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{
  if(!gallery) return;
  galleryTrigger=button;
  const img=document.createElement('img');
  img.src=button.dataset.gallerySrc!; img.alt=button.dataset.galleryAlt || '';
  gallery.querySelector('.gallery-image')?.replaceChildren(img);
  const caption=gallery.querySelector('.gallery-caption');
  if(caption) caption.textContent=`${button.dataset.galleryCaption}. Aparelho reparado à esquerda; peça danificada à direita.`;
  gallery.showModal();
}));
gallery?.querySelector('button')?.addEventListener('click',()=>gallery.close());
gallery?.addEventListener('click',event=>{if(event.target===gallery)gallery.close();});
gallery?.addEventListener('close',()=>galleryTrigger?.focus());
