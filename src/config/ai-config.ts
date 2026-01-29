import OpenAI from "openai";
import { AI_API_KEY, DEFAULT_AI_MODEL } from "../constants.ts";

export const aiClient = new OpenAI({
  apiKey: AI_API_KEY, // This is the default and can be omitted
});

export const defaultAiConfig = {
  model: DEFAULT_AI_MODEL,
};
