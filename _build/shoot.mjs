// usage: node shoot.mjs W H outprefix "js1" "js2" ...   (each js returns after scrolling; a screenshot is taken after each)
import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [W, H, out, ...steps] = process.argv.slice(2);
const port = 9333 + Math.floor(Math.random() * 400);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  `--user-data-dir=/private/tmp/claude-501/-Users-durgesh-Desktop/8e57a20c-1509-49a9-a79c-f478946d5a77/scratchpad/chrome-prof-${port}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws; for (let i = 0; i < 50; i++) { try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const j = await r.json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = {};
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; sock.send(JSON.stringify({ id: i, method, params })); });
const mobile = +W < 761;
await send('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile });
await send('Page.enable'); await send('Runtime.enable');
await send('Page.navigate', { url: 'http://localhost:5216/?shot=1' });
await sleep(4500);
let n = 0;
for (const js of steps) {
  const r = await send('Runtime.evaluate', { expression: `(async()=>{${js}})()`, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) console.log('ERR', JSON.stringify(r.result.exceptionDetails).slice(0, 300));
  else if (r.result?.result?.value !== undefined) console.log(n, JSON.stringify(r.result.result.value).slice(0, 200));
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 78 });
  fs.writeFileSync(`${out}-${n}.jpg`, Buffer.from(s.result.data, 'base64')); n++;
}
const logs = await send('Runtime.evaluate', { expression: 'JSON.stringify(window.__errs||[])', returnByValue: true });
console.log('errs', logs.result?.result?.value);
sock.close(); chrome.kill();
