"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supaBaseclient";
import { useRouter } from "next/navigation";

export default function CreateTable() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataParam, setDataParam] = useState(null);

  // Function to fetch search params from URL
  const getSearchParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("data");
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error.message);
        setMessage("Error fetching user session.");
        setIsLoading(false);
        return;
      }

      if (data.session) {
        setUser(data.session.user);
      } else {
        setMessage("You need to be logged in to create a library.");
        router.push("/login");
      }

      setIsLoading(false);
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    // Get the 'data' parameter from the URL and set it in state
    setDataParam(getSearchParams());
  }, []);

  const createLibraryTable = async () => {
    if (!dataParam) {
      setMessage("No data received.");
      return;
    }

    const { libraryName, books, location } = JSON.parse(
      decodeURIComponent(dataParam)
    );

    // Create the table dynamically using Supabase SQL or the appropriate function
    const { error: tableError } = await supabase.rpc("create_library", {
      library_name: libraryName,
      location_latitude: location.latitude,
      location_longitude: location.longitude,
    });

    if (tableError) {
      console.error("Error creating table:", tableError.message);
      setMessage("Error creating table.");
      return;
    }

    // Insert books into the new table
    for (const book of books) {
      const { error: insertError } = await supabase.from(libraryName).insert([
        {
          book_name: book.name,
          location_latitude: location.latitude,
          location_longitude: location.longitude,
        },
      ]);

      if (insertError) {
        console.error("Error inserting book:", insertError.message);
        setMessage("Error inserting books.");
        return;
      }
    }

    setMessage("Library and books created successfully!");
  };

  useEffect(() => {
    if (user && dataParam) {
      createLibraryTable();
    }
  }, [user, dataParam]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#D4E7C5" }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        style={{ backgroundColor: "#BFD8AF" }}
      >
        <h1
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "#2C3E50" }}
        >
          Create Library
        </h1>
        {message && <p className="text-center text-red-600">{message}</p>}
        <div className="mt-4">
          <p className="text-center" style={{ color: "#34495E" }}>
            This section allows you to create a new library and add books to it.
          </p>
        </div>
      </div>
    </div>
  );
}
