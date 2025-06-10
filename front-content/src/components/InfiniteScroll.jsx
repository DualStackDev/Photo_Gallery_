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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md z-50"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              // Change flex direction for mobile: column on mobile, row on md+
              className="flex flex-col md:flex-row bg-gray-900 bg-opacity-70 backdrop-blur-lg text-white rounded-lg overflow-hidden max-w-5xl w-full h-[80vh] shadow-2xl border border-gray-200/20 m-6"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image on top for mobile, left for desktop */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center pt-4">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.imageName}
                  className="object-contain p-4 w-full h-full"
                />
              </div>
              {/* Details below image for mobile, right for desktop */}
              <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-start">
                <h2 className="text-xl font-bold mb-2 text-left">
                  {imageDetails?.imageName ||
                    selectedImage.imageName ||
                    "No Name"}
                </h2>
                <div className="text-gray-300 mb-4 text-left">
                  {(imageDetails?.tags || selectedImage.tags || [])
                    .filter(Boolean)
                    .map((tag) =>
                      tag
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .map((t, idx) => (
                          <span key={t + idx} className="mr-2">
                            #{t}
                          </span>
                        ))
                    )}
                </div>
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
