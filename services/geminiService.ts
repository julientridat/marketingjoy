import { GoogleGenAI } from "@google/genai";
import { WatchConfig, GENERATION_MODEL } from "../types";

// Initialize the client
// CRITICAL: Using standard env var process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates the initial watch image based on the quiz configuration.
 */
export const generateWatchImage = async (config: WatchConfig): Promise<string> => {
  const prompt = buildPromptFromConfig(config);
  
  try {
    const response = await ai.models.generateContent({
      model: GENERATION_MODEL,
      contents: [
        {
          text: prompt
        }
      ]
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Error generating watch image:", error);
    throw error;
  }
};

/**
 * Edits an existing watch image based on a user text prompt.
 * Uses the image-to-image capabilities of gemini-2.5-flash-image ("Nano banana").
 */
export const editWatchImage = async (
  currentImageBase64: string, 
  userPrompt: string
): Promise<string> => {
  // Clean the base64 string if it contains the data URL prefix
  const cleanBase64 = currentImageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  try {
    const response = await ai.models.generateContent({
      model: GENERATION_MODEL,
      contents: {
        parts: [
          {
            text: `Edit this watch image based on the following instruction. Maintain the photorealistic luxury style. Instruction: ${userPrompt}`
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          }
        ]
      }
    });

    return extractImageFromResponse(response);
  } catch (error) {
    console.error("Error editing watch image:", error);
    throw error;
  }
};

// Helper to construct a detailed prompt from the wizard answers
const buildPromptFromConfig = (config: WatchConfig): string => {
  const { style, material, strap, dialColor, complications } = config;
  
  return `
    Professional product photography of a luxury wristwatch. 
    Front-facing view, studio lighting, 8k resolution, highly detailed, photorealistic.
    
    Specifications:
    - Style: ${style || 'Classic'}
    - Case Material: ${material || 'Stainless Steel'}
    - Strap: ${strap || 'Leather'}
    - Dial Color: ${dialColor || 'Black'}
    - Complications: ${complications || 'Date window'}
    
    The watch should look expensive, elegant, and perfectly lit on a dark background.
  `.trim();
};

// Helper to extract the image from the complex response structure
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractImageFromResponse = (response: any): string => {
  const parts = response.candidates?.[0]?.content?.parts;
  
  if (!parts) {
    throw new Error("No content generated");
  }

  // Iterate through parts to find the image
  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
};
