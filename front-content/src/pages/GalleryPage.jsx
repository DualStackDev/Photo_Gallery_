import { useEffect, useState } from "react";
import GalleryNavbar from "../components/GalleryNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gallery/candid`)
      .then((res) => setAlbums(res.data));
  }, []);

  return (
    <>
      <GalleryNavbar />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.name}
            onClick={() => navigate(`/gallery/${album.name}`)}
            className="cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={album.coverImage}
              alt={album.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 font-semibold text-center">{album.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GalleryPage;
