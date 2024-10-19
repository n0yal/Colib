// /src/app/library_creation/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Create a Library</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Library Name:</label>
          <input
            type="text"
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Books:</label>
          {books.map((book, index) => (
            <input
              key={index}
              type="text"
              value={book.name}
              placeholder={`Book ${index + 1}`}
              onChange={(e) => handleBookChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addBookField}>
            Add Another Book
          </button>
        </div>

        <button type="submit">Create Library</button>
      </form>

      {location.latitude && (
        <div>
          <p>
            Location: {location.latitude}, {location.longitude}
          </p>
        </div>
      )}
    </div>
  );
}
