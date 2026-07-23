import './styles/main.css';
import { createRouter } from './lib/router.js';
import { initTheme, toggleTheme, syncThemeToggleButtons } from './lib/theme.js';
import { initLiveChat } from './components/widgets/liveChat.js';
import { renderLayout, bindLayout } from './components/layout.js';
import { routes } from './pages/index.js';
import { SITE } from './config/site.js';

const app = document.getElementById('app');

function mountPage(path, route, params = {}) {
  if (!app || !route) return;

  Promise.resolve(route.render(params)).then((result) => {
    let mainContent = result;
    let pageTitle = route.title;
    let pageDescription = route.description;
    let pageImage;

    if (result && typeof result === 'object' && 'html' in result) {
      mainContent = result.html;
      if (result.meta) {
        pageTitle = result.meta.title ?? pageTitle;
        pageDescription = result.meta.description ?? pageDescription;
        pageImage = result.meta.image;
      }
    }

    app.innerHTML = renderLayout({
      currentPath: path,
      mainContent,
      pageTitle,
      pageDescription,
      pageImage,
    });

    bindLayout();
    syncThemeToggleButtons(document.documentElement.dataset.theme ?? 'light');
    document.getElementById('main-content')?.focus({ preventScroll: true });

    if (route.mount) route.mount(router, params);
  });
}

function mountNotFound(path) {
  if (!app) return;

  app.innerHTML = renderLayout({
    currentPath: path,
    mainContent: `<section class="page-placeholder">
      <div class="page-placeholder__inner">
        <p class="page-placeholder__eyebrow">404</p>
        <h1 class="page-placeholder__title">Page not found</h1>
        <p class="page-placeholder__description">We couldn't find <code>${path}</code>.</p>
        <div class="page-placeholder__actions">
          <a href="/" data-nav-link class="btn btn--primary">Back to Home</a>
        </div>
      </div>
    </section>`,
    pageTitle: `Page Not Found | ${SITE.name}`,
    pageDescription: 'The page you are looking for could not be found.',
  });

  bindLayout();
  syncThemeToggleButtons(document.documentElement.dataset.theme ?? 'light');
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-theme-toggle]')) return;
  const theme = toggleTheme();
  syncThemeToggleButtons(theme);
});

const router = createRouter({
  routes,
  onRouteChange: mountPage,
  notFound: mountNotFound,
});

const theme = initTheme();
syncThemeToggleButtons(theme);
initLiveChat();

router.start();
