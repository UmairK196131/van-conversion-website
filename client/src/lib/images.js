const DEFAULT_WIDTHS = [400, 800, 1200, 1600];

export const IMAGE_SIZES = {
  hero: '100vw',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  split: '(max-width: 768px) 100vw, 50vw',
  content: '(max-width: 768px) 100vw, 800px',
  full: '(max-width: 768px) 100vw, 1200px',
  avatar: '64px',
  gallery: '(max-width: 640px) 50vw, 200px',
};

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function webpSource(src) {
  if (!src || src.startsWith('data:')) return null;
  if (/\.(jpe?g|png)(\?.*)?$/i.test(src)) {
    return src.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2');
  }
  return null;
}

function resizeImageUrl(src, width) {
  if (!src || src.startsWith('data:')) return null;

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', String(width));
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      if (!url.searchParams.has('q')) url.searchParams.set('q', '80');
      return url.toString();
    } catch {
      return null;
    }
  }

  const placeholdMatch = src.match(/placehold\.co\/(\d+)x(\d+)/i);
  if (placeholdMatch) {
    const [, originalWidth, originalHeight] = placeholdMatch;
    const ratio = Number(originalHeight) / Number(originalWidth);
    const height = Math.max(1, Math.round(width * ratio));
    return src.replace(/placehold\.co\/\d+x\d+/i, `placehold.co/${width}x${height}`);
  }

  return null;
}

function inferWidths(maxWidth) {
  if (!maxWidth) return DEFAULT_WIDTHS;
  if (maxWidth <= 96) return [64, 96, 128];
  if (maxWidth <= 400) return [200, 400, 800];
  if (maxWidth <= 800) return [400, 800, 1200];
  return [640, 960, 1280, 1920];
}

function defaultSizes(width) {
  if (!width) return IMAGE_SIZES.hero;
  if (width <= 96) return IMAGE_SIZES.avatar;
  if (width <= 400) return IMAGE_SIZES.gallery;
  if (width <= 800) return IMAGE_SIZES.card;
  return IMAGE_SIZES.content;
}

export function buildSrcSet(src, widths = DEFAULT_WIDTHS) {
  const entries = widths
    .map((width) => {
      const url = resizeImageUrl(src, width);
      return url ? `${url} ${width}w` : null;
    })
    .filter(Boolean);

  if (entries.length <= 1) return null;
  return entries.join(', ');
}

function resolveImageSrc(src, width) {
  return resizeImageUrl(src, width) ?? src;
}

export function projectCoverImage(project) {
  if (project.afterImage) return project.afterImage;
  if (Array.isArray(project.gallery) && project.gallery.length) return project.gallery[0];
  return `https://placehold.co/1200x800/1C2541/6EA8FF?text=${encodeURIComponent(project.title)}`;
}

export function renderLazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  fetchpriority,
  sizes,
  widths,
}) {
  const resolvedWidths = widths ?? inferWidths(width);
  const srcset = buildSrcSet(src, resolvedWidths);
  const resolvedSizes = sizes ?? defaultSizes(width);
  const imgSrc = resolveImageSrc(src, width ?? resolvedWidths[resolvedWidths.length - 1]);
  const webp = webpSource(src);
  const webpSrcset = webp ? buildSrcSet(webp, resolvedWidths) : null;

  const imgAttrs = [
    `src="${escapeAttr(imgSrc)}"`,
    `alt="${escapeAttr(alt)}"`,
    className ? `class="${escapeAttr(className)}"` : '',
    `loading="${loading}"`,
    'decoding="async"',
    width ? `width="${width}"` : '',
    height ? `height="${height}"` : '',
    srcset ? `srcset="${escapeAttr(srcset)}"` : '',
    srcset ? `sizes="${escapeAttr(resolvedSizes)}"` : '',
    fetchpriority ? `fetchpriority="${fetchpriority}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!webpSrcset) {
    return `<img ${imgAttrs} />`;
  }

  const sourceAttrs = [
    `srcset="${escapeAttr(webpSrcset)}"`,
    'type="image/webp"',
    `sizes="${escapeAttr(resolvedSizes)}"`,
  ].join(' ');

  return `<picture>
    <source ${sourceAttrs} />
    <img ${imgAttrs} />
  </picture>`;
}
