import { SITE } from '../../config/site.js';

const HERO_POSTER =
  'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=1920&q=80&auto=format&fit=crop';
const HERO_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-driving-a-car-on-a-country-road-4068-large.mp4';

export function renderHero() {
  return `<section class="hero" data-hero aria-label="Hero banner">
    <div class="hero__media" aria-hidden="true">
      <video
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
        poster="${HERO_POSTER}"
        data-hero-video
      >
        <source src="${HERO_VIDEO}" type="video/mp4" />
      </video>
      <button
        type="button"
        class="hero__video-control"
        data-hero-video-toggle
        aria-label="Pause background video"
        aria-pressed="false"
      >
        <svg class="hero__video-icon hero__video-icon--pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/>
        </svg>
        <svg class="hero__video-icon hero__video-icon--play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" hidden>
          <path d="M8 5v14l11-7L8 5z"/>
        </svg>
      </button>
      <img class="hero__image" src="${HERO_POSTER}" alt="" loading="eager" fetchpriority="high" />
    </div>
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="hero__content">
      <div class="container">
        <p class="hero__eyebrow" data-hero-item>Premium Van Conversions</p>
        <h1 class="hero__title" data-hero-item>Adventure Starts With a Custom Build</h1>
        <p class="hero__subtitle" data-hero-item>
          ${SITE.tagline} Expert craftsmanship, off-grid systems, and bespoke interiors — built for life on the road.
        </p>
        <div class="hero__actions" data-hero-item>
          <a href="/contact" data-nav-link class="btn btn--primary btn--lg">Start Your Build</a>
          <a href="/portfolio" data-nav-link class="btn btn--secondary btn--lg btn--on-dark">View Our Work</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function bindHero() {
  const video = document.querySelector('[data-hero-video]');
  if (!video) return;

  const toggleButton = document.querySelector('[data-hero-video-toggle]');
  const pauseIcon = toggleButton?.querySelector('.hero__video-icon--pause');
  const playIcon = toggleButton?.querySelector('.hero__video-icon--play');

  const updateToggleState = (isPlaying) => {
    if (!toggleButton) return;
    toggleButton.setAttribute(
      'aria-label',
      isPlaying ? 'Pause background video' : 'Play background video'
    );
    toggleButton.setAttribute('aria-pressed', isPlaying ? 'false' : 'true');
    if (pauseIcon) pauseIcon.hidden = !isPlaying;
    if (playIcon) playIcon.hidden = isPlaying;
  };

  const playVideo = () => {
    video
      .play()
      .then(() => updateToggleState(true))
      .catch(() => {
        video.classList.add('hero__video--hidden');
      });
  };

  video.addEventListener('error', () => {
    video.classList.add('hero__video--hidden');
    toggleButton?.setAttribute('hidden', '');
  });

  toggleButton?.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
    } else {
      video.pause();
      updateToggleState(false);
    }
  });

  if (video.readyState >= 2) {
    playVideo();
  } else {
    video.addEventListener('loadeddata', playVideo, { once: true });
  }
}
