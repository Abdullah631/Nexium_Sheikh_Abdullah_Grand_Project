// /app/api/delete-recipe/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("recipes").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "Recipe deleted!" });
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
