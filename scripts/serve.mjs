import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const config=JSON.parse(await readFile('vercel.json','utf8'));
const headers=Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]));
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
export const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}if((await stat(file)).isDirectory())file=path.join(file,'index.html');res.writeHead(200,{...headers,'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(await readFile(file));}catch{res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}});
if(process.argv[1]?.endsWith('serve.mjs'))server.listen(4323,'127.0.0.1',()=>console.log('Kacell preview: http://127.0.0.1:4323/'));
