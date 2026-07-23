function webpSource(src) {
  if (!src || src.startsWith('data:')) return null;
  if (/\.(jpe?g|png)(\?.*)?$/i.test(src)) {
    return src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2');
  }
  return null;
}

export function projectCoverImage(project) {
  if (project.afterImage) return project.afterImage;
  if (Array.isArray(project.gallery) && project.gallery.length) return project.gallery[0];
  return `https://placehold.co/1200x800/1C2541/6EA8FF?text=${encodeURIComponent(project.title)}`;
}

export function renderLazyImage({ src, alt, className = '', width, height }) {
  const webp = webpSource(src);
  const attrs = [
    `src="${src}"`,
    `alt="${alt}"`,
    className ? `class="${className}"` : '',
    'loading="lazy"',
    'decoding="async"',
    width ? `width="${width}"` : '',
    height ? `height="${height}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!webp) {
    return `<img ${attrs} />`;
  }

  return `<picture>
    <source srcset="${webp}" type="image/webp" />
    <img ${attrs} />
  </picture>`;
}
