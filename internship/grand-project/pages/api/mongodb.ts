import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db('recipeGenerator');

export async function saveFullText(url: string, fullText: string) {
  await client.connect();
  const collection = db.collection('savedRecipes');
  await collection.insertOne({ url, fullText });
}
