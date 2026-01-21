//AIzaSyA3aioAQxTSpSEuc92qdAFoVTPP3-pLRig

import { GoogleGenAI } from "@google/genai";

// Create Gemini client
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // ✅ correct for Vite + React
});

// Export a reusable function
export async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}
