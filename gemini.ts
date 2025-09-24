import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getGratitudeSuggestion = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Give me a short, heartfelt, anonymous gratitude message idea for a gratitude wall. Keep it under 250 characters and don\'t use quotes.',
        config: {
            // Disable thinking for faster, more creative responses suitable for this use case.
            thinkingConfig: { thinkingBudget: 0 }
        }
    });

    const text = response.text.trim();
    if (!text) {
        throw new Error("Received an empty response from the AI.");
    }
    return text;
  } catch (error) {
    console.error("Error fetching gratitude suggestion:", error);
    throw new Error("Failed to get a suggestion from the AI.");
  }
};
