// /src/app/create-table/page.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supaBaseclient";
import { useRouter } from "next/navigation";

export default function CreateTable() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Holds the logged-in user
  const [isLoading, setIsLoading] = useState(true); // Manage loading state
  const [message, setMessage] = useState(""); // Manage messages

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
        setUser(data.session.user); // Set the user state if the session exists
      } else {
        setMessage("You need to be logged in to create a library.");
        router.push("/login"); // Redirect to login if not authenticated
      }

      setIsLoading(false); // Stop loading once session check is done
    };

    checkSession();
  }, [router]);

  // Function to keep session alive or handle token expiration
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/login"); // Redirect if user signs out
        } else if (event === "SIGNED_IN") {
          setUser(session.user); // Update user when signed in
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe(); // Clean up the listener on unmount
    };
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div>
      <h1>Create Library</h1>
      {message && <p>{message}</p>}
      {user && (
        <div>
          {/* Add your form or logic to create the table */}
          <p>Welcome, {user.email}! You are logged in.</p>
          {/* UI to create the library/table goes here */}
        </div>
      )}
    </div>
  );
}
