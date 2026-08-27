// Theme toggle
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
  document.body.setAttribute('data-theme', savedTheme);
}

themeBtn?.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
const emailInput = document.getElementById('email') as HTMLInputElement | null;

contactForm?.addEventListener('submit', (event: SubmitEvent) => {
  const email = emailInput?.value.trim() ?? '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    event.preventDefault();
    alert('Please enter a valid email address.');
  }
});

// Dynamic year
const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

// Smooth scroll and section highlight
document.querySelectorAll<HTMLAnchorElement>('[data-scroll]').forEach((link) => {
  link.addEventListener('click', (event: MouseEvent) => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section highlight on scroll
const sections = Array.from(document.querySelectorAll<HTMLElement>('section.card'));
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a[data-scroll]'));

function highlightSection(): void {
  let index = sections.length - 1;
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
    if (sections[sectionIndex].getBoundingClientRect().top <= 80) {
      index = sectionIndex;
    }
  }

  sections.forEach((section, sectionIndex) => {
    section.classList.toggle('active-section', sectionIndex === index);
  });
  navLinks.forEach((link, linkIndex) => {
    link.classList.toggle('primary', linkIndex === index);
  });
}

window.addEventListener('scroll', highlightSection);
window.addEventListener('resize', highlightSection);
highlightSection();

const navToggle = document.getElementById('navToggle');
const navLinksSidebar = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeSidebar(): void {
  navLinksSidebar?.classList.remove('open');
  navOverlay?.classList.remove('show');
}

navToggle?.addEventListener('click', () => {
  navLinksSidebar?.classList.toggle('open');
  navOverlay?.classList.toggle('show');
});

navOverlay?.addEventListener('click', closeSidebar);

navLinksSidebar?.querySelectorAll('a, button').forEach((element) => {
  element.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });
});