import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import DeletePage from "./pages/DeletePage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<NotificationPage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
}
