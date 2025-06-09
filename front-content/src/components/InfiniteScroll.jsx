import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const InfiniteScrollImageGallery = ({ folderName }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const loaderRef = useRef(null);

  // Fetch all images in the folder on mount or when folderName changes
  useEffect(() => {
    if (!folderName) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gallery/folder/${folderName}`)
      .then((res) => {
        console.log("Fetched images:", res.data); // Debug log
        setImages(res.data);
      })
      .catch((err) => setImages([]));
  }, [folderName]);

  // Fetch image details from backend
  const getImageDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery/photo/${id}`
      );
      setImageDetails(response.data);
    } catch (error) {
      setImageDetails(null);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    getImageDetails(image._id);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setImageDetails(null);
  };

  return (
    <div className="relative p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((image) => (
        <motion.div
          key={image._id}
          className="mb-4 break-inside-avoid rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(image)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={image.image}
            alt={image.imageName}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      ))}
      <div ref={loaderRef} className="h-16"></div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex bg-gray-900 text-white rounded-lg overflow-hidden max-w-5xl w-full h-[80vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-1/2 h-full">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.imageName}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/2 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">
                  {imageDetails?.imageName ||
                    selectedImage.imageName ||
                    "No Name"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {imageDetails?.tags?.join(", ") ||
                    selectedImage.tags?.join(", ")}
                </p>
                {/* Add more details if needed */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteScrollImageGallery;
