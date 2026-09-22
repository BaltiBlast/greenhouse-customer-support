import { createContext, useEffect, useMemo, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  isTheme,
  storeTheme,
} from "./theme.js";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    storeTheme(theme);
    applyTheme(theme);
  }, [theme]);

  function setTheme(nextTheme) {
    if (isTheme(nextTheme)) {
      setThemeState(nextTheme);
    }
  }

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
