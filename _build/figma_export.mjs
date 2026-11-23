// Static Figma export: renders each section of the live page at 1440x900 (DPR 2),
// extracts every visible HTML text line as an absolutely positioned single-style layer,
// hides that text, and captures the remaining artwork as a plate image.
// usage: node figma_export.mjs  (dev server on :5216 must be running)
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
const OUT = new URL('../figma/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const W = 1440, H = 900, DPR = 2;
const port = 9555 + Math.floor(Math.random() * 300);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  `--user-data-dir=/tmp/mlu-figma-${port}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws; for (let i = 0; i < 60; i++) { try { const j = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = {};
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; sock.send(JSON.stringify({ id: i, method, params })); });
const ev = async js => { const r = await send('Runtime.evaluate', { expression: `(async()=>{${js}})()`, awaitPromise: true, returnByValue: true }); if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DPR, mobile: false });
await send('Page.enable'); await send('Runtime.enable');

const LIB = String.raw`
window.__wait = ms => new Promise(r => setTimeout(r, ms));
window.__to = async y => { if (window.__lenis) { __lenis.scrollTo(y, { immediate: true }); await __wait(120); } window.scrollTo(0, y); await __wait(500); };
window.__freeze = (vp) => {
  document.querySelectorAll('.rv').forEach(e => { e.style.opacity = 1; e.style.transform = 'none'; });
  document.querySelectorAll('.statement__text .w').forEach(w => w.style.opacity = 1);
  if (window.ScrollTrigger && !vp) ScrollTrigger.getAll().forEach(t => t.disable(false));
  if (window.gsap) { gsap.globalTimeline.pause(); gsap.ticker.sleep(); }
  try { const y = window.scrollY; __lenis && __lenis.destroy(); window.__lenis = null; window.scrollTo(0, y); } catch (e) {}
  const st = document.createElement('style'); st.textContent = '*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'; document.head.appendChild(st);
};
window.__extract = (frameTop, frameH, scopeSel, skipSel, includeNav) => {
  const BAKE = '.portal__title,.portal__inscr,.gate__lintel,.gate__cue,svg,.reader,.flyer,.menu,.dock,.sr' + (skipSel ? ',' + skipSel : '');
  const scopes = [...document.querySelectorAll(scopeSel)]; if (includeNav) scopes.push(document.querySelector('.nav'));
  const runs = []; const hide = [];
  const probe = document.createElement('span'); probe.style.cssText = 'position:absolute;left:-9999px;top:0;white-space:pre;visibility:hidden'; document.body.appendChild(probe);
  const effOpacity = el => { let o = 1; for (let e = el; e && e !== document.documentElement; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= parseFloat(cs.opacity); } return o; };
  const rotated = el => { for (let e = el; e && e !== document.body; e = e.parentElement) { const t = getComputedStyle(e).transform; if (t && t !== 'none') { const m = t.match(/matrix(3d)?\(([^)]+)\)/); if (m) { const v = m[2].split(',').map(Number); if (m[1] ? (Math.abs(v[1]) > 1e-3 || Math.abs(v[4]) > 1e-3) : (Math.abs(v[1]) > 1e-3 || Math.abs(v[2]) > 1e-3)) return true; } } } return false; };
  const clipRects = el => { const out = []; for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible' || cs.clipPath !== 'none') out.push(e.getBoundingClientRect()); } return out; };
  const colorWithAlpha = (c, a) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return c; const v = m[1].split(',').map(s => parseFloat(s)); const al = (v.length > 3 ? v[3] : 1) * a; return 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ',' + (+al.toFixed(3)) + ')'; };
  for (const scope of scopes) {
    const tw = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = []; let n; while ((n = tw.nextNode())) if (n.nodeValue.trim()) nodes.push(n);
    for (const node of nodes) {
      const el = node.parentElement; if (!el || el.closest(BAKE)) continue;
      const op = effOpacity(el); if (op < 0.02) continue;
      if (rotated(el)) continue;
      const cs = getComputedStyle(el);
      if (cs.webkitTextFillColor && cs.webkitTextFillColor.indexOf('rgba(0, 0, 0, 0)') === 0) continue;
      const clips = clipRects(el);
      const txt = node.nodeValue; const chars = [];
      for (let i = 0; i < txt.length; i++) {
        const r = document.createRange(); r.setStart(node, i); r.setEnd(node, i + 1);
        const rs = r.getClientRects(); if (!rs.length) { chars.push({ c: txt[i], r: null }); continue; }
        chars.push({ c: txt[i], r: rs[0] });
      }
      // group into line runs
      const lines = []; let cur = null;
      const first = el.firstChild === node || (el.childNodes[0] && el.childNodes[0].nodeType === 3 && el.childNodes[0] === node);
      const fl = getComputedStyle(el, '::first-letter');
      const hasDrop = first && fl && fl.cssFloat === 'left' && parseFloat(fl.fontSize) > parseFloat(cs.fontSize) * 1.5;
      chars.forEach((ch, i) => {
        if (!ch.r || ch.r.width === 0 && /\s/.test(ch.c)) { if (cur) cur.chars.push(ch); return; }
        const isDrop = hasDrop && i === txt.search(/\S/);
        if (!cur || isDrop || cur.drop || Math.abs(ch.r.top - cur.top) > 3) { cur = { top: ch.r.top, chars: [], drop: isDrop }; lines.push(cur); }
        cur.chars.push(ch);
      });
      let ok = true; const out = [];
      for (const ln of lines) {
        const real = ln.chars.filter(c => c.r && c.r.width > 0 && /\S/.test(c.c));
        if (!real.length) continue;
        let s = ln.chars.map(c => c.c).join('').replace(/\s+$/, '').replace(/^\s+/, '');
        if (!s) continue;
        const left = Math.min(...real.map(c => c.r.left)), right = Math.max(...real.map(c => c.r.right));
        const top = Math.min(...real.map(c => c.r.top)), bottom = Math.max(...real.map(c => c.r.bottom));
        const sty = ln.drop ? fl : cs;
        const tt = sty.textTransform;
        if (tt === 'uppercase') s = s.toUpperCase(); else if (tt === 'lowercase') s = s.toLowerCase();
        // hyphenation: line ends inside a word
        const lastIdx = chars.indexOf(real[real.length - 1]);
        const nextCh = txt[lastIdx + 1];
        if (!ln.drop && cs.hyphens === 'auto' && /[A-Za-zÄÖÜäöüß]$/.test(s) && nextCh && /[A-Za-zÄÖÜäöüß]/.test(nextCh)) s += '-';
        for (const c of clips) if (left < c.left - 1 || right > c.right + 1 || top < c.top - 1 || bottom > c.bottom + 1) ok = false;
        const docTop = top + window.scrollY - frameTop;
        if (docTop < -2 || docTop + (bottom - top) > frameH + 2) ok = false;
        // justify: measure natural width
        let ws = 0;
        if (cs.textAlign === 'justify' && !ln.drop) {
          probe.style.font = cs.font; probe.style.letterSpacing = cs.letterSpacing; probe.style.textTransform = 'none'; probe.style.fontKerning = cs.fontKerning;
          probe.textContent = s; const nat = probe.getBoundingClientRect().width; const sp = (s.match(/ /g) || []).length;
          if (sp && (right - left) - nat > 0.5 && lines.indexOf(ln) < lines.length - 1) ws = ((right - left) - nat) / sp;
        }
        out.push({ s, x: +left.toFixed(2), y: +docTop.toFixed(2), h: +(bottom - top).toFixed(2), w: +(right - left).toFixed(2),
          ff: sty.fontFamily, fs: sty.fontSize, fw: sty.fontWeight, ls: sty.letterSpacing, ws: +ws.toFixed(3), fk: cs.fontFeatureSettings, nv: cs.fontVariantNumeric,
          color: colorWithAlpha(sty.color, op), shadow: cs.textShadow });
      }
      if (!ok || !out.length) continue;
      runs.push(...out); hide.push(node);
    }
  }
  probe.remove();
  hide.forEach(node => { const sp = document.createElement('mlu-t'); sp.style.cssText = 'color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important'; node.parentNode.insertBefore(sp, node); sp.appendChild(node); });
  return runs;
};`;

const SECTIONS = [
  { name: 'hero', sel: '.portal', mode: 'vp', nav: true, setup: `await __to(0); await __wait(3200);` },
  { name: 'statement', sel: '.statement', mode: 'flow' },
  { name: 'chronik', sel: '.chronik', mode: 'flow', setup: `document.querySelector('.odo').style.position='relative'; document.querySelector('.odo').style.top='0';` },
  { name: 'library', sel: '.library', mode: 'flow' },
  { name: 'letter', sel: '.post', mode: 'flow', setup: `const L=document.querySelector('.post'); await __to(L.offsetTop + (L.offsetHeight - innerHeight) / 2); await __wait(6200);` },
  { name: 'research', sel: '.micro', mode: 'vp', setup: `const L=document.querySelector('.micro'); await __to(L.offsetTop + 2); await __wait(1600);` },
  { name: 'halle', sel: '.vista', mode: 'vp', setup: `const L=document.querySelector('.vista'); await __to(L.offsetTop + 2); await __wait(2000);` },
  { name: 'world', sel: '.world', mode: 'flow', setup: `const L=document.querySelector('.world'); await __to(L.offsetTop); await __wait(4200);` },
  { name: 'news', sel: '.press', mode: 'flow', setup: `const L=document.querySelector('.press'); await __to(L.offsetTop); await __wait(1500);` },
  { name: 'gate', sel: '.gate', mode: 'vp', setup: `const L=document.querySelector('.gate'); await __to(L.offsetTop + (L.offsetHeight - innerHeight) * .97); await __wait(1800);` },
  { name: 'footer', sel: '.foot', mode: 'flow' }
];

const ONLY = process.argv.slice(2);
const prev = ONLY.length && fs.existsSync(`${OUT}manifest.json`) ? JSON.parse(fs.readFileSync(`${OUT}manifest.json`)) : [];
const manifest = [];
for (const sec of SECTIONS) {
  if (ONLY.length && !ONLY.includes(sec.name)) { const p = prev.find(m => m.name === sec.name); if (p) manifest.push(p); continue; }
  await send('Page.navigate', { url: 'http://localhost:5216/?lang=en' });
  await sleep(800);
  await ev(`try{localStorage.setItem('mlu-lang','en')}catch(e){}; return 1`);
  await send('Page.navigate', { url: 'http://localhost:5216/?lang=en&r=' + sec.name });
  await sleep(3600);
  await ev(`${LIB}; return document.documentElement.lang`);
  // generic: scroll the section into view so reveals fire, then section setup
  await ev(`const L=document.querySelector('${sec.sel}'); await __to(L.offsetTop); await __wait(1600); { ${sec.setup || ''} } return 1`);
  const info = await ev(`
    const __y0 = window.scrollY; __freeze(${sec.mode === 'vp'}); await __wait(200); if ('${sec.mode}'==='vp' && Math.abs(window.scrollY-__y0)>1) window.scrollTo(0,__y0); await __wait(150);
    const L=document.querySelector('${sec.sel}');
    if (${!sec.nav}) document.querySelector('.nav').style.display='none';
    let top, h;
    if ('${sec.mode}'==='vp') { top = window.scrollY; h = innerHeight; }
    else { await __to(L.offsetTop); top = L.getBoundingClientRect().top + window.scrollY; h = L.offsetHeight; }
    const runs = __extract(top, h, '${sec.sel}', '', ${!!sec.nav});
    return { top, h: Math.round(h), runs };`);
  const parts = [];
  if (sec.mode === 'vp') {
    const yNow = await ev(`return window.scrollY`); if (Math.abs(yNow - info.top) > 0.5) console.log('WARN scroll drift', sec.name, info.top, yNow);
    const s = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${OUT}${sec.name}-0.png`, Buffer.from(s.result.data, 'base64')); parts.push(0);
  } else {
    for (let y = 0; y < info.h; y += H) {
      await ev(`await __to(${Math.round(info.top + y)}); return 1`);
      const sy = await ev(`return window.scrollY`);
      const off = Math.round(info.top + y) - sy; // when scroll is clamped at page end
      const s = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${OUT}${sec.name}-${y}.png`, Buffer.from(s.result.data, 'base64')); parts.push([y, off]);
    }
  }
  manifest.push({ name: sec.name, h: info.h, mode: sec.mode, parts, runs: info.runs });
  console.log(sec.name, info.h, info.runs.length, 'text layers');
}
fs.writeFileSync(`${OUT}manifest.json`, JSON.stringify(manifest));
sock.close(); chrome.kill();
