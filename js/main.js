// =========================================
// script.js — Site JavaScript
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
    if (arrow) {
        arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
    }
}

// Wire up UI behaviour on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle Routing
    const start = (location.hash && location.hash.length > 1) ? location.hash.slice(1) : 'home';
    router(start);

    // Intercept internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href') || '';
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const id = href.slice(1);
                router(id);
                // Update URL for "History"
                history.replaceState(null, '', `#${id}`);
            }
        });
    });

    // 2. Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // 3. CTA Buttons (Manual Routing)
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            router('formulas');
            history.replaceState(null, '', '#formulas');
        });
    });

    // 4. Accordions (Replaces the "onclick" HTML attributes)
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(h => {
        h.setAttribute('tabindex', '0'); // Accessibility
        h.addEventListener('click', () => toggleAccordion(h));
        
        // Keyboard support (Enter or Space)
        h.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(h);
            }
        });
    });
});
