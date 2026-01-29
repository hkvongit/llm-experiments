import OpenAI from "openai";
import { AI_API_KEY, DEFAULT_AI_MODEL } from "./constants.ts";

export default async function main() {
  const client = new OpenAI({ apiKey: AI_API_KEY });

  const stream = await client.responses.create({
    model: DEFAULT_AI_MODEL,
    input: "Give a short history of Manchester United",
    stream: true,
  });
  for await (const event of stream) {
    try {
      const response = event?.delta || "";
      process.stdout.write(response);
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
