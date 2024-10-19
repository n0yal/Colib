"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Library() {
  const [tableName, setTableName] = useState("");
  const [address, setAddress] = useState("");
  const [books, setBooks] = useState([{ name: "" }]);
  const router = useRouter();

  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          // Fetch address using a reverse geocoding API
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => setAddress(data.locality || "Unknown Location"))
            .catch((error) => console.error("Error fetching address:", error));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setAddress("Unknown Location");
        }
      );
    } else {
      setAddress("Geolocation not supported");
    }
  }, []);

  const handleAddBook = () => {
    setBooks([...books, { name: "" }]);
  };

  const handleBookChange = (index, value) => {
    const updatedBooks = books.map((book, i) =>
      i === index ? { name: value } : book
    );
    setBooks(updatedBooks);
  };

  const handleCreateLibrary = async () => {
    const params = {
      tableName,
      address,
      books: JSON.stringify(books),
    };
    const query = new URLSearchParams(params).toString();

    router.push(`/pages/create-table?${query}`);
  };

  return (
    <div>
      <h1>Create a Library</h1>
      <div>
        <label>Library Name:</label>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter library name"
        />
      </div>

      <div>
        <h2>Books</h2>
        {books.map((book, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Book Name"
              value={book.name}
              onChange={(e) => handleBookChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddBook}>Add Another Book</button>
      </div>

      <div>
        <label>Location (Address):</label>
        <input type="text" value={address} readOnly />
      </div>

      <button
        onClick={handleCreateLibrary}
        disabled={!tableName || books.some((book) => !book.name)}
      >
        Create Library
      </button>
    </div>
  );
}
