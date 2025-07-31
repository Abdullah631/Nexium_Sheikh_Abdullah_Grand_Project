/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null); // Set user to null if session is gone
      }
    );

    // Cleanup listener
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-amber-50 via-orange-100 to-red-50 shadow-lg border-b-4 border-amber-200 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex flex-wrap justify-between items-center min-h-16 py-2">
        <div className="text-2xl sm:text-3xl animate-float">
          <Link
            href="/"
            className="text-amber-800 font-bold text-xl sm:text-2xl"
          >
            <span className="text-2xl sm:text-3xl animate-float">
              🍽️ Recipe AI
            </span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 mt-2 sm:mt-0">
          <Link href="/">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold animate-pulse-glow cursor-pointer">
              🏠 Home
            </Button>
          </Link>
          <Link href="/about">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold animate-pulse-glow cursor-pointer">
              🧑‍🍳 About
            </Button>
          </Link>

          <Link href="/recipe-generator">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold animate-pulse-glow cursor-pointer">
              📚 Recipe Generator
            </Button>
          </Link>

          {user ? (
            <Link href="/dashboard">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold cursor-pointer">
                👤 Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-amber-400 hover:bg-amber-500 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold cursor-pointer">
                🔐 Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}
