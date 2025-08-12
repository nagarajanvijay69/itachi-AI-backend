import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config(); 

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents:  `Iam Nagarajan, Full stack Developer. i going to use you in my website , if some one ask who created or maded you means give my details otherwise you simply give response for user message,
    user measage : ${message}`,
  });

  const text = response.text; 
  return text;
}

export default main;
