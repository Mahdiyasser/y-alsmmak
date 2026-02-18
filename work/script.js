// ── STAR FIELD ──
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [], W, H;

function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initStars() {
    stars = [];
    for (let i = 0; i < 160; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.01 + 0.003,
            dx: (Math.random() - 0.5) * 0.08
        });
    }
}

let t = 0;
function animateStars() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
        const a = 0.2 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,215,130,${a})`;
        ctx.fill();
        s.x += s.dx;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
    });
    requestAnimationFrame(animateStars);
}

resizeCanvas();
initStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
animateStars();

// ── PARTICLES ──
const particlesWrap = document.getElementById('particles');
const symbols = ['✦', '✧', '☽', '⋆'];

function spawnParticle() {
    const p = document.createElement('span');
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}vw;
        bottom: -20px;
        font-size: ${8 + Math.random() * 12}px;
        color: rgba(201,168,76,${0.25 + Math.random() * 0.45});
        pointer-events: none;
        animation: rise-fade ${4 + Math.random() * 5}s ease-out forwards;
    `;
    particlesWrap.appendChild(p);
    setTimeout(() => p.remove(), 9000);
}
setInterval(spawnParticle, 800);

// ── CURTAIN OPEN ──
function openCurtains() {
    document.getElementById('curtainLeft').style.width = '0';
    document.getElementById('curtainRight').style.width = '0';

    const trigger = document.getElementById('trigger');
    trigger.style.top = '-200px';
    trigger.style.opacity = '0';

    setTimeout(() => {
        document.body.classList.add('open');
        trigger.style.display = 'none';
        revealContent();
    }, 1900);

    try { document.getElementById('audiocracker').play(); } catch(e) {}
}

function revealContent() {
    const ids     = ['archHeader', 'nameBlock', 'wishCard', 'moonHero', 'lanternsRow', 'countdownSection', 'footerName'];
    const delays  = [0, 200, 450, 750, 1000, 1250, 1500];
    ids.forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.classList.add('show');
        }, delays[i]);
    });
}

// ── COUNTDOWN ──
const target = new Date("2026-02-18T17:01:00").getTime();

function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

function tick() {
    const dist = target - Date.now();
    if (dist <= 0) {
        clearInterval(timer);
        document.getElementById('countdownGrid').style.display = 'none';
        document.getElementById('completed-msg').style.display = 'block';
        document.querySelector('.countdown-label').style.display = 'none';
        return;
    }
    document.getElementById('cd-days').textContent    = pad(Math.floor(dist / 86400000));
    document.getElementById('cd-hours').textContent   = pad(Math.floor((dist % 86400000) / 3600000));
    document.getElementById('cd-minutes').textContent = pad(Math.floor((dist % 3600000) / 60000));
    document.getElementById('cd-seconds').textContent = pad(Math.floor((dist % 60000) / 1000));
}
const timer = setInterval(tick, 1000);
tick();
