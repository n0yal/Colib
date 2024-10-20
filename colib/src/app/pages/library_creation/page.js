"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supaBaseclient";
import { useRouter } from "next/navigation";

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
      const dataParam = searchParams.get("data");
      if (!dataParam) {
        setMessage("No data received.");
        return;
      }

      // Parse the stringified JSON data back to an object
      const { libraryName, books, location } = JSON.parse(
        decodeURIComponent(dataParam)
      );

      // Create the table dynamically using Supabase SQL or the appropriate function
      const { error: tableError } = await supabase.rpc("create_library", {
        library_name: libraryName,
        latitude: location.latitude,
        longitude: location.longitude,
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
        const { error: insertError } = await supabase.from(libraryName).insert([
          {
            book_name: book.name,
            location_latitude: location.latitude, // Use the correct variable
            location_longitude: location.longitude, // Use the correct variable
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Create Library</h1>
      {message && <p>{message}</p>}
    </div>
  );
}
