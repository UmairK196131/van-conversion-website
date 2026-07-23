import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';
import { renderLazyImage } from '../../lib/images.js';
import { fetchBlogPosts } from '../../lib/api.js';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function blogCoverImage(post) {
  if (post.coverImage) return post.coverImage;
  return `https://placehold.co/1200x675/1C2541/6EA8FF?text=${encodeURIComponent(post.title)}`;
}

function renderPostCard(post) {
  const cover = blogCoverImage(post);

  return `<article class="blog-card" data-animate-item>
    <a href="/blog/${post.slug}" data-nav-link class="blog-card__link">
      <div class="blog-card__media">
        ${renderLazyImage({
          src: cover,
          alt: post.title,
          className: 'blog-card__image',
          width: 800,
          height: 450,
        })}
      </div>
      <div class="blog-card__body">
        <time class="blog-card__date" datetime="${post.publishedAt ?? ''}">${formatDate(post.publishedAt)}</time>
        <h2 class="blog-card__title">${post.title}</h2>
        <p class="blog-card__excerpt">${post.excerpt ?? ''}</p>
        <span class="blog-card__cta">Read Article →</span>
      </div>
    </a>
  </article>`;
}

export async function renderBlogPage() {
  const posts = await fetchBlogPosts();

  const grid = posts.length
    ? `<div class="blog-grid">${posts.map(renderPostCard).join('')}</div>`
    : `<div class="blog-empty">
        <p>No articles published yet. Check back soon for van life tips and build updates.</p>
      </div>`;

  return `<div class="static-page">
    <section class="page-hero page-hero--compact" data-hero data-animate-section>
      <div class="page-hero__bg" aria-hidden="true"></div>
      <div class="container page-hero__content">
        <p class="page-hero__eyebrow" data-hero-item>Van Life &amp; Builds</p>
        <h1 class="page-hero__title" data-hero-item>Blog</h1>
        <p class="page-hero__subtitle" data-hero-item>
          Tips, travel inspiration, and behind-the-scenes updates from our workshop.
        </p>
      </div>
    </section>
    <section class="static-section" data-animate-section aria-label="Blog articles">
      <div class="container">
        ${grid}
      </div>
    </section>
  </div>`;
}

export function mountBlogPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
