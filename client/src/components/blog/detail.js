import { SITE } from '../../config/site.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';
import { renderLazyImage, IMAGE_SIZES } from '../../lib/images.js';
import { buildBlogPostingSchema } from '../../lib/seo.js';
import { fetchBlogPost } from '../../lib/api.js';

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

function renderRelatedPosts(posts) {
  if (!posts?.length) return '';

  const cards = posts
    .map(
      (post) => `<article class="blog-related__card">
      <a href="/blog/${post.slug}" data-nav-link class="blog-related__link">
        <h3 class="blog-related__title">${post.title}</h3>
        <time class="blog-related__date" datetime="${post.publishedAt ?? ''}">${formatDate(post.publishedAt)}</time>
      </a>
    </article>`
    )
    .join('');

  return `<aside class="blog-related" data-animate-section aria-label="Related articles">
    <h2 class="blog-related__heading">Related Articles</h2>
    <div class="blog-related__list">${cards}</div>
  </aside>`;
}

export async function renderBlogDetailPage(slug) {
  const post = await fetchBlogPost(slug);

  if (!post) {
    return {
      html: `<div class="static-page">
        <section class="page-placeholder">
          <div class="page-placeholder__inner">
            <p class="page-placeholder__eyebrow">404</p>
            <h1 class="page-placeholder__title">Article not found</h1>
            <p class="page-placeholder__description">We couldn't find a post at <code>/blog/${slug}</code>.</p>
            <div class="page-placeholder__actions">
              <a href="/blog" data-nav-link class="btn btn--primary">Back to Blog</a>
            </div>
          </div>
        </section>
      </div>`,
      meta: null,
    };
  }

  const coverImage = blogCoverImage(post);
  const publishedLabel = formatDate(post.publishedAt);

  return {
    html: `<article class="static-page blog-detail">
      <header class="blog-detail__header" data-animate-section>
        <div class="container blog-detail__header-inner">
          <p class="blog-detail__eyebrow" data-animate-item>
            <a href="/blog" data-nav-link class="inline-link">← Back to Blog</a>
          </p>
          <h1 class="blog-detail__title" data-animate-item>${post.title}</h1>
          <div class="blog-detail__meta" data-animate-item>
            <span>By ${post.authorName || 'Van Conversion Team'}</span>
            ${publishedLabel ? `<time datetime="${post.publishedAt}">${publishedLabel}</time>` : ''}
          </div>
        </div>
      </header>
      <div class="blog-detail__cover container" data-animate-item>
        ${renderLazyImage({
          src: coverImage,
          alt: post.title,
          className: 'blog-detail__cover-image',
          width: 1200,
          height: 675,
          sizes: IMAGE_SIZES.content,
          widths: [640, 960, 1200, 1600],
        })}
      </div>
      <div class="container blog-detail__layout">
        <div class="blog-detail__content prose" data-animate-item>
          ${post.content}
        </div>
        ${renderRelatedPosts(post.relatedPosts)}
      </div>
    </article>`,
    meta: {
      title: `${post.title} | Blog | ${SITE.name}`,
      description: post.excerpt || post.title,
      image: coverImage,
    },
    structuredData: [buildBlogPostingSchema(post, coverImage)],
  };
}

export function mountBlogDetailPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
