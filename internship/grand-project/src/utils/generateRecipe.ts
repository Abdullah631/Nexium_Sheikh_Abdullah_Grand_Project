/* eslint-disable @typescript-eslint/no-explicit-any */
if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK) {
  throw new Error("N8N WEBHOOK is not defined in environment variables.");
}

// Remove introductory sentence if it starts with known filler phrases
function removeIntroSentence(text: string): string {
  const introRegex = /^(Of course|Sure|Certainly|Here(?: is| are)?|Here's|Below is)[^.:]*[.:]\s*/i;
  return text.replace(introRegex, '');
}

export async function generateRecipe(recipeText: string): Promise<string> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK;
  try {
    const response = await fetch(`${webhookUrl}?query=${encodeURIComponent(recipeText)}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText+"n8n error");
      throw new Error(`n8n error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.output) {
      console.log("invalid Response")
      throw new Error("Invalid response from n8n: 'output' field missing.");
    }

    const cleanedOutput = removeIntroSentence(data.output.trim());
    return cleanedOutput;

  } catch (err: any) {
    console.error("Error contacting n8n webhook:", err.message);
    throw err;
  }
}
