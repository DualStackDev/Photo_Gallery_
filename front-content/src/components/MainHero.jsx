import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MainHero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false, // Changed to false to allow re-animation on scroll up/down
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      id="home"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={textVariants}
      className="min-h-screen flex flex-col justify-center items-center text-white p-8"
      style={{
        background:
          "linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)",
      }}
    >
      <motion.h1
        variants={textVariants}
        className="text-6xl md:text-8xl font-bold mb-4 text-center"
      >
        Aryan Agarwal
      </motion.h1>
      <motion.div variants={textVariants} className="max-w-2xl text-center">
        <p className="text-xl md:text-2xl mb-6">
          Capturing life's extraordinary moments through the lens of passion
        </p>
        <p className="text-lg opacity-80">
          Based in New York, specializing in portrait, landscape, and street
          photography
        </p>
      </motion.div>

      <motion.div variants={textVariants} className="mt-12">
        <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition duration-300">
          View Portfolio
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MainHero;
