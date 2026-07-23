import { renderHeader, bindHeader } from './header.js';
import { renderFooter } from './footer.js';
import { renderScrollToTop, bindScrollToTop } from './scrollToTop.js';

export function renderLayout({ currentPath, mainContent, pageTitle }) {
  document.title = pageTitle;

  return `${renderHeader(currentPath)}
    <main id="main-content" class="site-main" tabindex="-1">
      ${mainContent}
    </main>
    ${renderFooter()}
    ${renderScrollToTop()}`;
}

export function bindLayout() {
  bindHeader();
  bindScrollToTop();
}
