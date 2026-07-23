import { SITE, FOOTER_LINKS, SOCIAL_LINKS } from '../config/site.js';

function socialIcon(name) {
  const icons = {
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 10V7.5c0-.83.67-1.5 1.5-1.5H16V3h-2a4 4 0 0 0-4 4v3H8v3.5h2V21h3v-7.5h2.5L16 10h-3z"/></svg>`,
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.12 5 12 5 12 5s-6.12 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.88 19 12 19 12 19s6.12 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>`,
  };
  return icons[name] ?? '';
}

export function renderFooter() {
  const quickLinks = FOOTER_LINKS.map(
    (link) => `<li><a href="${link.path}" data-nav-link class="footer-link">${link.label}</a></li>`
  ).join('');

  const socialLinks = SOCIAL_LINKS.map(
    (link) =>
      `<li>
        <a href="${link.href}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
          ${socialIcon(link.icon)}
        </a>
      </li>`
  ).join('');

  const year = new Date().getFullYear();

  return `<footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <a href="/" data-nav-link class="site-logo site-logo--footer">
            <img src="/favicon.svg" alt="" width="32" height="32" class="site-logo__mark" />
            <span class="site-logo__text">${SITE.name}</span>
          </a>
          <p class="site-footer__tagline">${SITE.tagline}</p>
          <address class="site-footer__contact not-italic">
            <p>${SITE.address}</p>
            <p><a href="mailto:${SITE.email}" class="footer-link">${SITE.email}</a></p>
            <p><a href="tel:${SITE.phone.replace(/\s/g, '')}" class="footer-link">${SITE.phone}</a></p>
          </address>
        </div>

        <div>
          <h2 class="site-footer__heading">Quick Links</h2>
          <ul class="site-footer__links">${quickLinks}</ul>
        </div>

        <div>
          <h2 class="site-footer__heading">Follow Us</h2>
          <ul class="site-footer__social">${socialLinks}</ul>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>&copy; ${year} ${SITE.name}. All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}
