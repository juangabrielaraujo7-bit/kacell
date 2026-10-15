import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
await mkdir('public/images/results',{recursive:true});
await mkdir('public/images/brands',{recursive:true});
const photos=[['120251','traseira-restaurada'],['120314','vidro-frontal-01'],['120353','vidro-frontal-02']];
const report=[];
for(const [time,name] of photos){
  const source=`public/antes e depois/Captura de tela 2026-10-15 ${time}.png`;
  const meta=await sharp(source).metadata();
  // Only lossless encoding and a proportional small derivative; no crop or retouch.
  await sharp(source).webp({lossless:true}).toFile(`public/images/results/${name}.webp`);
  await sharp(source).webp({quality:88}).toFile(`public/images/results/${name}-card.webp`);
  await sharp(source).resize({width:440,withoutEnlargement:true}).webp({quality:88}).toFile(`public/images/results/${name}-440.webp`);
  report.push({source,output:`/images/results/${name}.webp`,width:meta.width,height:meta.height});
}
const apple='public/marcas/kisspng-apple-iphone-8-plus-apple-iphone-7-plus-iphone-5s-5b07c88e02bb69.0939343215272367500112.jpg';
for(const [source,name,clearBackground] of [[apple,'iphone',true],['public/marcas/256_144_2.avif','samsung',true],['public/marcas/Xiaomi-Logo.png','xiaomi',false]]){
  const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let left=info.width,top=info.height,right=0,bottom=0;
  for(let p=0;p<info.width*info.height;p++){
    const i=p*4;
    // The monochrome logos have baked white/checkerboard backgrounds, including
    // letter counters. Only those backgrounds are removed; original RGB is kept.
    if(clearBackground){const min=Math.min(data[i],data[i+1],data[i+2]);if(min>180)data[i+3]=0;else if(min>130)data[i+3]=Math.round(data[i+3]*(180-min)/50);}
    if(data[i+3]>12){const x=p%info.width,y=Math.floor(p/info.width);left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
  }
  await sharp(data,{raw:info}).extract({left,top,width:right-left+1,height:bottom-top+1}).resize({width:520,withoutEnlargement:true}).webp({lossless:true}).toFile(`public/images/brands/${name}.webp`);
}
await copyFile('public/marcas/Motorola_new_logo.svg','public/images/brands/motorola.svg');
await mkdir('artifacts',{recursive:true});
await writeFile('artifacts/update-assets.json',JSON.stringify(report,null,2));
const logos=[];for(const [i,name] of ['iphone.webp','samsung.webp','motorola.svg','xiaomi.webp'].entries()){logos.push({input:await sharp('public/images/brands/'+name).resize(250,90,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer(),left:i*280+15,top:25});}
await sharp({create:{width:1120,height:140,channels:3,background:'#f7f8f7'}}).composite(logos).png().toFile('artifacts/brands-updated.png');
console.log(JSON.stringify(report));
