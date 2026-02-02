/*
In this file we can trying to structure a LLM output and parse the information to an object (a.k.a dictionary).
*/

import { ChatOpenAI } from "@langchain/openai";
import { AI_API_KEY, DEFAULT_AI_MODEL } from "../constants.ts";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  apiKey: AI_API_KEY,
  modelName: DEFAULT_AI_MODEL,
  temperature: 0.7,
});

async function structuredOutputParser() {
  const templatePrompt = PromptTemplate.fromTemplate(
    `
    Extract information from the following phrase.
    Formatting instructions: {format_instructions}
    Phrase: {phrase}
    `
  );

  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "name of the person",
    likes: "what the person likes",
  });

  const chain = templatePrompt.pipe(model).pipe(outputParser);

  const response = await chain.invoke({
    phrase:
      "Rumi like to play games in playstation. His favorite game is God of war",
    format_instructions: outputParser.getFormatInstructions(),
  });

  console.log(response);
}

export default function main() {
  structuredOutputParser();
}
