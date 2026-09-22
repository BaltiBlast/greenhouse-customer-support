import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider.jsx";

export default function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme doit être utilisé dans ThemeProvider.");
  }

  return context;
}
