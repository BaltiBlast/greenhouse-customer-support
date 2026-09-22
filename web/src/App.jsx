import { Route, Routes } from "react-router";
import Navigation from "./components/Navigation/Navigation.jsx";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<h1>Greenhouse Customer Support</h1>} />
      </Routes>
    </>
  );
}
