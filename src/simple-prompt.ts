import OpenAI from "openai";
import { AI_API_KEY, DEFAULT_AI_MODEL } from "./constants.ts";

export default async function main() {
  const client = new OpenAI({
    apiKey: AI_API_KEY, // This is the default and can be omitted
  });

  const response = await client.responses.create({
    model: DEFAULT_AI_MODEL,
    instructions: "You are a coding assistant that talks like a pirate",
    input: "Are semicolons optional in JavaScript?",
  });

  console.log(response.output_text);
}
