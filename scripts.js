// Calvin Peck Dobson — portfolio scripts (no dependencies)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- dynamic island nav ----------
   Collapsed to a name pill at the top of the page, opens once you scroll,
   and marks the section you're reading. */
(function island() {
    const nav = document.querySelector('.island');
    if (!nav) return;

    const setOpen = () => nav.classList.toggle('is-open', window.scrollY > 120);
    setOpen();
    window.addEventListener('scroll', setOpen, { passive: true });

    const links = [...nav.querySelectorAll('.island__links a[href^="#"]')];
    const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if (!targets.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(t => io.observe(t));
})();

/* ---------- hero image trail ----------
   Photos drop along the cursor path and fade. On load, a few are placed
   so the hero isn't empty on touch screens. */
(function trail() {
    const hero = document.querySelector('.hero');
    const layer = document.querySelector('.trail');
    if (!hero || !layer) return;

    const sources = JSON.parse(layer.dataset.images || '[]');
    if (!sources.length) return;

    const pool = sources.map(src => {
        const img = new Image();
        img.src = src;
        img.alt = '';
        img.decoding = 'async';
        layer.appendChild(img);
        return img;
    });

    let i = 0;
    let last = { x: -999, y: -999 };
    const gap = () => Math.max(90, hero.clientWidth / 11);

    function stamp(x, y, life = 900) {
        const img = pool[i % pool.length];
        i++;
        img.classList.remove('is-on', 'is-off');
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.setProperty('--r', (Math.random() * 14 - 7).toFixed(1) + 'deg');
        img.style.zIndex = String(i);
        void img.offsetWidth; // restart transition
        img.classList.add('is-on');
        clearTimeout(img._t);
        if (life) img._t = setTimeout(() => img.classList.add('is-off'), life);
    }

    // opening arrangement: a loose pile on the right side of the hero
    const w = hero.clientWidth, h = hero.clientHeight;
    const spots = w > 900
        ? [[0.70, 0.26], [0.86, 0.36], [0.76, 0.50], [0.90, 0.16]]
        : [[0.26, 170], [0.74, 150], [0.50, 190]];
    spots.forEach(([fx, fy], n) => {
        const y = fy > 1 ? fy : fy * h; // small screens use fixed pixel heights
        setTimeout(() => stamp(fx * w, y, 0), reduceMotion ? 0 : 500 + n * 160);
    });

    if (reduceMotion) return;

    let started = false;
    hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        if (Math.hypot(x - last.x, y - last.y) < gap()) return;
        if (!started) {
            started = true;
            layer.classList.add('is-live');
            pool.forEach(img => img.classList.contains('is-on') && setTimeout(() => img.classList.add('is-off'), 200));
        }
        last = { x, y };
        stamp(x, y);
    });
})();

/* ---------- videos: only play when on screen ---------- */
(function videos() {
    const vids = document.querySelectorAll('video[data-autoplay]');
    if (!vids.length) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !reduceMotion) e.target.play().catch(() => {});
            else e.target.pause();
        });
    }, { threshold: 0.25 });
    vids.forEach(v => io.observe(v));
})();

/* ---------- footer year ---------- */
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
