import { createContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
} from "../services/auth/auth.api.js";
import authEvents from "./auth.events.js";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getCurrentUser(controller.signal)
      .then(setUser)
      .catch(() => {
        if (!controller.signal.aborted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    function clearAuthenticatedUser() {
      setUser(null);
    }

    window.addEventListener(authEvents.unauthorized, clearAuthenticatedUser);
    return () => {
      window.removeEventListener(authEvents.unauthorized, clearAuthenticatedUser);
    };
  }, []);

  async function login(credentials) {
    const authenticatedUser = await loginRequest(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
  }

  const value = useMemo(
    () => ({ isLoading, login, logout, user }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
