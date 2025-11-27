// js/main.js
// Extracted from the single-file demo

// --- 1. Navigation Logic (Router) ---
function router(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const el = document.getElementById(pageId);
    if (el) el.classList.add('active');

    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0,0);
}

// --- 2. Mobile Menu Toggle ---
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('active');
}

// --- 3. Accordion Logic (Formulas Page) ---
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    
    // Toggle the 'open' class
    content.classList.toggle('open');

    // Optional: Rotate arrow
    const arrow = header.querySelector('span');
    if (content.classList.contains('open')) {
        arrow.textContent = '▲';
    } else {
        arrow.textContent = '▼';
    }
}

// --- 4. Show/Hide Answers (Practice Page) ---
function toggleAnswer(answerId) {
    const answerBox = document.getElementById(answerId);
    if (!answerBox) return;
    // The button before the answer box
    const prev = answerBox.previousElementSibling;
    const button = prev && prev.tagName === 'BUTTON' ? prev : null;

    if (answerBox.classList.contains('show')) {
        answerBox.classList.remove('show');
        if (button) button.textContent = "Show Answer";
    } else {
        answerBox.classList.add('show');
        if (button) button.textContent = "Hide Answer";
    }
}
