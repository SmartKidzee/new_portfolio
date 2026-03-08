// Get API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Models to try in order — if one hits quota, try the next
const MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-pro",
];

/**
 * Fetches an AI-generated summary using Google's Gemini API.
 * Automatically falls back through multiple models if one hits quota limits.
 */
export const fetchGeminiSummary = async (text: string, title?: string) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const promptText = `Please provide a concise summary of the following ${title ? `blog post titled "${title}"` : "text"}. Keep it under 150 words, highlighting the most important points. Use a conversational tone.\n\nContent:\n${text.substring(0, 15000)}`;

  let lastError = "";

  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 250 },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `HTTP ${response.status}`;
      console.warn(`[Gemini] Model "${model}" failed: ${errorMsg}`);
      lastError = errorMsg;

      // If it's a quota error (429), try the next model
      if (response.status === 429) continue;

      // For other errors (401, 403, etc.), no point trying other models
      throw new Error(errorMsg);
    } catch (err: any) {
      if (err.message === lastError) throw err; // already a formatted error
      lastError = err.message || "Unknown error";
      console.warn(`[Gemini] Model "${model}" threw: ${lastError}`);
    }
  }

  // All models exhausted
  throw new Error(
    `All Gemini models hit quota limits. Your free API usage has been exceeded. Please wait a minute and try again, or check your billing at https://ai.google.dev/gemini-api/docs/rate-limits`
  );
}; 