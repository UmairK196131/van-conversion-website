export function createRouter({ routes, onRouteChange, notFound }) {
  let currentPath = null;

  function normalizePath(path) {
    if (!path || path === '/') return '/';
    return path.replace(/\/+$/, '') || '/';
  }

  function matchRoute(path) {
    const normalized = normalizePath(path);
    return routes.find((route) => route.path === normalized) ?? null;
  }

  function getCurrentPath() {
    return normalizePath(window.location.pathname);
  }

  function navigate(path, { replace = false } = {}) {
    const normalized = normalizePath(path);
    if (normalized === getCurrentPath()) {
      onRouteChange(normalized, matchRoute(normalized));
      return;
    }

    if (replace) {
      window.history.replaceState({ path: normalized }, '', normalized);
    } else {
      window.history.pushState({ path: normalized }, '', normalized);
    }

    render(normalized);
  }

  function render(path = getCurrentPath()) {
    const normalized = normalizePath(path);
    const route = matchRoute(normalized);
    currentPath = normalized;

    if (route) {
      onRouteChange(normalized, route);
    } else {
      notFound(normalized);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function start() {
    window.addEventListener('popstate', () => render());
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-nav-link]');
      if (!link || link.target === '_blank') return;

      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;

      event.preventDefault();
      navigate(href);
    });

    render();
  }

  return {
    navigate,
    render,
    start,
    getCurrentPath: () => currentPath ?? getCurrentPath(),
    matchRoute,
  };
}
