"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FloatingEmojis from "@/components/floatingEmojis";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("✨ Magic link sent! Check your inbox.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-red-50 overflow-hidden flex items-center justify-center">
      {/* Floating icons background */}
      <FloatingEmojis />

      {/* Login Card */}
      <div className="z-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-md border border-orange-200">
        <h1 className="text-2xl font-bold text-orange-700 mb-4 text-center">
          Login with Magic Link
        </h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-orange-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white w-full mt-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition transform cursor-pointer"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        {/* Spinner */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-orange-500 h-6 w-6 animate-spin"></div>
          </div>
        )}

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-orange-600 font-medium">
            {message}
          </p>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .loader {
          border-color: #facc15; /* amber-400 fallback */
          border-top-color: #ea580c; /* orange-600 */
        }
      `}</style>
    </div>
  );
}
