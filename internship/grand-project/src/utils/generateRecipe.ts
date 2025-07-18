/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not defined in environment variables.");
}
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
  systemInstruction: `You are An expert in generating relevant recipes according to ingredients or the recipe title that user provides.`,
});
export async function generateRecipe(recipeText: string): Promise<string> {
  const prompt = `Give me a recipe in the format that I am giving you as follows 1.title of recipe, 2.ingredients, 3.cooking time, 4.difficulty level, 5.step by step recipe that can be made from :\n\n${recipeText}`;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (err: any) {
      if (err.status === 503) {
        console.warn(
          `Gemini model overloaded, retrying... attempt ${attempt + 1}`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1))
        );
        attempt++;
      } else {
        throw err;
      }
    }
  }

  throw new Error("Gemini model unavailable after multiple retries.");
}
