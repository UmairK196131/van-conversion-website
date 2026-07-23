function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

export function renderDeferredIframe({
  src,
  title,
  className = '',
  width = '100%',
  height,
  allow = '',
  referrerpolicy = 'no-referrer-when-downgrade',
}) {
  const attrs = [
    'data-deferred-embed',
    `data-src="${escapeAttr(src)}"`,
    `title="${escapeAttr(title)}"`,
    className ? `class="${escapeAttr(className)}"` : '',
    `width="${escapeAttr(width)}"`,
    height ? `height="${height}"` : '',
    allow ? `allow="${escapeAttr(allow)}"` : '',
    `referrerpolicy="${referrerpolicy}"`,
    'loading="lazy"',
  ]
    .filter(Boolean)
    .join(' ');

  return `<iframe ${attrs}></iframe>`;
}

export function mountDeferredEmbeds(root = document) {
  const embeds = root.querySelectorAll('[data-deferred-embed]:not([src])');
  if (!embeds.length) return;

  const loadEmbed = (iframe) => {
    const src = iframe.dataset.src;
    if (!src || iframe.getAttribute('src')) return;
    iframe.src = src;
    iframe.removeAttribute('data-src');
  };

  if (!('IntersectionObserver' in window)) {
    embeds.forEach(loadEmbed);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadEmbed(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '200px' }
  );

  embeds.forEach((embed) => observer.observe(embed));
}
