const THEME = 'dark';

export function applyTheme(theme = THEME) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.dataset.theme = theme;
}

export function initTheme() {
  applyTheme(THEME);
  return THEME;
}
