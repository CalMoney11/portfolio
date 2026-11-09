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

/* ---------- route that draws itself as you scroll ----------
   Vanilla take on Skiper UI's "Svg follow scroll" (skiper19). A dotted
   trail runs down the page over the fixed topo map. The orange line
   follows your scroll and the tag counts marathon miles. */
(function route() {
    const host = document.querySelector('.route');
    const main = host && host.parentElement;
    if (!host || !main) return;

    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    const ghost = document.createElementNS(NS, 'path');
    const line = document.createElementNS(NS, 'path');
    const marker = document.createElementNS(NS, 'g');
    ghost.setAttribute('class', 'route__ghost');
    line.setAttribute('class', 'route__line');
    marker.setAttribute('class', 'route__marker');
    marker.innerHTML = '<circle r="14"></circle><circle r="6"></circle>';
    svg.append(ghost, line, marker);
    host.appendChild(svg);

    const tag = document.createElement('span');
    tag.className = 'route__tag';
    tag.setAttribute('aria-hidden', 'true');
    main.appendChild(tag); // sits above the sections so photos never cover it

    let L = 0, samples = [], current = 0, target = 0, raf = 0;

    function build() {
        const w = main.clientWidth;
        const h = main.scrollHeight;
        svg.setAttribute('width', w);
        svg.setAttribute('height', h);
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

        // run in the side margins, cross over at the top of each section
        const content = Math.min(w, 1240);
        const side = Math.max(12, (w - content) / 2 + Math.min(56, w * 0.04)) * 0.5;
        const xs = [side, w - side];
        const sections = [...main.querySelectorAll(':scope > .section')];
        const mainTop = main.getBoundingClientRect().top + window.scrollY;
        const ys = sections.map(s => s.getBoundingClientRect().top + window.scrollY - mainTop);
        ys.push(h - 40);

        let d = `M ${xs[0]} 0`;
        let x = xs[0];
        ys.forEach((y, i) => {
            const nextY = ys[i + 1];
            const sweep = Math.min(w * 0.42, 520);
            // cross the page in the gap above the section
            const to = i % 2 === 0 ? xs[1] : xs[0];
            const dir = to > x ? 1 : -1;
            const cy = y + 70;
            d += ` C ${x} ${cy - 40}, ${x + dir * sweep} ${cy - 90}, ${(x + to) / 2} ${cy}`;
            d += ` S ${to} ${cy + 40}, ${to} ${cy + 160}`;
            x = to;
            if (nextY === undefined) return;
            // travel down the margin with one small loop part way
            const loopY = cy + 160 + (nextY - cy - 160) * 0.45;
            const r = Math.min(70, side * 0.9 + 20);
            d += ` L ${x} ${loopY - 60}`;
            if (side > 40) d += ` C ${x} ${loopY + 80}, ${x - dir * r * 2} ${loopY + 80}, ${x - dir * r} ${loopY}`;
            d += ` S ${x} ${loopY - 50}, ${x} ${loopY + 40}`;
            d += ` L ${x} ${nextY - 40}`;
        });

        ghost.setAttribute('d', d);
        line.setAttribute('d', d);
        L = line.getTotalLength();
        line.style.strokeDasharray = `${L} ${L}`;

        // y position along the path, kept monotonic so loops don't jump back
        samples = [];
        let maxY = 0;
        const N = 900;
        for (let n = 0; n <= N; n++) {
            const pt = line.getPointAtLength((L * n) / N);
            maxY = Math.max(maxY, pt.y);
            samples.push(maxY);
        }
        update(true);
    }

    function lengthAtY(y) {
        let lo = 0, hi = samples.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            samples[mid] < y ? (lo = mid + 1) : (hi = mid);
        }
        return (L * lo) / (samples.length - 1);
    }

    function draw(len) {
        line.style.strokeDashoffset = String(L - len);
        const pt = line.getPointAtLength(Math.max(0.01, len));
        marker.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
        marker.style.opacity = len < 4 ? '0' : '1';
        tag.style.opacity = marker.style.opacity;
        tag.style.left = pt.x + 'px';
        tag.style.top = pt.y + 'px';
        tag.textContent = 'Mile ' + ((len / L) * 26.2).toFixed(1);
    }

    function update(jump) {
        const mainTop = main.getBoundingClientRect().top;
        target = lengthAtY(window.innerHeight * 0.55 - mainTop);
        if (jump || reduceMotion) { current = target; draw(current); return; }
        if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
        current += (target - current) * 0.18;
        if (Math.abs(target - current) < 0.5) current = target;
        draw(current);
        raf = current === target ? 0 : requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', () => update(false), { passive: true });
    let t;
    new ResizeObserver(() => { clearTimeout(t); t = setTimeout(build, 120); }).observe(main);
    build();
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
