import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation.jsx";
import ClientCreatePage from "./pages/ClientCreate/ClientCreate.page.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.page.jsx";
import EventCreatePage from "./pages/EventCreate/EventCreate.page.jsx";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/clients/new" element={<ClientCreatePage />} />
        <Route path="/events/new" element={<EventCreatePage />} />
      </Routes>
    </>
  );
}
