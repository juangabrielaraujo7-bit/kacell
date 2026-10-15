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
document.querySelectorAll<HTMLElement>('[data-review-motion]').forEach(host=>{
  const button=host.querySelector<HTMLButtonElement>('[data-review-pause]');
  button?.addEventListener('click',()=>{
    const paused=host.dataset.paused!=='true';
    host.dataset.paused=String(paused);
    button.setAttribute('aria-pressed',String(paused));
    const label=button.querySelector('span');
    if(label) label.textContent=paused?'Retomar avaliações':'Pausar avaliações';
  });
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
