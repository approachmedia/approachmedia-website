'use strict';

/* ─── Sticky Navigation ────────────────────────────────────────────── */
const navHeader = document.querySelector('.nav-header');
if (navHeader) {
  window.addEventListener('scroll', () => {
    navHeader.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─── Mobile Menu ──────────────────────────────────────────────────── */
const hamburger   = document.querySelector('.nav-hamburger');
const mobileMenu  = document.querySelector('.nav-mobile');
const mobileClose = document.querySelector('.nav-mobile-close');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
});
mobileClose?.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
});
mobileMenu?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ─── Hero Rotating Text ───────────────────────────────────────────── */
const rotatingTexts = [
  'In an ocean of lookalikes, those who stand apart will survive!',
  'Custom Exhibition and Trade Show Booth Builders and Designers',
  'Innovative Designs, Engaging Experiences, Lasting Impact'
];

const rotatingEl = document.getElementById('rotating-text');
if (rotatingEl) {
  let idx = 0;
  const rotate = () => {
    rotatingEl.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % rotatingTexts.length;
      rotatingEl.textContent = rotatingTexts[idx];
      rotatingEl.style.opacity = '1';
    }, 500);
  };
  setInterval(rotate, 3600);
}

/* ─── Scroll-triggered Animations ─────────────────────────────────── */
const animateObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));

/* ─── Counter Animation ────────────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  let startTime = null;
  const duration = 1800;
  const frame = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(frame);
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  let counted = false;
  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
      });
    }
  }, { threshold: 0.4 });
  counterObserver.observe(statsSection);
}

/* ─── FAQ Accordion ────────────────────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ─── Portfolio: Load from JSON ────────────────────────────────────── */
const FALLBACK_PORTFOLIO = [
  { id:1, title:'Signature Double Decker Stand', client:'Prestige Properties', industry:'Real Estate', exhibition:'ACETECH 2024', location:'Mumbai', year:2024, tags:['Double Decker','Turnkey','Real Estate'], featured:true },
  { id:2, title:'Immersive Pharma Experience Pavilion', client:'Global Pharma Corp', industry:'Pharma', exhibition:'India Pharma Expo 2024', location:'Hyderabad', year:2024, tags:['Custom Design','AV Integration','Pharma'], featured:true },
  { id:3, title:'Technology Brand Command Centre', client:'TechVision India', industry:'Technology', exhibition:'India Electronics Show 2023', location:'Bangalore', year:2023, tags:['AV Integration','Custom Fabrication','Technology'], featured:true },
  { id:4, title:'International Textile Showcase', client:'Premier Fabrics Group', industry:'Textile', exhibition:'Bharat Tex 2024', location:'Delhi', year:2024, tags:['Custom Design','Textile','International'], featured:true },
  { id:5, title:'Automotive Innovation Stand', client:'AutoDrive Motors', industry:'Automotive', exhibition:'Auto Expo 2024', location:'Delhi', year:2024, tags:['Turnkey','AV Integration','Automotive'], featured:true },
  { id:6, title:'FMCG Retail Experience Stand', client:'NutriLife Brands', industry:'FMCG', exhibition:'Aahar Expo 2023', location:'Delhi', year:2023, tags:['Custom Design','FMCG','Turnkey'], featured:true }
];

function buildPortfolioCard(p) {
  const tags = p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('');
  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.title} - Approach Media" loading="lazy">`
    : `<div class="img-placeholder"><span class="icon">🏛️</span><span>${p.industry}</span></div>`;
  return `
    <article class="portfolio-card animate-in">
      <div class="portfolio-card-img">
        ${imgContent}
        <div class="overlay" aria-hidden="true">View Project →</div>
      </div>
      <div class="portfolio-card-body">
        <div class="portfolio-card-tags">${tags}</div>
        <h4>${p.title}</h4>
        <div class="portfolio-card-meta">
          <span>${p.client}</span>
          <span>${p.location} · ${p.year}</span>
        </div>
      </div>
    </article>`;
}

function renderPortfolio(projects) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  const featured = projects.filter(p => p.featured).slice(0, 6);
  grid.innerHTML = featured.map(buildPortfolioCard).join('');
  grid.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));
}

async function loadPortfolio() {
  try {
    const res = await fetch('data/portfolio.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { projects } = await res.json();
    renderPortfolio(projects);
  } catch {
    renderPortfolio(FALLBACK_PORTFOLIO);
  }
}

/* ─── Exhibitions: Load from JSON ─────────────────────────────────── */
const FALLBACK_EXHIBITIONS = [
  { id:1, name:'ACETECH Mumbai 2026', location:'Mumbai, India', venue:'Bombay Exhibition Centre', startDate:'2026-06-12', industry:'Architecture & Construction', registrationUrl:'contact.html' },
  { id:2, name:'India Wood Expo 2026', location:'Bangalore, India', venue:'BIEC', startDate:'2026-07-18', industry:'Wood & Furniture', registrationUrl:'contact.html' },
  { id:3, name:'Bharat Tex 2026', location:'Delhi, India', venue:'Bharat Mandapam', startDate:'2026-09-08', industry:'Textile', registrationUrl:'contact.html' },
  { id:4, name:'Stona Expo 2026', location:'Bangalore, India', venue:'BIEC', startDate:'2026-10-14', industry:'Stone & Building Materials', registrationUrl:'contact.html' },
  { id:5, name:'India Energy Week 2027', location:'Goa, India', venue:'Goa Convention Centre', startDate:'2027-02-11', industry:'Energy', registrationUrl:'contact.html' }
];

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function buildExhibitionItem(e) {
  const d = new Date(e.startDate);
  return `
    <div class="exhibition-item animate-in">
      <div class="exhibition-date">
        <div class="ex-month">${MONTHS[d.getMonth()]}</div>
        <div class="ex-day">${d.getDate()}</div>
        <div class="ex-year">${d.getFullYear()}</div>
      </div>
      <div class="exhibition-details">
        <h4>${e.name}</h4>
        <p>${e.venue} · ${e.location}</p>
      </div>
      <div class="exhibition-meta">
        <span class="ex-industry">${e.industry}</span>
        <a href="${e.registrationUrl}" class="ex-cta">Plan Your Stand →</a>
      </div>
    </div>`;
}

function renderExhibitions(exhibitions) {
  const timeline = document.getElementById('exhibitions-timeline');
  if (!timeline) return;
  const now = new Date();
  const upcoming = exhibitions
    .filter(e => new Date(e.startDate) >= now)
    .slice(0, 5);
  if (!upcoming.length) {
    timeline.innerHTML = '<p class="loading-state">Check back soon for upcoming exhibitions.</p>';
    return;
  }
  timeline.innerHTML = upcoming.map(buildExhibitionItem).join('');
  timeline.querySelectorAll('.animate-in').forEach(el => animateObserver.observe(el));
}

async function loadExhibitions() {
  try {
    const res = await fetch('data/exhibitions.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { exhibitions } = await res.json();
    renderExhibitions(exhibitions);
  } catch {
    renderExhibitions(FALLBACK_EXHIBITIONS);
  }
}

/* ─── Init ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolio();
  loadExhibitions();
});
