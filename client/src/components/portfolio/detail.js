import { fetchProject } from '../../lib/api.js';
import { SITE } from '../../config/site.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';
import { projectCoverImage, renderLazyImage } from '../../lib/images.js';
import { bindBeforeAfterSliders, renderBeforeAfterSlider } from '../beforeAfterSlider.js';

function renderSpecs(project) {
  const specs = [
    { label: 'Vehicle', value: project.vehicleModel },
    { label: 'Build Type', value: 'Full Conversion' },
    { label: 'Status', value: 'Completed' },
  ];

  return `<dl class="project-specs">
    ${specs
      .map(
        (spec) => `<div class="project-specs__item">
      <dt class="project-specs__label">${spec.label}</dt>
      <dd class="project-specs__value">${spec.value}</dd>
    </div>`
      )
      .join('')}
  </dl>`;
}

function renderGallery(project) {
  const images = Array.isArray(project.gallery) ? project.gallery : [];
  const uniqueImages = [...new Set([project.afterImage, ...images].filter(Boolean))];

  if (uniqueImages.length <= 1) return '';

  return `<section class="project-gallery" data-animate-section aria-label="Project gallery">
    <h2 class="project-section__title" data-animate-item>Gallery</h2>
    <div class="project-gallery__grid">
      ${uniqueImages
        .map(
          (
            src,
            index
          ) => `<button type="button" class="project-gallery__thumb" data-gallery-thumb="${index}" aria-label="View image ${index + 1}">
        ${renderLazyImage({
          src,
          alt: `${project.title} — image ${index + 1}`,
          className: 'project-gallery__image',
          width: 400,
          height: 300,
        })}
      </button>`
        )
        .join('')}
    </div>
    <dialog class="project-lightbox" data-gallery-lightbox>
      <button type="button" class="project-lightbox__close" data-gallery-close aria-label="Close gallery">&times;</button>
      <img src="" alt="" class="project-lightbox__image" data-gallery-lightbox-image />
    </dialog>
  </section>`;
}

function renderProjectJsonLd(project, coverImage) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: coverImage,
    creator: {
      '@type': 'Organization',
      name: SITE.name,
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export async function renderProjectDetailPage(slug) {
  const project = await fetchProject(slug);

  if (!project) {
    return {
      html: `<div class="static-page">
        <section class="page-placeholder">
          <div class="page-placeholder__inner">
            <p class="page-placeholder__eyebrow">404</p>
            <h1 class="page-placeholder__title">Project not found</h1>
            <p class="page-placeholder__description">We couldn't find a project at <code>/portfolio/${slug}</code>.</p>
            <div class="page-placeholder__actions">
              <a href="/portfolio" data-nav-link class="btn btn--primary">Back to Portfolio</a>
            </div>
          </div>
        </section>
      </div>`,
      meta: null,
    };
  }

  const coverImage = projectCoverImage(project);
  const beforeAfter =
    project.beforeImage && project.afterImage
      ? `<section class="project-section" data-animate-section>
          <h2 class="project-section__title" data-animate-item>Before &amp; After</h2>
          <div data-animate-item>
            ${renderBeforeAfterSlider({
              beforeImage: project.beforeImage,
              afterImage: project.afterImage,
              label: `${project.title} before and after comparison`,
            })}
          </div>
        </section>`
      : '';

  return {
    html: `<div class="static-page project-detail">
      <section class="page-hero page-hero--compact" data-hero data-animate-section>
        <div class="page-hero__bg" aria-hidden="true"></div>
        <div class="container page-hero__content">
          <p class="page-hero__eyebrow" data-hero-item>${project.vehicleModel}</p>
          <h1 class="page-hero__title" data-hero-item>${project.title}</h1>
          <p class="page-hero__subtitle" data-hero-item>${project.description}</p>
        </div>
      </section>
      <div class="container project-detail__content">
        <div class="project-detail__layout">
          <div class="project-detail__main">
            ${beforeAfter}
            ${renderGallery(project)}
          </div>
          <aside class="project-detail__sidebar" data-animate-item>
            ${renderSpecs(project)}
            <a href="/contact" data-nav-link class="btn btn--primary project-detail__cta">Start Your Build</a>
            <a href="/portfolio" data-nav-link class="btn btn--secondary project-detail__back">← All Projects</a>
          </aside>
        </div>
      </div>
      ${renderProjectJsonLd(project, coverImage)}
    </div>`,
    meta: {
      title: `${project.title} | Portfolio | ${SITE.name}`,
      description: project.description,
      image: coverImage,
    },
  };
}

function bindGalleryLightbox() {
  const lightbox = document.querySelector('[data-gallery-lightbox]');
  const lightboxImage = document.querySelector('[data-gallery-lightbox-image]');
  if (!lightbox || !lightboxImage) return;

  document.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const image = thumb.querySelector('img');
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.showModal();
    });
  });

  lightbox.querySelector('[data-gallery-close]')?.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

export function mountProjectDetailPage() {
  destroyPageAnimations();
  bindBeforeAfterSliders();
  bindGalleryLightbox();
  requestAnimationFrame(() => initPageAnimations());
}
