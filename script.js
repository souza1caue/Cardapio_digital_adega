const links = [...document.querySelectorAll('.categoria')];
const sections = [...document.querySelectorAll('[data-section]')];
const modal = document.querySelector('#modal-original');

links.forEach((link) => link.addEventListener('click', () => {
  links.forEach((item) => item.classList.toggle('ativa', item === link));
}));

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach((link) => link.classList.toggle('ativa', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -65%', threshold: [0, .2, .5] });

sections.forEach((section) => observer.observe(section));
document.querySelector('#abrir-original').addEventListener('click', () => modal.showModal());
modal.querySelector('button').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
