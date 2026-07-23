import { SITE, NAV_LINKS } from '../config/site.js';

const CONTACT_PATH = '/contact';

function mailIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="nav-cta__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>`;
}

function menuIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M4 6h16M4 12h16M4 18h16"/>
  </svg>`;
}

function closeIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>`;
}

function renderContactCta(currentPath, variant) {
  const isActive = currentPath === CONTACT_PATH;

  return `<a
    href="${CONTACT_PATH}"
    data-nav-link
    class="nav-cta btn btn--primary nav-cta--${variant}${isActive ? ' nav-cta--active' : ''}"
    ${isActive ? 'aria-current="page"' : ''}
  >
    ${mailIcon()}
    <span>Contact Us</span>
  </a>`;
}

export function renderHeader(currentPath) {
  const navItems = NAV_LINKS.filter((link) => link.path !== CONTACT_PATH)
    .map((link) => {
      const isActive = link.path === currentPath;
      return `<li>
        <a
          href="${link.path}"
          data-nav-link
          class="nav-link${isActive ? ' nav-link--active' : ''}"
          ${isActive ? 'aria-current="page"' : ''}
        >${link.label}</a>
      </li>`;
    })
    .join('');

  return `<header id="site-header" class="site-header">
    <div class="site-header__inner">
      <a href="/" data-nav-link class="site-logo" aria-label="${SITE.name} — Home">
        <img src="/favicon.svg" alt="" width="36" height="36" class="site-logo__mark" />
        <span class="site-logo__text">${SITE.name}</span>
      </a>

      <nav class="site-nav" aria-label="Main navigation">
        <button
          type="button"
          class="site-nav__toggle"
          id="nav-toggle"
          aria-expanded="false"
          aria-controls="nav-menu"
          aria-label="Open menu"
        >
          <span class="site-nav__toggle-icon site-nav__toggle-icon--open">${menuIcon()}</span>
          <span class="site-nav__toggle-icon site-nav__toggle-icon--close hidden">${closeIcon()}</span>
        </button>

        <ul id="nav-menu" class="site-nav__menu">
          ${navItems}
          <li class="site-nav__cta-mobile">
            ${renderContactCta(currentPath, 'mobile')}
          </li>
        </ul>
      </nav>

      <div class="site-header__cta">
        ${renderContactCta(currentPath, 'desktop')}
      </div>
    </div>
  </header>`;
}

export function bindHeader() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!header || !toggle || !menu) return;

  const openIcon = toggle.querySelector('.site-nav__toggle-icon--open');
  const closeIconEl = toggle.querySelector('.site-nav__toggle-icon--close');

  function setMenuOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menu.classList.toggle('site-nav__menu--open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    openIcon?.classList.toggle('hidden', isOpen);
    closeIconEl?.classList.toggle('hidden', !isOpen);
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a[data-nav-link]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  function updateHeaderOnScroll() {
    header.classList.toggle('site-header--scrolled', window.scrollY > 8);
  }

  updateHeaderOnScroll();
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
}
