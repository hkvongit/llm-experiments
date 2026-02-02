import { ChatOpenAI } from "@langchain/openai";
import { AI_API_KEY, DEFAULT_AI_MODEL } from "../constants.ts";

export const model = new ChatOpenAI({
  apiKey: AI_API_KEY,
  modelName: DEFAULT_AI_MODEL,
  maxTokens: 700,
  // verbose: true,
});

const input = `What is the biggest building in the world`;

async function simpleInvocation() {
  const response1 = await model.invoke(input);
  console.log(response1.content);
}

async function streamedInvocation() {
  const response = await model.stream(input);
  for await (const chunk of response) {
    // console.log(chunk.content);

    if (typeof chunk.content == "string") process.stdout.write(chunk.content);
  }
}

export default async function main() {
  console.log("\n");
  // await simpleInvocation();
  await streamedInvocation();
}
