// =========================================
// SAT Math Hub - JavaScript
// =========================================

function router(pageId) {
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));
    const el = document.getElementById(pageId);
    if (el) el.classList.add('active');
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');
    window.scrollTo(0,0);
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
    arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
}
