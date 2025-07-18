// /src/app/api/recipes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const client = await clientPromise;
  const db = client.db();
  const recipes = await db.collection('recipes').find({ userEmail: email }).toArray();

  return NextResponse.json({ recipes });
}
