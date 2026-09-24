import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ClientCreatePage from "./pages/Client/ClientCreate/ClientCreate.page.jsx";
import ClientDetailsPage from "./pages/Client/ClientDetails/ClientDetails.page.jsx";
import ClientsPage from "./pages/Client/Clients/Clients.page.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.page.jsx";
import EventCreatePage from "./pages/EventCreate/EventCreate.page.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/new" element={<ClientCreatePage />} />
        <Route path="/clients/:clientId" element={<ClientDetailsPage />} />
        <Route path="/events/new" element={<EventCreatePage />} />
      </Routes>
    </>
  );
}
