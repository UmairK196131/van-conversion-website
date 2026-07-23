export function renderScrollToTop() {
  return `<button
    type="button"
    id="scroll-to-top"
    class="scroll-to-top"
    aria-label="Scroll to top"
    hidden
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  </button>`;
}

export function bindScrollToTop() {
  const button = document.getElementById('scroll-to-top');
  if (!button) return;

  const threshold = 320;

  function updateVisibility() {
    const show = window.scrollY > threshold;
    button.hidden = !show;
    button.classList.toggle('scroll-to-top--visible', show);
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
