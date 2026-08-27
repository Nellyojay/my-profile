// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if(saved){ document.body.setAttribute('data-theme', saved); }
themeBtn.addEventListener('click', ()=>{
  const curr = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', curr);
  localStorage.setItem('theme', curr);
});

// Contact form basic validation (no backend — mailto fallback)
document.getElementById('contactForm').addEventListener('submit', function(e){
  const email = document.getElementById('email').value.trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    e.preventDefault();
    alert('Please enter a valid email address.');
  }
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll and section highlight
document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        target.scrollIntoView({behavior:'smooth'});
      }
    }
  });
});

// Section highlight on scroll
const sections = Array.from(document.querySelectorAll('section.card'));
const navLinks = Array.from(document.querySelectorAll('.nav a[data-scroll]'));
function highlightSection(){
  let index = sections.length-1;
  for(let i=0; i<sections.length; i++){
    const rect = sections[i].getBoundingClientRect();
    if(rect.top <= 80){
      index = i;
    }
  }
  sections.forEach((sec,i)=>sec.classList.toggle('active-section',i===index));
  navLinks.forEach((link,i)=>link.classList.toggle('primary',i===index));
}
window.addEventListener('scroll', highlightSection);
window.addEventListener('resize', highlightSection);
highlightSection();

const navToggle = document.getElementById('navToggle');
const navLinksSidebar = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeSidebar() {
  navLinksSidebar.classList.remove('open');
  navOverlay.classList.remove('show');
}

navToggle.addEventListener('click', function() {
  navLinksSidebar.classList.toggle('open');
  navOverlay.classList.toggle('show');
});

navOverlay.addEventListener('click', closeSidebar);

// Optional: close sidebar on link click (mobile)
navLinksSidebar.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    if(window.innerWidth <= 900) closeSidebar();
  });
});