import { renderHeader, bindHeader } from './header.js';
import { renderFooter, bindFooter } from './footer.js';
import { renderScrollToTop, bindScrollToTop } from './scrollToTop.js';
import { renderWhatsAppWidget } from './widgets/whatsappWidget.js';
import { renderBrochureModal } from './newsletter/index.js';
import { setPageMeta, setStructuredData } from '../lib/seo.js';

export function renderLayout({
  currentPath,
  mainContent,
  pageTitle,
  pageDescription,
  pageImage,
  structuredData = [],
}) {
  setPageMeta({
    title: pageTitle,
    description: pageDescription,
    path: currentPath,
    image: pageImage,
  });
  setStructuredData(structuredData);

  return `${renderHeader(currentPath)}
    <main id="main-content" class="site-main" tabindex="-1">
      ${mainContent}
    </main>
    ${renderFooter()}
    ${renderScrollToTop()}
    ${renderWhatsAppWidget()}
    ${renderBrochureModal()}`;
}

export function bindLayout() {
  bindHeader();
  bindFooter();
  bindScrollToTop();
}
