import { useNavigate } from "react-router-dom";

const GalleryNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50 w-11/12 md:w-3/4 rounded-lg">
      {/* Left Side - Name */}
      <h1 className="text-xl font-bold">
        <button onClick={() => navigate("/")}>Your Name</button>
      </h1>

      {/* Middle Section - Navigation Links */}
      <div className="hidden md:flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>
    </nav>
  );
};

export default GalleryNavbar;
