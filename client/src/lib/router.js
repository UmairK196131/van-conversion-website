function compileRoute(path) {
  const paramNames = [];
  const pattern = path.replace(/\/+$/, '').replace(/:([a-zA-Z]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });

  return {
    path,
    paramNames,
    regex: new RegExp(`^${pattern}$`),
  };
}

export function createRouter({ routes, onRouteChange, notFound }) {
  let currentPath = null;
  const compiledRoutes = routes.map((route) => ({
    ...route,
    ...(route.path.includes(':') ? { compiled: compileRoute(route.path) } : {}),
  }));

  function normalizePath(path) {
    if (!path || path === '/') return '/';
    return path.replace(/\/+$/, '') || '/';
  }

  function matchRoute(path) {
    const normalized = normalizePath(path);

    for (const route of compiledRoutes) {
      if (route.compiled) {
        const match = normalized.match(route.compiled.regex);
        if (!match) continue;

        const params = {};
        route.compiled.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });

        return { route, params };
      }

      if (route.path === normalized) {
        return { route, params: {} };
      }
    }

    return null;
  }

  function getCurrentPath() {
    return normalizePath(window.location.pathname);
  }

  function navigate(path, { replace = false } = {}) {
    const normalized = normalizePath(path);
    if (normalized === getCurrentPath()) {
      const matched = matchRoute(normalized);
      onRouteChange(normalized, matched?.route ?? null, matched?.params ?? {});
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
    const matched = matchRoute(normalized);
    currentPath = normalized;

    if (matched) {
      onRouteChange(normalized, matched.route, matched.params);
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
    matchRoute: (path) => matchRoute(path)?.route ?? null,
  };
}
