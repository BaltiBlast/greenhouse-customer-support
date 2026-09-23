import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation.jsx";
import DashboardPage from "./pages/Dashboard/Dashboard.page.jsx";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </>
  );
}
