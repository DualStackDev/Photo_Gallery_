import { useEffect, useState } from "react";
import GalleryNavbar from "../components/GalleryNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GalleryPage = () => {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/folders`)
      .then((res) => setFolders(res.data));
  }, []);

  return (
    <>
      <GalleryNavbar />
      <div className="mt-[25vh] px-8 md:px-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {folders.map((folder) => (
          <div
            key={folder._id}
            onClick={() => navigate(`/gallery/${folder.name}`)}
            className="cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition bg-white/90 backdrop-blur-md border border-white/20"
            style={{ minHeight: 0, maxWidth: 180 }}
          >
            {/* Folder icon area */}
            <div className="w-full h-24 flex items-center justify-center text-gray-900 font-bold text-lg tracking-wide">
              {folder.name.toUpperCase()}
            </div>
            {/* Folder name */}
            <div className="p-3 text-center text-sm font-semibold text-gray-900">
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryPage;
