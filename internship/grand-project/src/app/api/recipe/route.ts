import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Recipe ID is required." }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
    }

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch recipe." }, { status: 500 });
  }
}
