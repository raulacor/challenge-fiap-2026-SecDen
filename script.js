window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
        ? 'rgba(4,4,4,0.98)'
        : 'rgba(4,4,4,0.85)';
});