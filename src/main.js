const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
let feedbackTimer;
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText('sujith.482@gmail.com'); status.textContent = 'Email copied!'; }
  catch { status.textContent = 'Select the email above to copy it.'; }
  clearTimeout(feedbackTimer); feedbackTimer = setTimeout(() => { status.textContent = ''; }, 4000);
});

// An original, gently rotating point-cloud sculpture. No video or external graphics.
const canvas = document.querySelector('#particle-field');
const ctx = canvas.getContext('2d');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let paused = motionQuery.matches, visible = true, width = 0, height = 0, frame = 0, time = 0, lastTime = 0;
const pointer = { x: 0, y: 0 };
const points = [];
let seed = 1729;
function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
for (let i = 0; i < 6700; i++) {
  const u = random() * Math.PI * 2, v = random() * Math.PI * 2;
  const radius = 1.52 + .47 * Math.cos(v) + .13 * Math.sin(u * 3);
  points.push({ x: radius * Math.cos(u), y: radius * Math.sin(u), z: .56 * Math.sin(v), light: random(), size: .35 + random() * .85 });
}
function resize() {
  width = canvas.clientWidth; height = canvas.clientHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
}
function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  const mobile = width < 650;
  const scale = Math.min(width * (mobile ? .49 : .24), height * .37);
  const cx = width * (mobile ? .93 : .77), cy = height * (mobile ? .47 : .47);
  const a = -.67 + time * .065 + pointer.x * .08, b = .82 + Math.sin(time * .11) * .13 + pointer.y * .06;
  const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
  for (const p of points) {
    const x = p.x * ca - p.y * sa, y = p.x * sa + p.y * ca;
    const yy = y * cb - p.z * sb, z = y * sb + p.z * cb;
    const perspective = 4.7 / (4.7 - z);
    const px = cx + (x * .89 + yy * .22) * scale * perspective;
    const py = cy + (yy * .9 - x * .25) * scale * perspective;
    const alpha = (.12 + (z + 2) / 4 * .58) * (mobile ? .66 : 1);
    ctx.fillStyle = p.light > .92 ? `rgba(226,233,184,${alpha})` : `rgba(${120 + Math.round(p.light * 65)},${157 + Math.round(p.light * 55)},${123 + Math.round(p.light * 52)},${alpha})`;
    ctx.beginPath(); ctx.arc(px, py, p.size * perspective, 0, Math.PI * 2); ctx.fill();
  }
}
function animate(now) {
  frame = 0;
  if (paused || !visible || document.hidden) { lastTime = 0; return; }
  if (lastTime) time += Math.min((now - lastTime) / 1000, .05);
  lastTime = now; draw(); frame = requestAnimationFrame(animate);
}
function syncAnimation() {
  cancelAnimationFrame(frame); frame = 0; lastTime = 0;
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
  motionButton.textContent = paused ? '▷' : 'Ⅱ';
  if (!paused && visible && !document.hidden) frame = requestAnimationFrame(animate);
  else draw();
}
motionButton.addEventListener('click', () => { paused = !paused; syncAnimation(); });
motionQuery.addEventListener('change', event => { paused = event.matches; syncAnimation(); });
document.addEventListener('visibilitychange', syncAnimation);
new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncAnimation(); }).observe(canvas);
window.addEventListener('resize', resize);
document.querySelector('.hero').addEventListener('pointermove', event => { pointer.x = event.clientX / width - .5; pointer.y = event.clientY / height - .5; });
resize(); syncAnimation();
