"use client";
import Head from "next/head";

import { supabase } from "../../../lib/supaBaseclient";
// Initialize the Supabase client
import { useState, useEffect } from "react";

// Initialize the Supabase client

export default function BrowsePage() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTables() {
      try {
        const { data, error } = await supabase.rpc("list_tables");

        if (error) throw error;
        setTables(data);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setError("Failed to fetch tables. Please try again later.");
      }
    }

    fetchTables();
  }, []);

  return (
    <div className="min-h-screen bg-[#D4E7C5] p-8">
      <Head>
        <title>Colib Points</title>
        <meta
          name="description"
          content="Browse all tables in the Supabase database"
        />
      </Head>

      <h1 className="text-3xl font-bold mb-8 text-[#99BC85]">
        ALL COLIB POINTS
      </h1>

      {error ? (
        <div className="text-red-600 text-xl text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.table_name}
              className="bg-[#BFD8AF] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#99BC85]">
                {table.table_name}
              </h2>
            </div>
          ))}
        </div>
      )}

      {tables.length === 0 && !error && (
        <div className="text-center text-[#99BC85] text-xl mt-8">
          No colib points found in the database.
        </div>
      )}
    </div>
  );
}
