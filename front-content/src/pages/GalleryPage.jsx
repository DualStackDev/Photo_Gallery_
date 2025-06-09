import { useEffect, useState } from "react";
import GalleryNavbar from "../components/GalleryNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GalleryPage = () => {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/folders`)
      .then((res) => setFolders(res.data));
  }, []);

  return (
    <>
      <GalleryNavbar />
      <div className="pt-28 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <div
            key={folder._id}
            onClick={() => navigate(`/gallery/${folder.name}`)}
            className="cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition bg-white"
            style={{ minHeight: 0, maxWidth: 160 }}
          >
            {/* Small square placeholder */}
            <div className="w-full h-24 bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
              {folder.name.toUpperCase()}
            </div>
            <div className="p-2 font-semibold text-center text-gray-800 text-sm">
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryPage;
