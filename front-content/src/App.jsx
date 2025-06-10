import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.jsx";
import Photos from "./pages/PhotosPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:folderName" element={<Photos />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
