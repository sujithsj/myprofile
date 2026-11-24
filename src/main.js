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

// Minimal signal convergence: complexity becoming clarity.
const canvas = document.querySelector('#architecture-field');
const ctx = canvas.getContext('2d');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let paused = motionQuery.matches, visible = true, width = 0, height = 0, frame = 0, time = 0, lastTime = 0;
function resize() {
  width = canvas.clientWidth; height = canvas.clientHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
}
function draw() {
  if (!ctx || !width || !height) return;
  ctx.clearRect(0, 0, width, height);
  const mobile = width < 650;
  const left = width * (mobile ? .38 : .51);
  const span = width * (mobile ? .8 : .52);
  const center = height * (mobile ? .60 : .48);
  const spread = Math.min(height * .27, 225);
  // Sparse signals resolve into a single direction, suggesting applied intelligence.
  const point = (t, strand) => {
    const resolve = Math.pow(1 - t, 2.8);
    const wave = Math.sin(t * 5.2 + time * .18 + strand * .28) * 12 * Math.sin(Math.PI * t);
    return [left + t * span, center + strand * spread / 4 * resolve + wave * resolve + Math.sin(t * 2.8) * 32];
  };
  const ink = ctx.createLinearGradient(left, 0, left + span, 0);
  ink.addColorStop(0, 'rgba(164,203,181,0)');
  ink.addColorStop(.22, 'rgba(164,203,181,.16)');
  ink.addColorStop(.65, 'rgba(180,220,199,.30)');
  ink.addColorStop(1, 'rgba(164,203,181,0)');
  ctx.lineWidth = .8;
  for (let strand = -4; strand <= 4; strand++) {
    ctx.beginPath();
    for (let step = 0; step <= 100; step++) {
      const [x,y] = point(step / 100, strand);
      step ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
    }
    ctx.strokeStyle = ink; ctx.stroke();
    if (strand % 2 === 0) {
      const t = (time * .035 + (strand + 4) * .107 + .18) % 1;
      const [x,y] = point(t, strand);
      ctx.fillStyle = `rgba(205,235,220,${Math.sin(t * Math.PI) * .65})`;
      ctx.beginPath(); ctx.arc(x,y,1.4,0,Math.PI*2); ctx.fill();
    }
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
resize(); syncAnimation();

// Sticky orientation; scheduled once per frame rather than per scroll event.
const header = document.querySelector('.header');
const progress = document.querySelector('.reading-progress');
const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
const sectionTargets = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
let scrollFrame = 0;
function updateOrientation() {
  scrollFrame = 0;
  header.classList.toggle('scrolled', window.scrollY > 40);
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(window.scrollY / distance, 1) : 0})`;
  let active = -1;
  sectionTargets.forEach((section, index) => { if (section && section.getBoundingClientRect().top <= 155) active = index; });
  sectionLinks.forEach((link, index) => { if (index === active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
}
function scheduleOrientation() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateOrientation); }
window.addEventListener('scroll', scheduleOrientation, { passive: true });
window.addEventListener('resize', scheduleOrientation);
document.addEventListener('toggle', scheduleOrientation, true);
updateOrientation();

// Progressive enhancement: without JavaScript every workflow step stays readable.
const stepList = document.querySelector('.workflow-steps');
const steps = [...stepList.querySelectorAll('.workflow-step')];
const panels = steps.map(step => document.querySelector(step.getAttribute('href')));
stepList.setAttribute('role', 'tablist');
function selectStep(index, focus = false) {
  steps.forEach((step, i) => {
    step.setAttribute('aria-selected', String(i === index));
    step.tabIndex = i === index ? 0 : -1;
    panels[i].hidden = i !== index;
  });
  if (focus) steps[index].focus();
  scheduleOrientation();
}
steps.forEach((step, index) => {
  step.setAttribute('role', 'tab');
  step.setAttribute('aria-controls', panels[index].id);
  panels[index].setAttribute('role', 'tabpanel');
  panels[index].setAttribute('aria-labelledby', step.id);
  panels[index].tabIndex = 0;
  step.addEventListener('click', event => { event.preventDefault(); selectStep(index); });
  step.addEventListener('keydown', event => {
    const keys = { ArrowRight: (index + 1) % steps.length, ArrowLeft: (index - 1 + steps.length) % steps.length, Home: 0, End: steps.length - 1 };
    if (event.key in keys) { event.preventDefault(); selectStep(keys[event.key], true); }
    if (event.key === ' ') { event.preventDefault(); selectStep(index); }
  });
});
selectStep(Math.max(0, panels.findIndex(panel => '#' + panel.id === location.hash)));
window.addEventListener('hashchange', () => {
  const index = panels.findIndex(panel => '#' + panel.id === location.hash);
  if (index >= 0) { selectStep(index); panels[index].scrollIntoView(); }
});
