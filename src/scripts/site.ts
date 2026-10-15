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
document.querySelectorAll<HTMLElement>('[data-result-carousel]').forEach(host=>{
  const slides=[...host.querySelectorAll<HTMLElement>('[data-result-slide]')];
  const stage=host.querySelector<HTMLElement>('.result-stage');
  const count=host.querySelector<HTMLElement>('[data-result-count]');
  const status=host.querySelector<HTMLElement>('[data-result-status]');
  const pause=host.querySelector<HTMLButtonElement>('[data-result-pause]');
  if(!stage || !slides.length) return;
  let active=Math.floor(slides.length/2), paused=false, visible=false, hovered=false;
  let timer:ReturnType<typeof setInterval>|undefined;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const render=(announce=false)=>{
    slides.forEach((slide,i)=>{
      const relative=(i-active+slides.length)%slides.length;
      slide.dataset.position=relative===0?'center':relative===1?'next':'previous';
      slide.inert=i!==active;
      if(i===active) slide.removeAttribute('aria-hidden'); else slide.setAttribute('aria-hidden','true');
    });
    if(count)count.textContent=`${active+1} / ${slides.length}`;
    if(announce && status)status.textContent=slides[active].getAttribute('aria-label') || '';
  };
  const schedule=()=>{
    clearInterval(timer);
    if(paused||!visible||hovered||reduced.matches||document.hidden||host.contains(document.activeElement))return;
    timer=setInterval(()=>{if(document.querySelector('dialog[open]'))return;active=(active+1)%slides.length;render();},4000);
  };
  const move=(direction:number)=>{active=(active+direction+slides.length)%slides.length;render(true);schedule();};
  host.querySelectorAll<HTMLButtonElement>('[data-result-direction]').forEach(button=>button.addEventListener('click',()=>move(Number(button.dataset.resultDirection))));
  pause?.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));const label=pause.querySelector('span');if(label)label.textContent=paused?'Retomar':'Pausar';schedule();});
  stage.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();stage.focus();move(event.key==='ArrowRight'?1:-1);}});
  host.addEventListener('mouseenter',()=>{hovered=true;schedule();});
  host.addEventListener('mouseleave',()=>{hovered=false;schedule();});
  host.addEventListener('focusin',schedule);
  host.addEventListener('focusout',()=>setTimeout(schedule,0));
  document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2}).observe(host);
  let pointer:{x:number;y:number}|null=null,suppressClick=false;
  stage.addEventListener('pointerdown',event=>{pointer={x:event.clientX,y:event.clientY};});
  stage.addEventListener('pointerup',event=>{if(!pointer)return;const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;pointer=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){suppressClick=true;move(dx<0?1:-1);}});
  stage.addEventListener('pointercancel',()=>{pointer=null;});
  stage.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);
  render();
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
