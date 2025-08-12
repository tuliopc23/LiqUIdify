(function () {
  if (window.__liquidifyEnhancements) return;
  window.__liquidifyEnhancements = true;

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bound = new WeakSet();
  const once = (el) => el && !bound.has(el) && bound.add(el);

  function initHeroTilt(root = document) {
    if (prefersReducedMotion) return;
    const hero = root.querySelector('[data-hero]');
    if (!once(hero)) return;
    const tilt = (e) => {
      const r = hero.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientY - cy) / r.height;
      const dy = (e.clientX - cx) / r.width;
      hero.style.setProperty('--lg-tilt-x', `${dx * 18}deg`);
      hero.style.setProperty('--lg-tilt-y', `${-dy * 18}deg`);
      hero.style.setProperty('--lg-spotlight-x', `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty('--lg-spotlight-y', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    hero.addEventListener('pointermove', tilt, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--lg-tilt-x', '0deg');
      hero.style.setProperty('--lg-tilt-y', '0deg');
    });
  }

  function initReadingProgress() {
    let bar = document.getElementById('progressBar');

    // Create once globally if missing
    if (!bar) {
      const wrap = document.createElement('div');
      wrap.className = 'reading-progress';
      const inner = document.createElement('div');
      inner.className = 'reading-progress-bar';
      inner.id = 'progressBar';
      wrap.appendChild(inner);
      // Insert at top of body so it's available on all pages
      document.body.prepend(wrap);
      bar = inner;
    }

    if (!once(bar)) return;

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.setProperty('--progress', String(p));
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initBlurUp(root = document) {
    const imgs = Array.from(root.querySelectorAll('img[data-src]')).filter((i) => !bound.has(i));
    if (!imgs.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const img = e.target;
          once(img);
          img.src = img.dataset.src;
          img.onload = () => img.classList.add('loaded');
          io.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach((i) => io.observe(i));
  }

  function initBeforeAfter(root = document) {
    const sliders = Array.from(root.querySelectorAll('.before-after')).filter((el) => !bound.has(el));
    sliders.forEach((el) => {
      once(el);
      const onMove = (x) => {
        const r = el.getBoundingClientRect();
        const split = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
        el.style.setProperty('--split', `${split}%`);
      };
      el.addEventListener('pointermove', (e) => onMove(e.clientX), { passive: true });
      el.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    });
  }

  function initTocProgress(root = document) {
    if (prefersReducedMotion) return;
    const sections = Array.from(root.querySelectorAll('section[id]')).filter((s) => !bound.has(s));
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = e.target.id;
        const el = document.querySelector(`[data-toc="${id}"]`);
        if (el) el.style.setProperty('--progress', String(e.intersectionRatio));
      });
    }, { threshold: Array.from({ length: 11 }, (_, i) => i / 10) });
    sections.forEach((s) => { bound.add(s); io.observe(s); });
  }

  function runAll(root = document) {
    initHeroTilt(root);
    initReadingProgress();
    initBlurUp(root);
    initBeforeAfter(root);
    initTocProgress(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => runAll(document));
  } else {
    runAll(document);
  }

  const main = document.querySelector('main') || document.body;
  const mo = new MutationObserver((muts) => {
    if (muts.some((m) => m.addedNodes && m.addedNodes.length)) {
      runAll(document);
    }
  });
  mo.observe(main, { childList: true, subtree: true });
})();

