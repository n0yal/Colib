"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Book, User, Calendar, UserPlus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const redirecttoHost = () => {
    // Redirect to the desired page
    router.push("/pages/create-table");
  };

  const redirecttoBrowse = () => {
    // Redirect to the desired page
    router.push("/pages/browse");
  };
  const redirecttoAbout = () => {
    router.push("/pages/about");
  };
  return (
    <div className="min-h-screen bg-[#D4E7C5] font-poppins">
      {/* Navbar */}
      <nav className="bg-[#99BC85] p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold text-white font-seasons"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Colib
          </motion.h1>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="/" className="text-white hover:text-[#BFD8AF]">
              Home
            </a>
            <a href="/books" className="text-white hover:text-[#BFD8AF]">
              Profile
            </a>
            <a href="/pages/about" className="text-white hover:text-[#BFD8AF]">
              About
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-[#99BC85] font-seasons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          A Readers Paradise.
        </motion.h2>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full p-4 pr-12 rounded-full border-2 border-[#99BC85] focus:outline-none focus:border-[#BFD8AF]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-[#99BC85]" />
            </button>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-center space-x-8 mt-12">
          <motion.button
            className="bg-[#99BC85] text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-[#BFD8AF] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={redirecttoBrowse}
          >
            <Book />
            <span>Browse CoLib's</span>
          </motion.button>
          <motion.button
            className="bg-[#BFD8AF] text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-[#99BC85] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={redirecttoHost}
          >
            <User />
            <span>Host CoLib.</span>
          </motion.button>
        </div>

        {/* Featured Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FeaturedBox
            title="Events"
            icon={<Calendar className="w-8 h-8 text-[#99BC85]" />}
            description="Join our upcoming book launches, author meet-and-greets, and literary discussions."
          />
          <FeaturedBox
            title="New Author of the Week"
            icon={<UserPlus className="w-8 h-8 text-[#99BC85]" />}
            description="Discover fresh voices in literature. This week's featured author: Jane Doe."
          />
          <FeaturedBox
            title="Reading Groups"
            icon={<Users className="w-8 h-8 text-[#99BC85]" />}
            description="Connect with fellow book lovers in our themed reading groups and book clubs."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeaturedBox({ title, icon, description }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-2 text-[#99BC85] font-seasons">
          {title}
        </h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
