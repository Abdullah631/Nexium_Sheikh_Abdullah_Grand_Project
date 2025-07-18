/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { generateRecipe } from "../../utils/generateRecipe";
import { getRecipeImage } from "@/utils/generateImage";
import { supabase } from "@/lib/supabseClient";
import clientPromise from "@/lib/mongodb";

export default function RecipeGenerator() {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState<any>(null);

  const handleGenerate = async () => {
    const recipeText = await generateRecipe(input);
    const imageUrl = await getRecipeImage(input);
    setRecipe({ text: recipeText, imageUrl });
  };

  const handleSave = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return alert("Login required to save recipes.");

    const response = await fetch("/api/save-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        title: input,
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
    <div className="p-6">
      <textarea
        className="border w-full p-2"
        placeholder="Describe your recipe preferences..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-orange-500 text-white px-4 py-2 my-2"
      >
        Generate Recipe
      </button>
      {recipe && (
        <div>
          <h2 className="font-bold">Generated Recipe</h2>
          <img
            src={recipe.imageUrl}
            alt="Generated recipe"
            className="w-full max-w-sm"
          />
          <pre className="whitespace-pre-wrap">{recipe.text}</pre>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 my-2"
          >
            Save Recipe
          </button>
        </div>
      )}
    </div>
  );
}
