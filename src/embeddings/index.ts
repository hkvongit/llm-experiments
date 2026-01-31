import { aiClient } from "../config/ai-config.ts";
import { DEFAULT_EMBEDDING_MODEL } from "../constants.ts";
import path from "node:path";
import { loadJSON, saveJSON } from "../helper/helper-for-node.ts";

// Simplified path resolution using import.meta.dirname (Node 20+)
const dataPath = path.join(import.meta.dirname, "data.json");
const outputPath = path.join(import.meta.dirname, "embedded-data.json");

/**
 * Generates embeddings for an array of strings and maps them back to the input text.
 * @param data Array of strings to embed.
 */
export async function generateEmbeddings(data: string[]) {
  const response = await aiClient.embeddings.create({
    model: DEFAULT_EMBEDDING_MODEL,
    input: data,
  });

  return data.map((input, i) => ({
    input,
    embedding: response?.data[i]?.embedding,
  }));
}

/**
 * Loads JSON data, generates embeddings, and saves the result.
 */
export default async function main() {
  try {
    // 1. Load and parse the data file
    const data = await loadJSON<string[]>(dataPath);
    console.log(`Processing ${data.length} items...`);

    // 2. Generate embeddings and map them to metadata
    const dataWithEmbeddings = await generateEmbeddings(data);

    // 3. Write results back to JSON
    await saveJSON(outputPath, dataWithEmbeddings);
    console.log("✅ Embeddings generated and saved to embedded-data.json");
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  }
}
