const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.classList.toggle('open', !isOpen);
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
});

mobileMenu.addEventListener('click', (event) => {
  if (event.target === mobileMenu || event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) closeMenu();
});

const sections = [...document.querySelectorAll('main section[id], .hero[id]')];
const navLinks = [...document.querySelectorAll('.nav-pill a')];
const navObserver = new IntersectionObserver((entries) => {
  const visibleEntry = entries.find((entry) => entry.isIntersecting);
  if (!visibleEntry) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visibleEntry.target.id}`));
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => navObserver.observe(section));

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const animateStats = () => {
  document.querySelectorAll('[data-stat]').forEach((element) => {
    const value = element.dataset.stat;
    if (value === 'text' || reducedMotion) return;
    const target = Number(value);
    const start = performance.now();
    const duration = 850;
    const count = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      element.textContent = `${Math.round(target * progress)}+`;
      if (progress < 1) requestAnimationFrame(count);
    };
    element.textContent = '0+';
    requestAnimationFrame(count);
  });
};

const statObserver = new IntersectionObserver((entries, observer) => {
  if (!entries[0].isIntersecting) return;
  animateStats();
  observer.disconnect();
}, { threshold: 0.8 });
statObserver.observe(document.querySelector('.hero-stats'));

const demoTitle = document.querySelector('#demo-title');
const demoCopy = document.querySelector('#demo-copy');
document.querySelectorAll('.question-list button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.question-list button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const updateCopy = () => {
      demoTitle.textContent = button.dataset.title;
      demoCopy.textContent = button.dataset.copy;
      demoTitle.parentElement.classList.remove('refreshing');
    };
    if (reducedMotion) {
      updateCopy();
      return;
    }
    demoTitle.parentElement.classList.add('refreshing');
    window.setTimeout(updateCopy, 130);
  });
});

const switcher = document.querySelector('.model-switcher');
const currentModel = document.querySelector('.model-current');
const provider = document.querySelector('#provider');
const selectedModel = document.querySelector('#selected-model');
currentModel.addEventListener('click', () => {
  const isOpen = switcher.classList.toggle('open');
  currentModel.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.model-options button').forEach((option) => {
  option.addEventListener('click', () => {
    provider.textContent = option.dataset.provider;
    selectedModel.textContent = option.dataset.model;
    document.querySelectorAll('.model-options button').forEach((item) => item.setAttribute('aria-selected', 'false'));
    option.setAttribute('aria-selected', 'true');
    switcher.classList.remove('open');
    currentModel.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!switcher.contains(event.target)) {
    switcher.classList.remove('open');
    currentModel.setAttribute('aria-expanded', 'false');
  }
});
