// Footer.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      link: "https://www.instagram.com/arynagrwl/",
    },
    {
      name: "LinkedIn",
      icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
      link: "https://www.linkedin.com/in/aryan-agarwal18/",
    },
  ];

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={footerVariants}
      className="bg-gray-900 text-gray-300 py-16"
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About Column */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-xl font-bold text-white mb-4">Disclaimer</h3>
            <p className="mb-4 text-gray-400 text-justify">
              I am not a professional photographer. My portfolio, as you can see
              on this website, has been created out of passion. Hence, consider
              hiring professional photographers for big events like weddings,
              birthdays, or seminars. I’d be best suitable as a side
              photographer, to capture random, light-hearted moments (candids)
              out of events and occasions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Portfolio
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacypolicy"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mt-0.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Pune, Maharashtra</span>
              </li>
              <li>
                <span>aryan.photography.188@gmail.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Find Me On</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    aria-label={social.name}
                    className="text-gray-400 hover:text-white transition duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 items-center text-center"
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0 ">
            &copy; {new Date().getFullYear()} Aryan Agarwal Photography. All
            rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
