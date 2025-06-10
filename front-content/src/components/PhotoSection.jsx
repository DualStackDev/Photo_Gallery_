// PhotoSection.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PhotoSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

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

  // Continuous rotation animation for the photo
  const photoRotateVariants = {
    hidden: {
      opacity: 0,
      rotateY: -30,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: {
        opacity: { duration: 0.6 },
        rotateY: { duration: 0.8, ease: "easeOut" },
      },
    },
    rotate: {
      rotateY: [0, 360],
      transition: {
        rotateY: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  // Start the rotation animation after the initial fade-in
  useEffect(() => {
    if (inView) {
      controls.start("visible").then(() => {
        controls.start("rotate");
      });
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <motion.div
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className="min-h-screen bg-gray-900 p-8 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl w-full">
        <motion.h2
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold mb-12 text-white text-center"
        >
          Meet Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Centered photo with rotating animation */}
          <motion.div
            variants={photoRotateVariants}
            className="w-64 h-64 md:w-80 md:h-80 perspective-800 mb-8 md:mb-0"
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-gray-800 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dsajmotau/image/upload/v1749575057/IMG_9901_rnjndf.jpg"
                alt="My photo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div variants={textVariants} className="text-white max-w-lg">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              Hi, I am Aryan!
            </h3>
            <p className="text-lg mb-6">
              I am a Journalism & Mass Communication graduate by profession,
              with a keen interest in journalistic writing, but I am also
              passionate about Candid Photography.
            </p>
            <p className="text-lg">
              I am not a professional photographer, but capturing moments using
              my Sony ZV-E10 is something I like exploring.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoSection;
