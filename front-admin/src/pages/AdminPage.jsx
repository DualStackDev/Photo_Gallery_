import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [albums, setAlbums] = useState([]);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const res = await axios.get("/api/albums");
    setAlbums(res.data);
  };

  const createAlbum = async () => {
    if (!newAlbumName) return;
    await axios.post("/api/albums", { name: newAlbumName });
    setNewAlbumName("");
    fetchAlbums();
  };

  const uploadPhoto = async () => {
    if (!selectedAlbum || !imageFile) return;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("name", imageName);
    formData.append("description", description);
    formData.append("tags", tags);

    await axios.post(`/api/albums/${selectedAlbum}/upload`, formData);
    alert("Photo uploaded!");
    setImageFile(null);
    setImageName("");
    setDescription("");
    setTags("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Album creation */}
      <div className="bg-white p-4 shadow rounded-xl space-y-2">
        <h2 className="text-xl font-semibold">Create New Album</h2>
        <input
          type="text"
          placeholder="Album name"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={createAlbum}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Album
        </button>
      </div>

      {/* Photo upload */}
      <div className="bg-white p-4 shadow rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Upload Photo</h2>
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select album</option>
          {albums.map((album) => (
            <option key={album} value={album}>
              {album}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />
        <input
          type="text"
          placeholder="Image name"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={uploadPhoto}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
}
