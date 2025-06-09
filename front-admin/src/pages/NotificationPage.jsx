import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all notifications from backend
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact/notifications`
        );
        const data = await res.json();
        if (data.success) {
          setNotifications(data.data);
        }
      } catch (err) {
        // Optionally handle error
      }
      setLoading(false);
    };
    fetchNotifications();
  }, []);

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
          <h1 className="ml-4 text-xl font-semibold text-gray-200">
            Notification
          </h1>
        </div>

        {/* Notifications */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400">No notifications found.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notif) => (
                <li
                  key={notif._id}
                  className="bg-gray-800 rounded p-4 shadow border border-gray-700"
                >
                  <div className="font-semibold">{notif.subject}</div>
                  <div className="text-gray-300">{notif.message}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    From: {notif.name} Contact: {notif.email} {notif.phone} |{" "}
                    {new Date(notif.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
