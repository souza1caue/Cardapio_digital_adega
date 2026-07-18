const links = [...document.querySelectorAll('.categoria')];
const sections = [...document.querySelectorAll('[data-section]')];

links.forEach((link) => link.addEventListener('click', () => {
  links.forEach((item) => item.classList.toggle('ativa', item === link));
}));

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach((link) => link.classList.toggle('ativa', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -65%', threshold: [0, .2, .5] });

sections.forEach((section) => observer.observe(section));

const slides = [...document.querySelectorAll('.anuncio')];
const controles = [...document.querySelectorAll('.anuncios__controles button')];
let slideAtual = 0;

function mostrarSlide(indice) {
  slideAtual = indice;
  slides.forEach((slide, posicao) => slide.classList.toggle('ativo', posicao === indice));
  controles.forEach((controle, posicao) => {
    const ativo = posicao === indice;
    controle.classList.toggle('ativo', ativo);
    controle.setAttribute('aria-current', ativo);
  });
}

controles.forEach((controle, indice) => controle.addEventListener('click', () => mostrarSlide(indice)));

if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => mostrarSlide((slideAtual + 1) % slides.length), 5000);
}
