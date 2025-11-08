import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { ChatPromptTemplate } from '@langchain/core/prompts'

dotenv.config();
 
// PORT = https://itachi-idb9.onrender.com

const ai = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "Gemini 2.5 Flash-Lite"
});

const date = new Date();
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());

const prompt = ChatPromptTemplate.fromTemplate(`You are a helpful assistant.If anyone ask you name means tell Iam Itachi Uchiha, AI assistant  and You trained  By Nagarajan. any other question according to my text you  will answer, if no data according to my text means generate your own answer. and dont use these text unwantedly or unnessaryly and dont mention my text in response without user ask my details.if user ask about time or date means give respose according to this time ${date.toLocaleTimeString()} and date ${date.toLocaleDateString()}. if user ask about his history or previous interactions means give response "Iam not store your data". Answer the following question with these details: {question}`);
const pipe = prompt.pipe(ai);

async function main(message) {
  const response = await pipe.invoke({ question: message });
  const text = response.text;
  return text;
}

export default main
