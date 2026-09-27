import { Navigate, Outlet, Route, Routes } from "react-router";
import useAuth from "./auth/useAuth.js";
import Navigation from "./components/Navigation/Navigation.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ClientCreatePage from "./pages/Client/ClientCreate/ClientCreate.page.jsx";
import ClientDetailsPage from "./pages/Client/ClientDetails/ClientDetails.page.jsx";
import ClientsPage from "./pages/Client/Clients/Clients.page.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.page.jsx";
import EventCreatePage from "./pages/Event/EventCreate/EventCreate.page.jsx";
import EventDetailsPage from "./pages/Event/EventDetails/EventDetails.page.jsx";
import LoginPage from "./pages/Login/Login.page.jsx";

function AuthenticatedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default function App() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <main aria-busy="true" aria-live="polite">
        <p>Chargement...</p>
      </main>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/new" element={<ClientCreatePage />} />
          <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
          <Route path="/events" element={<DashboardPage />} />
          <Route path="/events/new" element={<EventCreatePage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
}
