/* eslint-disable @typescript-eslint/no-explicit-any */
if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK) {
  throw new Error("N8N WEBHOOK is not defined in environment variables.");
}

export async function generateRecipe(recipeText: string): Promise<string> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK;
  console.log(webhookUrl);

  try {
    const response = await fetch(`${webhookUrl}?query=${encodeURIComponent(recipeText)}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`n8n error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.output) {
      throw new Error("Invalid response from n8n: 'recipe' field missing.");
    }

    return data.output.trim();
  } catch (err: any) {
    console.error("Error contacting n8n webhook:", err.message);
    throw err;
  }
}
