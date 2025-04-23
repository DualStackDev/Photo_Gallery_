import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
