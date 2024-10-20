"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supaBaseclient";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function CreateTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    const createLibraryTable = async () => {
      <Suspense>const dataParam = searchParams.get("data");</Suspense>;
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

      // Log latitude and longitude for debugging
      console.log("Latitude:", location.latitude);
      console.log("Longitude:", location.longitude);

      if (tableError) {
        console.error("Error creating table:", tableError.message);
        setMessage("Error creating table.");
        return;
      }
      // Insert books into the new table
      for (const book of books) {
        console.log("Inserting book data:", {
          book_name: book.name,
          location_latitude: location.latitude,
          location_longitude: location.longitude,
        });

        const { data, error: insertError } = await supabase
          .from(libraryName)
          .insert([
            {
              book_name: book.name,
              location_latitude: location.latitude,
              location_longitude: location.longitude,
            },
          ]);

        if (insertError) {
          console.error("Error inserting book:", insertError); // Log the entire error object
          setMessage(`Error inserting books: ${insertError.message}`); // Provide specific error message
          return;
        }
      }

      // Insert books into the new table
      for (const book of books) {
        console.log("Inserting book data:", {
          book_name: book.name,
          location_latitude: location.latitude,
          location_longitude: location.longitude,
        });
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

    if (user) {
      createLibraryTable();
    }
  }, [user, searchParams]);

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
