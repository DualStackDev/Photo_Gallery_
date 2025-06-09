import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

export default function DeletePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setName("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!type || !name) {
      setMessage("Please select a type and enter a name.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/delete/`,
        {
          data: { type, name },
        }
      );
      setMessage(res.data.message || "Deleted successfully.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Error deleting. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: navOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-md z-30"
      >
        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Admin Menu
        </div>
        <ul className="p-4 space-y-2">
          <li>
            <NavLink
              to="/delete"
              end
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:text-blue-400 ${
                  isActive ? "text-blue-400" : "text-gray-100"
                }`
              }
              onClick={() => setNavOpen(false)}
            >
              Delete
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:text-blue-400 ${
                  isActive ? "text-blue-400" : "text-gray-100"
                }`
              }
              onClick={() => setNavOpen(false)}
            >
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification"
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:text-blue-400 ${
                  isActive ? "text-blue-400" : "text-gray-100"
                }`
              }
              onClick={() => setNavOpen(false)}
            >
              Notification
            </NavLink>
          </li>
        </ul>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center p-4 shadow bg-gray-800 sticky top-0 z-20">
          {navOpen ? (
            <X
              className="w-6 h-6 cursor-pointer text-gray-200"
              onClick={() => setNavOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 cursor-pointer text-gray-200"
              onClick={() => setNavOpen(true)}
            />
          )}
          <h1 className="ml-4 text-xl font-semibold text-gray-200">Delete</h1>
        </div>

        {/* Delete Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Delete Photo or Folder</h2>
          <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div>
              <label className="block mb-1">Select type</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100"
                value={type}
                onChange={handleTypeChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="photo">Photo</option>
                <option value="folder">Folder</option>
              </select>
            </div>
            {type && (
              <div>
                <label className="block mb-1">
                  {type === "photo" ? "Photo Name" : "Folder Name"}
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100"
                  placeholder={
                    type === "photo" ? "Enter photo name" : "Enter folder name"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
            {message && (
              <div className="mt-2 text-sm text-center text-red-400">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
