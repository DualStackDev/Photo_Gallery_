// ContactSection.jsx
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";

const ContactSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
    services: [],
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Animation when scrolling in/out of view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.number
    ) {
      setFormStatus({
        submitted: true,
        error: true,
        message: "Please fill out all required fields",
      });
      return;
    }

    try {
      // Send POST request to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        subject: formData.subject,
        message: formData.message,
      });
      setFormStatus({
        submitted: true,
        error: false,
        message: "Thank you for your message! I'll get back to you soon.",
      });
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        number: "",
        subject: "",
        message: "",
        services: [],
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message:
          "There was an error submitting the form. Please try again later.",
      });
    }

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false,
        message: "",
      });
    }, 5000);
  };

  return (
    <motion.div
      id="contact"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-8 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got work for me? Fill out the form below and I will reach out to you
            within 24 hours.
          </p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 md:p-10 shadow-2xl max-w-3xl mx-auto"
        >
          {formStatus.submitted && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                formStatus.error
                  ? "bg-red-500 bg-opacity-20 text-red-200"
                  : "bg-green-500 bg-opacity-20 text-green-200"
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phoneNo" className="block text-gray-300 mb-2">
                Phone no *
              </label>
              <input
                type="phone number"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(91+) 1234567890"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's this about?"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell me about your project or inquiry..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition duration-300 transform hover:scale-[1.02]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ContactSection;
