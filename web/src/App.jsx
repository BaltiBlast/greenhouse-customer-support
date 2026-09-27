import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ClientCreatePage from "./pages/Client/ClientCreate/ClientCreate.page.jsx";
import ClientDetailsPage from "./pages/Client/ClientDetails/ClientDetails.page.jsx";
import ClientsPage from "./pages/Client/Clients/Clients.page.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.page.jsx";
import EventCreatePage from "./pages/Event/EventCreate/EventCreate.page.jsx";
import EventDetailsPage from "./pages/Event/EventDetails/EventDetails.page.jsx";
import LoginPage from "./pages/Login/Login.page.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/new" element={<ClientCreatePage />} />
        <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
        <Route path="/events" element={<DashboardPage />} />
        <Route path="/events/new" element={<EventCreatePage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
      </Routes>
    </>
  );
}
