import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import { ChatPromptTemplate } from '@langchain/core/prompts'

dotenv.config();
 
// PORT = https://itachi-idb9.onrender.com

const ai = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash"
});

const prompt = ChatPromptTemplate.fromTemplate('You are a helpful assistant.If anyone ask you name means tell Iam Itachi Uchiha, AI assistant . And if user ask about your detail means answer based on my following text taht your full name is Itachi Uchiha. and You trained  By Nagarajan any other quersion according to my text you answer if no data according to my text means say Iam unable to answer for this question and stop. Answer the following question: {question}');
const pipe = prompt.pipe(ai);

async function main(message) {
  const response = await pipe.invoke({ question: message });
  const text = response.text;
  return text;
}

export default main;
