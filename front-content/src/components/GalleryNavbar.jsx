import { useNavigate } from "react-router-dom";

const GalleryNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50 w-11/12 md:w-3/4 rounded-lg">
      {/* Left Side - Name */}
      <h1 className="text-xl font-bold">
        <button onClick={() => navigate("/")}>Your Name</button>
      </h1>
    </nav>
  );
};

export default GalleryNavbar;
