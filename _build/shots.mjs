// usage: node shots.mjs steps.json   (json: {w,h,out,steps:[js...]}) ; helper g(sel,f) available
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const cfg = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const helper = "const g=async(sel,f)=>{const L=document.querySelector(sel);__lenis.scrollTo(L.offsetTop+(L.offsetHeight-innerHeight)*f,{immediate:true});await new Promise(r=>setTimeout(r,1700));return scrollY};const to=async(sel,off)=>{const L=document.querySelector(sel);__lenis.scrollTo(L.getBoundingClientRect().top+scrollY+(off||0),{immediate:true});await new Promise(r=>setTimeout(r,1600));return scrollY};const wait=ms=>new Promise(r=>setTimeout(r,ms));";
const port = 9333 + Math.floor(Math.random() * 400);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  `--user-data-dir=/private/tmp/claude-501/-Users-durgesh-Desktop/8e57a20c-1509-49a9-a79c-f478946d5a77/scratchpad/chrome-prof-${port}`, `--window-size=${cfg.w},${cfg.h}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws; for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const j = await r.json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = {}; const errs = [];
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } if (m.method === 'Runtime.exceptionThrown') errs.push(m.params.exceptionDetails.exception?.description?.slice(0, 200)); };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; sock.send(JSON.stringify({ id: i, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: cfg.w, height: cfg.h, deviceScaleFactor: 1, mobile: cfg.w < 761 });
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:5216/?shot=1' });
await sleep(4000);
let n = 0;
for (const js of cfg.steps) {
  const r = await send('Runtime.evaluate', { expression: `(async()=>{${helper}${js}})()`, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) console.log(n, 'ERR', JSON.stringify(r.result.exceptionDetails).slice(0, 300));
  else console.log(n, JSON.stringify(r.result?.result?.value ?? null).slice(0, 160));
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 78 });
  fs.writeFileSync(`${cfg.out}-${n}.jpg`, Buffer.from(s.result.data, 'base64')); n++;
}
console.log('errs', JSON.stringify(errs));
sock.close(); chrome.kill();
if (cfg.sheet) {
  const { execFileSync } = await import('node:child_process');
  execFileSync('python3', ['-c', `
from PIL import Image
n=${n}; cols=${cfg.cols || 2}; W=${cfg.tw || 720}; H=round(W*${cfg.h}/${cfg.w})
rows=(n+cols-1)//cols; sheet=Image.new('RGB',(W*cols,H*rows),(255,255,255))
for i in range(n):
    im=Image.open('${cfg.out}-%d.jpg'%i).resize((W,H)); sheet.paste(im,((i%cols)*W,(i//cols)*H))
sheet.save('${cfg.sheet}',quality=80)`]);
}
