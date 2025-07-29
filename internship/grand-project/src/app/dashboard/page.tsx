"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import FloatingEmojis from "@/components/floatingEmojis";

export default function Dashboard() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const { recipes } = await res.json();
        setRecipes(recipes);
        setIsLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await fetch("/api/delete-recipe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    });

    if (res.ok) {
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
    } else {
      alert("Failed to delete recipe.");
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-amber-50 via-orange-100 to-red-50 overflow-hidden p-6">
      {/* Floating Emojis Background */}
      <FloatingEmojis />

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-lg font-bold text-amber-800 mb-4">Delete Recipe</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this recipe?</p>
            <div className="flex justify-end gap-4">
              <Button onClick={() => setShowModal(false)} className="bg-gray-300 text-black hover:bg-gray-400">
                No
              </Button>
              <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h1 className="text-3xl font-bold text-amber-800">Your Saved Recipes</h1>
        <Button
          onClick={handleLogout}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          🔓 Logout
        </Button>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-600"></div>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative hover:scale-105 transition-transform duration-300 shadow-lg rounded-2xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-amber-700">{recipe.title}</CardTitle>
                    <button
                      onClick={() => confirmDelete(recipe._id)}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                      title="Delete Recipe"
                    >
                      <Trash2 size={25} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-3">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="rounded-xl w-full h-60 object-cover"
                  />
                  <Button
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300 font-semibold animate-pulse-glow cursor-pointer"
                    onClick={() => router.push(`/recipe/${recipe._id}`)}
                  >
                    🍽️ View Recipe
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-amber-700 text-lg mt-8 text-center relative z-10">
          No recipes saved yet. Generate some delicious ideas!
        </p>
      )}
    </div>
  );
}
