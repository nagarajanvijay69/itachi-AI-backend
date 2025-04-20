import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config(); 

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: message,
  });

  const text = response.text; 
  return text;
}

export default main;