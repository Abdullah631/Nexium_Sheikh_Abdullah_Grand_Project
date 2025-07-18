/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabseClient";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [recipes, setRecipes] = useState<any[]>([]);
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
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-amber-50 via-orange-100 to-red-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-800">Your Saved Recipes</h1>

        <Button
          onClick={handleLogout}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-300"
        >
          🔓 Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:scale-105 transition-transform duration-300 shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-amber-700">{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="rounded-xl w-full h-60 object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {recipes.length === 0 && (
        <p className="text-amber-700 text-lg mt-8 text-center">
          No recipes saved yet. Generate some delicious ideas!
        </p>
      )}
    </div>
  );
}
