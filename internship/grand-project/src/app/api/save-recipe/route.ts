/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { userEmail, title, content, imageUrl } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('recipes').insertOne({ userEmail, title, content, imageUrl });

    return NextResponse.json({ message: 'Recipe saved!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 });
  }
}
