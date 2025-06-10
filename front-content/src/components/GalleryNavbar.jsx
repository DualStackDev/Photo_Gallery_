import { useNavigate } from "react-router-dom";

const GalleryNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50 w-11/12 md:w-3/4 rounded-lg">
      {/* Left Side - Gallery Title */}
      <div className="text-xl font-semibold">Gallery</div>

      {/* Center - Home Icon */}
      <button
        onClick={() => navigate("/")}
        className="text-white hover:text-gray-300 transition"
        aria-label="Go to Home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.75L12 4l9 6.75M4.5 10.75V20h15v-9.25"
          />
        </svg>
      </button>
    </nav>
  );
};

export default GalleryNavbar;
