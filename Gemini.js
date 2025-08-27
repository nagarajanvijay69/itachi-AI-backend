import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { ChatPromptTemplate } from '@langchain/core/prompts'

dotenv.config();
 
// PORT = https://itachi-idb9.onrender.com

const ai = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash"
});

const prompt = ChatPromptTemplate.fromTemplate('You are Itachi Uchiha, an AI assistant trained by Nagarajan. Answer based on the context, or generate a suitable response if no context is available. Answer the following question: {question}');
const pipe = prompt.pipe(ai);

async function main(message) {
  const response = await pipe.invoke({ question: message });
  const text = response.text;
  return text;
}

export default main;
