import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const YOUR_ACCESS_KEY = "njsmFZFlgHzuSiAywGmDwEKvFM3w-KbsDsXXGcagKVM";
const InfiniteScrollImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const loaderRef = useRef(null);

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=${YOUR_ACCESS_KEY}&page=${page}&per_page=10`
      );
      setImages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  }, [page]);

  const fetchImageDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${id}?client_id=${YOUR_ACCESS_KEY}`
      );
      setImageDetails(response.data);
    } catch (error) {
      console.error("Error fetching image details", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    fetchImageDetails(image.id);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setImageDetails(null);
  };

  return (
    <div className="relative p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((image) => (
        <motion.div
          key={image.id}
          className="mb-4 break-inside-avoid rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(image)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={image.urls.small}
            alt={image.alt_description}
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
                  src={selectedImage.urls.regular}
                  alt={selectedImage.alt_description}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-1/2 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-2">
                  {imageDetails?.description || "No Description"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {imageDetails?.alt_description}
                </p>
                {imageDetails?.tags && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags:</h3>
                    <ul className="flex flex-wrap gap-2">
                      {imageDetails.tags.map((tag) => (
                        <li
                          key={tag.title}
                          className="px-2 py-1 bg-gray-700 rounded"
                        >
                          #{tag.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteScrollImageGallery;
