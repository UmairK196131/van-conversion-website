import './styles/main.css';
import { createRouter } from './lib/router.js';
import { initTheme, toggleTheme, syncThemeToggleButtons } from './lib/theme.js';
import { renderLayout, bindLayout } from './components/layout.js';
import { routes } from './pages/index.js';
import { SITE } from './config/site.js';

const app = document.getElementById('app');

function mountPage(path, route) {
  if (!app || !route) return;

  app.innerHTML = renderLayout({
    currentPath: path,
    mainContent: route.render(),
    pageTitle: route.title,
  });

  bindLayout();
  syncThemeToggleButtons(document.documentElement.dataset.theme ?? 'light');
  document.getElementById('main-content')?.focus({ preventScroll: true });
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

router.start();
