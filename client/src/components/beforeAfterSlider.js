import { renderLazyImage, IMAGE_SIZES } from '../lib/images.js';

export function renderBeforeAfterSlider({
  beforeImage,
  afterImage,
  label = 'Before and after comparison',
}) {
  if (!beforeImage || !afterImage) return '';

  return `<div class="before-after" data-before-after role="group" aria-label="${label}">
    <div class="before-after__frame">
      ${renderLazyImage({
        src: afterImage,
        alt: 'After conversion',
        className: 'before-after__image before-after__image--after',
        width: 1200,
        height: 800,
        sizes: IMAGE_SIZES.full,
        widths: [640, 960, 1200, 1600],
      })}
      <div class="before-after__before" data-before-after-before style="width: 50%;">
        ${renderLazyImage({
          src: beforeImage,
          alt: 'Before conversion',
          className: 'before-after__image before-after__image--before',
          width: 1200,
          height: 800,
          sizes: IMAGE_SIZES.full,
          widths: [640, 960, 1200, 1600],
        })}
      </div>
      <div class="before-after__divider" data-before-after-divider style="left: 50%;" aria-hidden="true">
        <span class="before-after__handle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>
          </svg>
        </span>
      </div>
      <span class="before-after__label before-after__label--before">Before</span>
      <span class="before-after__label before-after__label--after">After</span>
    </div>
  </div>`;
}

export function bindBeforeAfterSliders(root = document) {
  root.querySelectorAll('[data-before-after]').forEach((slider) => {
    const frame = slider.querySelector('.before-after__frame');
    const beforePane = slider.querySelector('[data-before-after-before]');
    const divider = slider.querySelector('[data-before-after-divider]');
    if (!frame || !beforePane || !divider) return;

    let dragging = false;

    const beforeImage = beforePane.querySelector('img');

    function syncBeforeImageWidth() {
      if (beforeImage) {
        beforeImage.style.width = `${frame.offsetWidth}px`;
      }
    }

    function setPosition(clientX) {
      const rect = frame.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const percent = (x / rect.width) * 100;
      beforePane.style.width = `${percent}%`;
      divider.style.left = `${percent}%`;
    }

    syncBeforeImageWidth();
    window.addEventListener('resize', syncBeforeImageWidth);

    function startDrag(event) {
      dragging = true;
      slider.classList.add('before-after--dragging');
      setPosition(event.touches ? event.touches[0].clientX : event.clientX);
      event.preventDefault();
    }

    function moveDrag(event) {
      if (!dragging) return;
      setPosition(event.touches ? event.touches[0].clientX : event.clientX);
    }

    function endDrag() {
      dragging = false;
      slider.classList.remove('before-after--dragging');
    }

    divider.addEventListener('mousedown', startDrag);
    divider.addEventListener('touchstart', startDrag, { passive: false });
    frame.addEventListener('click', (event) => {
      if (event.target.closest('[data-before-after-divider]')) return;
      setPosition(event.clientX);
    });

    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('touchend', endDrag);
  });
}
