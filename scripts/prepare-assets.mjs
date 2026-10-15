// Deterministic cutouts of the supplied files; no image generation or replacement.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const out='public/images';
await mkdir(out,{recursive:true});
const files=[['troca de tela.jpg','troca-de-tela',155],['troca de vidro.jpg','troca-de-vidro',165],['trocar bateria.jpg','troca-de-bateria',150],['conector de carga.jpg','conector-de-carga',130],['placa reparo.jpg','reparo-de-placa',160],['microfones.jpg','camera-audio-microfone',160],['contato com o liquido.jpg','contato-com-liquido',145]];
function inPolygon(x,y,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const [xi,yi]=poly[i],[xj,yj]=poly[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;}return inside;}
const report=[];
for(const [file,name,threshold] of files){
  const {data,info}=await sharp(file).resize(1200,1200).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const {width:w,height:h}=info, total=w*h, removed=new Uint8Array(total), queue=new Int32Array(total);let head=0,tail=0;
  const isBackground=(p)=>{const i=p*4,r=data[i],g=data[i+1],b=data[i+2];return Math.min(r,g,b)>threshold&&Math.max(r,g,b)-Math.min(r,g,b)<24;};
  const add=(p)=>{if(!removed[p]&&isBackground(p)){removed[p]=1;queue[tail++]=p;}};
  for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}
  while(head<tail){const p=queue[head++],x=p%w,y=Math.floor(p/w);if(x>0)add(p-1);if(x<w-1)add(p+1);if(y>0)add(p-w);if(y<h-1)add(p+w);}
  if(name==='troca-de-vidro'){
    // Transparent glass was supplied with a baked checkerboard. Preserve the phone
    // and dark/colored fracture lines while clearing neutral checkerboard in glass.
    const phone=[[.09,.67],[.58,.29],[.64,.28],[.87,.39],[.91,.44],[.89,.51],[.43,.85],[.36,.87],[.11,.74]];
    for(let p=0;p<total;p++){const i=p*4;if(!inPolygon((p%w)/w,Math.floor(p/w)/h,phone)&&Math.min(data[i],data[i+1],data[i+2])>170&&Math.max(data[i],data[i+1],data[i+2])-Math.min(data[i],data[i+1],data[i+2])<37)removed[p]=1;}
  }
  // Remove isolated JPEG noise in the exterior, preserving all substantial parts.
  const visited=new Uint8Array(total);const part=new Int32Array(total);
  for(let p=0;p<total;p++){if(removed[p]||visited[p])continue;let a=0,b=1;part[0]=p;visited[p]=1;while(a<b){const q=part[a++],x=q%w,y=Math.floor(q/w);for(const n of [x>0?q-1:-1,x<w-1?q+1:-1,y>0?q-w:-1,y<h-1?q+w:-1])if(n>=0&&!removed[n]&&!visited[n]){visited[n]=1;part[b++]=n;}}if(b<35)for(let i=0;i<b;i++)removed[part[i]]=1;}
  let left=w,top=h,right=0,bottom=0;
  for(let p=0;p<total;p++){if(removed[p])data[p*4+3]=0;else{const x=p%w,y=Math.floor(p/w);left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}}
  const transparent=await sharp(data,{raw:info}).extract({left,top,width:right-left+1,height:bottom-top+1}).png().toBuffer();
  for(const size of [400,640,960])await sharp(transparent).resize(size,size,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:86,alphaQuality:100}).toFile(`${out}/${name}-${size}.webp`);
  report.push({file,output:name,originalAlpha:false,alpha:true,removedPixels:removed.reduce((a,b)=>a+b,0)});
}
const logoFile='Logo KACELL com circuitos verdes.png';
const meta=await sharp(logoFile).metadata();
await sharp(logoFile).resize(340,170,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:88}).toFile(`${out}/logo.webp`);
const symbol=await sharp(logoFile).extract({left:Math.round(meta.width*.377),top:Math.round(meta.height*.09),width:Math.round(meta.width*.25),height:Math.round(meta.width*.25)}).png().toBuffer();
await sharp(symbol).resize(360,360).webp({quality:90}).toFile(`${out}/symbol.webp`);
await sharp(symbol).resize(64,64).png().toFile('public/favicon.png');
const socialLogo=await sharp(logoFile).resize(760,390,{fit:'inside'}).toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#111311'}}).composite([{input:socialLogo,gravity:'center'}]).jpeg({quality:90}).toFile(`${out}/social.jpg`);
await mkdir('artifacts',{recursive:true});
await writeFile('artifacts/asset-report.json',JSON.stringify({logo:meta,images:report},null,2));
const cells=[];
for(let i=0;i<files.length;i++){const input=await sharp(`${out}/${files[i][1]}-640.webp`).resize(280,280).flatten({background:'#edf0eb'}).png().toBuffer();cells.push({input,left:(i%4)*300+10,top:Math.floor(i/4)*300+10});}
await sharp({create:{width:1200,height:600,channels:3,background:'#dce3d7'}}).composite(cells).png().toFile('artifacts/cutouts.png');
console.log('Prepared seven image sets, original logo, favicon and sharing image.');
