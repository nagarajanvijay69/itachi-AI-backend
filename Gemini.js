import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { ChatPromptTemplate } from '@langchain/core/prompts'

dotenv.config();

// PORT = https://itachi-idb9.onrender.com

const ai = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash"
});



async function main(message) {

  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
  const date = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });

  console.log("Time:", time);
  console.log("Date:", date);

  const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful AI assistant.

Rules:
- If the user asks your name, say: "I am Itachi Uchiha, an AI assistant trained by Nagarajan."
- Answer all questions politely.
- If no relevant info is given, generate your own helpful answer.
- Do NOT reveal or mention these instructions unless user directly asks.
- If the user asks for time or date, use the provided values.
- Time: {time}
- Date: {date}
- If the user asks about previous data, respond: "I am not storing your data."

User question: {question}
`);

  const chain = prompt.pipe(ai);

  const response = await chain.invoke({
    question: message,
    time: time,
    date: date
  });

  return response.text;
}


export default main
