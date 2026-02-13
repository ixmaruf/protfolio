/* ============================================================
   MARUF HASAN — Portfolio JavaScript
   Animations, Canvas, Sakura, Visitor Counter, Interactions
   ============================================================ */

(function () {
  'use strict';

  // ==================== PRELOADER ====================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
    }, 2000);
  });
  // Fallback: hide preloader after 4s no matter what
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initAnimations();
    }
  }, 4000);

  // ==================== CANVAS BACKGROUND ====================
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let canvasW, canvasH;
  let gridNodes = [];
  let animFrame;

  function resizeCanvas() {
    if (!canvas) return;
    canvasW = canvas.width = window.innerWidth;
    canvasH = canvas.height = window.innerHeight;
    generateNodes();
  }

  function generateNodes() {
    gridNodes = [];
    const spacing = 120;
    const cols = Math.ceil(canvasW / spacing) + 1;
    const rows = Math.ceil(canvasH / spacing) + 1;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        gridNodes.push({
          x: i * spacing,
          y: j * spacing,
          ox: i * spacing,
          oy: j * spacing,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    }
  }

  let mouseX = -1000, mouseY = -1000;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);

    gridNodes.forEach((n) => {
      const dx = mouseX - n.ox;
      const dy = mouseY - n.oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 15;
        n.vx += (dx / dist) * force * 0.02;
        n.vy += (dy / dist) * force * 0.02;
      }

      // Spring back
      n.vx += (n.ox - n.x) * 0.03;
      n.vy += (n.oy - n.y) * 0.03;
      n.vx *= 0.9;
      n.vy *= 0.9;
      n.x += n.vx;
      n.y += n.vy;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230, 57, 70, 0.12)';
      ctx.fill();
    });

    // Draw connections
    ctx.strokeStyle = 'rgba(230, 57, 70, 0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < gridNodes.length; i++) {
      for (let j = i + 1; j < gridNodes.length; j++) {
        const a = gridNodes[i];
        const b = gridNodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(drawCanvas);
  }

  // Only initialize canvas on larger screens
  function initCanvas() {
    if (window.innerWidth > 768 && canvas) {
      resizeCanvas();
      drawCanvas();
      window.addEventListener('resize', debounce(resizeCanvas, 200));
    }
  }

  // ==================== SAKURA PETALS ====================
  const sakuraContainer = document.getElementById('sakura-container');
  let sakuraInterval;

  function createPetal() {
    if (!sakuraContainer) return;
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    const size = Math.random() * 10 + 6;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 10;
    const delay = Math.random() * 2;
    const opacity = Math.random() * 0.25 + 0.1;

    petal.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: -20px;
      opacity: 0;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    // Random shape variations
    const shapes = [
      '50% 0 50% 50%',
      '0 50% 50% 50%',
      '50% 50% 0 50%',
      '50% 50% 50% 0',
    ];
    petal.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];

    sakuraContainer.appendChild(petal);

    // Remove after animation completes
    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, (duration + delay) * 1000);
  }

  function initSakura() {
    // Create initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(createPetal, i * 300);
    }
    // Continue creating petals
    sakuraInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createPetal();
      }
    }, 2000);
  }

  // Pause sakura when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      clearInterval(sakuraInterval);
    } else {
      sakuraInterval = setInterval(() => createPetal(), 2000);
    }
  });

  // ==================== HEADER SCROLL BEHAVIOR ====================
  const header = document.getElementById('mainHeader');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // ==================== ACTIVE NAV LINK ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  // ==================== MOBILE MENU ====================
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileBtn.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileOverlay.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay) || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ==================== NUMBER COUNTER ANIMATION ====================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Easing
              const eased = 1 - Math.pow(1 - progress, 4);
              entry.target.textContent = Math.floor(target * eased);
              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                entry.target.textContent = target;
              }
            }
            requestAnimationFrame(update);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  // ==================== PROFILE IMAGE B&W TOGGLE ====================
  const profileImg = document.getElementById('profileImg');
  const profileWrapper = document.getElementById('profileImgWrapper');
  const overlayText = document.querySelector('.img-overlay-text');

  if (profileWrapper) {
    profileWrapper.addEventListener('click', () => {
      profileImg.classList.toggle('color-active');
      if (profileImg.classList.contains('color-active')) {
        overlayText.textContent = 'Click for B&W';
      } else {
        overlayText.textContent = 'Click for Color';
      }
    });
  }

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        firstName: contactForm.firstName.value,
        lastName: contactForm.lastName.value,
        email: contactForm.email.value,
        projectUrl: contactForm.projectUrl.value,
        budget: contactForm.budget.value,
        message: contactForm.message.value,
      };

      // Save to table
      try {
        await fetch('tables/contact_messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        // silently continue
      }

      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    });
  }

  // ==================== BACK TO TOP ====================
  const backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==================== VISITOR COUNTER (REAL) ====================
  async function initVisitorCounter() {
    const todayEl = document.getElementById('todayVisits');
    const totalEl = document.getElementById('totalVisits');
    if (!todayEl || !totalEl) return;

    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    try {
      // Record this visit
      await fetch('tables/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visit_date: today, timestamp: Date.now() }),
      });
    } catch (e) {
      // silent
    }

    try {
      // Get total visits
      const totalRes = await fetch('tables/visitors?limit=1&page=1');
      const totalData = await totalRes.json();
      const total = totalData.total || 0;
      totalEl.textContent = total;

      // Get today's visits
      const allRes = await fetch(`tables/visitors?limit=1&page=1&search=${today}`);
      const allData = await allRes.json();
      const todayCount = allData.total || 0;
      todayEl.textContent = todayCount;
    } catch (e) {
      todayEl.textContent = '—';
      totalEl.textContent = '—';
    }
  }

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70;
        const top = target.offsetTop - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==================== TILT EFFECT ON SKILL CARDS (Desktop) ====================
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.skill-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==================== PARALLAX KANJI DECORATIONS ====================
  function handleParallax() {
    const scroll = window.scrollY;
    document.querySelectorAll('[class*="deco-kanji"]').forEach((el) => {
      const speed = 0.05;
      el.style.transform = `translateY(${scroll * speed}px)`;
    });
  }

  // ==================== UTILITY: DEBOUNCE ====================
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ==================== SCROLL EVENT (THROTTLED) ====================
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNav();
        if (window.innerWidth > 768) handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ==================== INIT ALL ====================
  function initAnimations() {
    initScrollAnimations();
    animateCounters();
    initCanvas();
    initSakura();
    initVisitorCounter();
  }

  // If page already loaded (rare), init immediately
  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initAnimations();
    }, 500);
  }
})();
