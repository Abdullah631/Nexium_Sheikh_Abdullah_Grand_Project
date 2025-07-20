/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FloatingEmojis from "@/components/floatingEmojis";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

export default function RecipePage() {
  const params = useParams() as { id: string };
  const id = params.id;

  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipe?id=${id}`);
      const data = await res.json();
      setRecipe(data.recipe);
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 via-orange-100 to-red-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center text-red-600 mt-10">Recipe not found.</div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-amber-50 via-orange-100 to-red-50 p-6 overflow-hidden">
      <FloatingEmojis />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-800 text-center mb-6">
          {recipe.title}
        </h1>

        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="rounded-2xl w-full h-auto mb-6 shadow-lg"
        />

        <div className="prose prose-lg text-amber-800 bg-white bg-opacity-80 p-6 rounded-xl shadow-md">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {recipe.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
