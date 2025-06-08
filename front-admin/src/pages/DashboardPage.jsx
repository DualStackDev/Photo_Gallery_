import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [navOpen, setNavOpen] = useState(false);

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
              to="/"
              end
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:text-blue-400 ${
                  isActive ? "text-blue-400" : "text-gray-100"
                }`
              }
              onClick={() => setNavOpen(false)}
            >
              Dashboard
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
          <h1 className="ml-4 text-xl font-semibold text-gray-200">
            Dashboard
          </h1>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-400">
            Here you can view stats, recent uploads, and manage your photo
            gallery.
          </p>
        </div>
      </div>
    </div>
  );
}
