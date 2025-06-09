import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function UploadPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) setImageName(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !imageName || !folderName) {
      setMessage("Please fill all required fields and select an image.");
      return;
    }
    setUploading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("imageName", imageName);
      formData.append("folderName", folderName);
      formData.append("tags", tags);
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Image uploaded successfully!");
        setFile(null);
        setImageName("");
        setFolderName("");
        setTags("");
      } else {
        setMessage(data.message || "Upload failed.");
      }
    } catch (err) {
      setMessage("Upload failed.");
    }
    setUploading(false);
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
            Admin Panel
          </h1>
        </div>
        {/* Upload Form */}
        <div className="flex flex-col p-6 gap-4 lg:flex-row">
          {/* Left: Upload Section */}
          <div className="w-1/2 bg-gray-800 border border-dashed border-gray-600 rounded-lg flex flex-col justify-center items-center p-6 ">
            <p className="text-gray-400 mb-4">Drag & drop image here</p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm text-gray-100"
            >
              Browse Files
            </label>
            {file && (
              <div className="mt-2 text-gray-300 text-xs">
                Selected: {file.name}
              </div>
            )}
          </div>

          {/* Right: Form Inputs */}
          <form
            className="w-1/2 bg-gray-800 p-6 rounded-lg shadow space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-300 mb-1">Image Name</label>
              <input
                type="text"
                className="w-full border border-gray-600 bg-gray-900 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Enter image name"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Folder Name</label>
              <input
                type="text"
                className="w-full border border-gray-600 bg-gray-900 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Tags</label>
              <input
                type="text"
                className="w-full border border-gray-600 bg-gray-900 text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Enter tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
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
