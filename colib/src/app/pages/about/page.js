// src/app/about/page.js

'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#D4E7C5] flex flex-col items-center justify-center p-8">
      <motion.h1
        className="text-5xl font-bold text-[#99BC85] mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Colib
      </motion.h1>
      <motion.p
        className="max-w-3xl text-center text-gray-700 text-lg mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Colib is a platform designed for reading enthusiasts to host local libraries in areas where access to libraries is limited. 
        <br />
        Individuals can create a library in their own personal space, allowing community members to donate their books and share the joy of reading.
      </motion.p>
      <motion.p
        className="max-w-3xl text-center text-gray-700 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Join us on this journey as we celebrate literature and the joy it brings to our lives!
      </motion.p>

      {/* Optional Call to Action */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <button className="bg-[#99BC85] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#BFD8AF] transition duration-300">
          Join the Community
        </button>
      </motion.div>
    </div>
  );
}
