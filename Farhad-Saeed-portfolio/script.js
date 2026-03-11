/* ══════════════════════════════════════════════════
   FARHAD SAEED — PREMIUM PORTFOLIO JAVASCRIPT
   Architectural Blueprint × Emerald × Copper
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── LOADER ── */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loaderScreen');
    const bar = document.getElementById('loaderBar');
    if (!loader) return;
    setTimeout(() => loader.classList.add('gone'), 2000);
  });

  /* ── CURSOR ── */
  if (window.matchMedia('(pointer:fine)').matches) {
    const ring = document.getElementById('curRing');
    const dot  = document.getElementById('curDot');
    if (ring && dot) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
      document.addEventListener('mouseleave', () => { ring.style.opacity = '0'; dot.style.opacity = '0'; });
      document.addEventListener('mouseenter', () => { ring.style.opacity = '1'; dot.style.opacity = '1'; });
      ;(function loop() {
        rx += (mx - rx) * .12; ry += (my - ry) * .12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
        requestAnimationFrame(loop);
      })();
      document.querySelectorAll('a,button,[role=button],.proj-card,.cert-card,.pf-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
      });
    }
  }

  /* ── NAVBAR ── */
  const nav    = document.getElementById('siteNav');
  const burger = document.getElementById('navBurger');
  const wrap   = document.getElementById('navLinksWrap');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scrollTopBtn')?.classList.toggle('vis', window.scrollY > 400);
  }, { passive: true });

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    wrap.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.nl').forEach(link => {
    link.addEventListener('click', () => {
      if (wrap.classList.contains('open')) {
        burger.classList.remove('open');
        wrap.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  /* active nav on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nl');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nl[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: .35 });
  sections.forEach(s => io.observe(s));

  /* ── SCROLL REVEAL ── */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.anim-fade-right,.anim-fade-left').forEach(el => ro.observe(el));

  /* ── SKILL BARS ── */
  const sbObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sb-fill[data-w]').forEach(f => {
          setTimeout(() => f.style.width = f.dataset.w + '%', 200);
        });
        sbObs.unobserve(e.target);
      }
    });
  }, { threshold: .2 });
  document.querySelectorAll('.skill-card').forEach(c => sbObs.observe(c));

  /* ── COUNTERS ── */
  const coObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1600;
      const step = 16;
      const inc = target / (dur / step);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, target);
        el.textContent = Math.floor(cur);
        if (cur >= target) clearInterval(t);
      }, step);
      coObs.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => coObs.observe(el));

  /* ── PROJECT FILTER ── */
  const filterWrap = document.getElementById('projFilter');
  const projGrid   = document.getElementById('projGrid');
  if (filterWrap && projGrid) {
    filterWrap.addEventListener('click', e => {
      const btn = e.target.closest('.pf-btn');
      if (!btn) return;
      filterWrap.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      projGrid.querySelectorAll('.proj-card').forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !match);
        if (match) {
          card.classList.remove('vis');
          requestAnimationFrame(() => setTimeout(() => card.classList.add('vis'), 50));
        }
      });
    });

    // initial observe for project cards
    const pcObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); pcObs.unobserve(e.target); }
      });
    }, { threshold: .1 });
    projGrid.querySelectorAll('.proj-card').forEach((c, i) => {
      c.style.transitionDelay = (i * 0.07) + 's';
      pcObs.observe(c);
    });
  }

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.cf-submit');
      btn.classList.add('sent');
      btn.innerHTML = '<span>Message Sent!</span><i class="bi bi-check-lg"></i>';
      setTimeout(() => {
        btn.classList.remove('sent');
        btn.innerHTML = '<span>Send Message</span><i class="bi bi-send-fill"></i>';
        form.reset();
      }, 3500);
    });
    /* floating label effect */
    form.querySelectorAll('.cf-group input, .cf-group textarea, .cf-group select').forEach(inp => {
      inp.addEventListener('focus', () => inp.closest('.cf-group')?.classList.add('focused'));
      inp.addEventListener('blur',  () => inp.closest('.cf-group')?.classList.remove('focused'));
    });
  }

  /* ── SCROLL TOP ── */
  document.getElementById('scrollTopBtn')?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ── 3D TILT (desktop) ── */
  if (window.matchMedia('(pointer:fine) and (min-width:769px)').matches) {
    document.querySelectorAll('.proj-card,.cert-card,.skill-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - .5;
        const y = (e.clientY - r.top)  / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── SMOOTH SCROLL FOR ANCHORS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav?.offsetHeight ?? 72;
      window.scrollTo({ top: target.offsetTop - offset - 16, behavior: 'smooth' });
    });
  });

  /* ── TYPEWRITER in hero tag ── */
  const roles = ['Civil Engineer', '3D Visualizer', 'AutoCAD Expert', 'Graphic Designer', 'Safety Specialist'];
  const tagEl = document.querySelector('.hero-tag span');
  if (tagEl) {
    let ri = 0, ci = 0, deleting = false;
    function type() {
      const word = roles[ri];
      tagEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length)     { deleting = true; setTimeout(type, 1400); return; }
      if (deleting  && ci < 0)               { deleting = false; ri = (ri + 1) % roles.length; }
      setTimeout(type, deleting ? 45 : 80);
    }
    type();
  }

  console.log('%c✦ Farhad Saeed Portfolio — Blueprint Edition ✦', 'color:#0d9488;font-weight:bold;font-size:14px');
})();