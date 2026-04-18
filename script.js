document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
});
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
        ? 'rgba(4,4,4,0.98)'
        : 'rgba(4,4,4,0.85)';
});