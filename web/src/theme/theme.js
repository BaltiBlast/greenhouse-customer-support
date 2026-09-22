const STORAGE_KEY = "greenhouse-theme";
const THEMES = ["light", "dark"];

export function isTheme(value) {
  return THEMES.includes(value);
}

export function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : getSystemTheme();
  } catch {
    return getSystemTheme();
  }
}

export function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme) {
  const resolvedTheme = isTheme(theme) ? theme : getSystemTheme();
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
  return resolvedTheme;
}

export function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Le thème reste utilisable pour la session lorsque le stockage est bloqué.
  }
}
