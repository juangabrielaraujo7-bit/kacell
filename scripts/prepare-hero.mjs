import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const source='public/hero/25c7d364-f393-4fa9-954a-8590db0716cb.png';
await mkdir('public/images/hero',{recursive:true});
// Proportional, lossless derivatives preserve the supplied screen and alpha.
for(const width of [300,520,921]){
  await sharp(source).resize({width,withoutEnlargement:true}).webp({lossless:true}).toFile(`public/images/hero/kacell-phone-${width}.webp`);
}
