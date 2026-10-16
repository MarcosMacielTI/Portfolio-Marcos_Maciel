const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const yearLabel = document.getElementById('year');

if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
}

function toggleMenu(forceOpen) {
    if (!navLinks || !hamburger) return;

    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', shouldOpen);
    hamburger.setAttribute('aria-expanded', String(shouldOpen));
}

if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
}

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 760) {
            toggleMenu(false);
        }
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;
    let currentId = '';

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${currentId}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

const tabButtons = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.experience-panel');

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        tabButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        tabPanels.forEach((panel) => {
            panel.classList.toggle('hidden', panel.id !== target);
        });
    });
});

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

        projectCards.forEach((card) => {
            const category = card.getAttribute('data-category');
            const isVisible = filter === 'all' || category === filter;
            card.style.display = isVisible ? 'block' : 'none';
        });
    });
});

const skillButtons = document.querySelectorAll('.skill-pill');
const skillDetails = document.querySelectorAll('.skill-detail');

skillButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-skill');

        skillButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        skillDetails.forEach((detail) => {
            detail.classList.toggle('hidden', detail.id !== target);
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
        navLinks?.classList.remove('open');
        hamburger?.setAttribute('aria-expanded', 'false');
    }
});
