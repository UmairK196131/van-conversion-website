const STORAGE_KEY = 'theme';

export function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

export function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

export function setTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  syncThemeToggleButtons(theme);
}

export function toggleTheme() {
  const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function syncThemeToggleButtons(theme) {
  const isDark = theme === 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    const label = button.querySelector('[data-theme-label]');
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  });
}

export function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);
  return theme;
}
