import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg z-50 w-3/4 rounded-lg">
      {/* Left Side - Name */}
      <h1 className="text-xl font-bold">Your Name</h1>

      {/* Middle Section - Search and Navigation */}
      <div className="relative flex items-center gap-6">
        {isSearchOpen ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center bg-gray-800 px-3 py-1 rounded-lg"
          >
            <input
              type="text"
              className="bg-transparent outline-none text-white w-full"
              placeholder="Search..."
            />
            <X
              className="ml-2 cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            />
          </motion.div>
        ) : (
          <Search
            className="cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          />
        )}

        {/* Navigation Links */}
        <div className="flex gap-4">
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
      </div>

      {/* Right Side - Button */}
      <button className=" hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
        View My Work
      </button>
    </nav>
  );
};

export default Navbar;
