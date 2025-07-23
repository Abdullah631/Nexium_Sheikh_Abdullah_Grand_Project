/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { generateRecipe } from "../../utils/generateRecipe";
import { getRecipeImage } from "@/utils/generateImage";
import { supabase } from "@/lib/supabaseClient";
import FloatingEmojis from "@/components/floatingEmojis";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

export default function RecipeGenerator() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return alert("Please describe your preferences first!");
    setLoading(true);
    try {
      const recipeText = await generateRecipe(input);
      console.log("Generated recipe text:", recipeText);

      const titleSection = recipeText.split(
        /\*\*1\. Title of Recipe:?\*\*/i
      )[1];
      const title = titleSection
        ? titleSection.split("\n")[1].trim()
        : "Cooked " + input;
      console.log("Extracted title:", title);

      const imageUrl = await getRecipeImage(title);

      setRecipe({ text: recipeText, imageUrl, title });
    } catch (err) {
      alert("Failed to generate recipe. Please try again.");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const response = await fetch("/api/save-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        title: recipe.title,
        content: recipe.text,
        imageUrl: recipe.imageUrl,
      }),
    });

    const result = await response.json();
    if (result.message) {
      alert(result.message);
    } else {
      alert(result.error || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-yellow-50 flex items-center justify-center overflow-hidden px-4">
      <FloatingEmojis />

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl max-w-2xl w-full z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">
          🍲 Recipe Generator
        </h1>

        <textarea
          className="w-full border border-orange-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows={4}
          placeholder="Tell us your favorite ingredients or cravings..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white w-full mt-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition transform cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </button>

        {/* Spinner */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-orange-500 h-6 w-6 animate-spin"></div>
          </div>
        )}

        {recipe && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              🍽️ Your Recipe
            </h2>

            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt="Generated dish"
                className="rounded-lg w-full max-w-sm mx-auto mb-4 shadow-md"
              />
            )}
            {showLoginModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-lg font-semibold mb-4 text-red-600">
                    Login Required
                  </h2>
                  <p className="mb-4 text-gray-700">
                    Please log in to save your recipe.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-lg text-amber-800 bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {recipe.text}
              </ReactMarkdown>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 w-full bg-green-500 text-white py-2 hover:bg-green-600 rounded-full font-semibold shadow-md hover:scale-105 transition transform cursor-pointer"
            >
              Save to My Recipes
            </button>
          </div>
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
