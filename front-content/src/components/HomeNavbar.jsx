import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50 w-11/12 md:w-3/4 rounded-lg">
      {/* Left Side - Name */}

      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <a href="/">
            <img
              src="https://res.cloudinary.com/dsajmotau/image/upload/v1749575057/IMG_9901_rnjndf.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
      {/* Middle Section - Navigation Links */}
      <div className="hidden md:flex gap-4">
        <a
          onClick={() => handleScroll("home")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Home
        </a>
        <a
          onClick={() => handleScroll("about")}
          className="hover:text-gray-400 cursor-pointer"
        >
          About
        </a>
        <a
          onClick={() => handleScroll("contact")}
          className="hover:text-gray-400 cursor-pointer"
        >
          Contact
        </a>
      </div>
      {/* Right Side - Button */}
      <button
        onClick={() => navigate("/gallery")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        View My Work
      </button>
    </nav>
  );
};

export default Navbar;
