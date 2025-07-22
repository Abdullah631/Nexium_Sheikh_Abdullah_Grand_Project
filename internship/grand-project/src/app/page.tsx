"use client";
import FloatingEmojis from "@/components/floatingEmojis";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-50 overflow-hidden flex items-center justify-center px-6 py-12">
      <FloatingEmojis />

      <div className="max-w-5xl w-full z-10">
        {/* Welcome Card */}
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transition-all">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-700 mb-4">
            🍽️ Welcome to Recipe AI!
          </h1>
          <p className="text-orange-800 text-lg">
            Your smart kitchen companion – powered by AI. Generate delicious,
            personalized recipes with just a few words. Discover new flavors,
            save your favorites, and cook with confidence.
          </p>
          <br />
          <Link href="/recipe-generator">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold animate-pulse-glow cursor-pointer">
              📚 Lets Go
            </Button>
          </Link>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all border border-orange-200">
            <h2 className="text-2xl font-semibold text-orange-600">
              🌍 10,000+ Users
            </h2>
            <p className="mt-2 text-orange-800">
              Food lovers across the globe use Recipe AI to explore smart,
              healthy meals.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all border border-orange-200">
            <h2 className="text-2xl font-semibold text-orange-600">
              🎯 Our Vision
            </h2>
            <p className="mt-2 text-orange-800">
              Empowering every home cook with instant, accessible, and enjoyable
              recipe creation.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-all border border-orange-200">
            <h2 className="text-2xl font-semibold text-orange-600">
              💡 AI-Powered Recipes
            </h2>
            <p className="mt-2 text-orange-800">
              Just describe your cravings – our AI chef does the rest, complete
              with images and instructions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
