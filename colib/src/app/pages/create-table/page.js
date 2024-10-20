"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion for animations

export default function LibraryCreation() {
  const router = useRouter();
  const [libraryName, setLibraryName] = useState("");
  const [books, setBooks] = useState([{ name: "" }]); // Store multiple books
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleBookChange = (index, value) => {
    const updatedBooks = [...books];
    updatedBooks[index].name = value;
    setBooks(updatedBooks);
  };

  const addBookField = () => {
    setBooks([...books, { name: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      libraryName,
      books,
      location,
    };

    // Use encodeURIComponent to safely pass the payload as a string in the URL
    router.push(
      `/pages/library_creation?data=${encodeURIComponent(
        JSON.stringify(payload)
      )}`
    );
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#D4E7C5" }} // Background with #D4E7C5
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "#2C3E50" }} // Title with a darker color for contrast
      >
        Create a Library
      </motion.h1>

      <motion.form
        className="p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ backgroundColor: "#BFD8AF" }} // Form background with #BFD8AF
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Library Name:
          </label>
          <input
            type="text"
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderColor: "#99BC85", // Input border color
              backgroundColor: "#FFFFFF", // Input background
              focusRingColor: "#99BC85", // Input focus color
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Books:
          </label>
          {books.map((book, index) => (
            <motion.input
              key={index}
              type="text"
              value={book.name}
              placeholder={`Book ${index + 1}`}
              onChange={(e) => handleBookChange(index, e.target.value)}
              required
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderColor: "#99BC85",
                backgroundColor: "#FFFFFF",
              }}
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            />
          ))}
          <motion.button
            type="button"
            onClick={addBookField}
            className="w-full py-2 rounded-lg text-white font-bold shadow-md focus:outline-none"
            style={{
              backgroundColor: "#99BC85", // Button background color
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Another Book
          </motion.button>
        </div>

        <motion.button
          type="submit"
          className="w-full py-2 rounded-lg text-white font-bold shadow-md focus:outline-none"
          style={{
            backgroundColor: "#99BC85", // Submit button background color
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Library
        </motion.button>
      </motion.form>

      {location.latitude && (
        <motion.div
          className="mt-6 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Location: {location.latitude}, {location.longitude}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
