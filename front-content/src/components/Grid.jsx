import React from "react";
import { motion } from "framer-motion";

const gridItems = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  aspect: ["aspect-square", "aspect-video", "aspect-[4/3]", "aspect-[3/2]"][
    Math.floor(Math.random() * 4)
  ],
}));

const Grid = () => {
  return (
    <div className="columns-3 md:columns-4 gap-4 p-6 w-full space-y-4">
      {gridItems.map((item) => (
        <motion.div
          key={item.id}
          className={`inline-block w-full rounded-lg shadow-lg ${item.aspect}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2025/02/09/12/22/snowdrops-9394219_1280.jpg"
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Grid;
