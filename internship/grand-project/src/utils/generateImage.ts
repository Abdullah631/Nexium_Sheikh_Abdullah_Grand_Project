export async function getRecipeImage(recipeTitle: string) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(recipeTitle)}&per_page=1`, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
    },
  });
  const data = await res.json();
  return data.photos?.[0]?.src?.medium || '';
}