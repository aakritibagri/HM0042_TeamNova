const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        const answer = faq.querySelector('.faq-answer');

        // Hide all other answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) ans.classList.remove('active');
        });

        // Toggle the clicked one
        answer.classList.toggle('active');
    });
});

// Ensure the answers are hidden by default via CSS
document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));

// Hero section mouse effect
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = heroSection;
    let { offsetX: x, offsetY: y } = e;

    if (e.target !== heroSection) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    heroSection.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
});

// Hamburger menu functionality
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('open');

    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
            menu.classList.remove('active');
            hamburger.classList.remove('open');
            document.removeEventListener('click', closeMenu);
        }
    });
}
