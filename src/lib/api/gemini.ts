import axios from "axios";

// Get API key from environment variables or use the provided key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyANozo6PWtEhasYJ51kJ8574wFj0qAhqDw";

/**
 * Fetches an AI-generated summary of the given text using Google's Gemini API
 * @param text The text to summarize
 * @param title Optional title to provide context for summarization
 * @returns The API response data, or null if an error occurred
 */
export const fetchGeminiSummary = async (text: string, title?: string) => {
  try {
    // Create a prompt with instructions for better summaries
    const promptText = `
      Please provide a concise summary of the following ${title ? `blog post titled "${title}"` : 'text'}.
      Keep it under 150 words, highlighting the most important points.
      Use a conversational tone that matches the original content.
      
      Here's the content to summarize:
      ${text.substring(0, 15000)} // Limiting to prevent token overflow
    `;

    // Make the API request
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 250,
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000, // 15 seconds timeout
      }
    );

    // Return the entire response data
    return response.data;
  } catch (error: any) {
    // Log the error details
    console.error("Error fetching summary:", 
      error.response?.data || error.message || "Unknown error");
    
    // Return null to indicate an error occurred
    return null;
  }
}; 