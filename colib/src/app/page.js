"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supaBaseclient";
import { useRouter } from "next/navigation";
export default function SupabaseGreenLogin({ onLoginSuccess = () => {} }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log("User logged in:", data.user);
      // Call the onLoginSuccess callback
      onLoginSuccess(data.user);
      router.push("/pages/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#D4E7C5" }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        style={{ backgroundColor: "#BFD8AF" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#2C3E50" }}
        >
          Welcome Back
        </h2>
        <p className="text-center mb-6" style={{ color: "#34495E" }}>
          Please sign in to your account
        </p>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#2C3E50" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#99BC85",
                focusRingColor: "#99BC85",
              }}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#2C3E50" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#99BC85",
                focusRingColor: "#99BC85",
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style={{
              backgroundColor: "#99BC85",
              borderColor: "#99BC85",
              focusRingColor: "#99BC85",
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 flex justify-between">
          <a href="#" className="text-sm" style={{ color: "#2C3E50" }}>
            Forgot password?
          </a>
          <a href="#" className="text-sm" style={{ color: "#2C3E50" }}>
            Create account
          </a>
        </div>
      </div>
    </div>
  );
}
