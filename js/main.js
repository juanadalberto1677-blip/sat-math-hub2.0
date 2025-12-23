// =========================================
// scripts.js — Site JavaScript (routing, menu, accordion)
// =========================================

function router(pageId) {
  // Hide all page sections, show the requested one
  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => page.classList.remove('active'));
  const el = document.getElementById(pageId);
  if (el) el.classList.add('active');
  // close mobile nav if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('active');
  window.scrollTo(0, 0);
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('active');
}

function toggleAccordion(header) {
  const content = header.nextElementSibling;
  if (!content) return;
  content.classList.toggle('open');
  const arrow = header.querySelector('span');
  if (arrow) arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
}

// Wire up UI behaviour on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // If the page loaded with a hash, route to it, otherwise show 'home'
  const start = (location.hash && location.hash.length > 1) ? location.hash.slice(1) : 'home';
  router(start);

  // Intercept internal anchor links that reference section IDs and use router
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const id = href.slice(1);
        router(id);
        // update the URL without adding history entry
        history.replaceState(null, '', `#${id}`);
      }
    });
  });

  // Hook up the hamburger/menu toggle if present
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  // Hook CTA buttons (if they don't use anchors)
  document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      router('formulas');
      history.replaceState(null, '', '#formulas');
    });
  });

  // Make accordion headers keyboard accessible and clickable
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(h => {
    h.setAttribute('tabindex', '0');
    h.addEventListener('click', () => toggleAccordion(h));
    h.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion(h);
      }
    });
  });
});
