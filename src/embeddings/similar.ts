import path from "node:path";
import { generateEmbeddings } from "./index.ts";
import { loadJSON } from "../helper/helper-for-node.ts";

/**
 * Represents an item with its text and embedding vector.
 */
interface EmbeddedItem {
  input: string;
  embedding: number[];
}

/**
 * Represents a similarity result with a score.
 */
interface SimilarityResult extends EmbeddedItem {
  score: number;
}

/**
 * Computes the cosine similarity between two vectors.
 * Returns 0 for zero vectors or mismatched lengths to avoid errors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;

  // dot product
  const dot = a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0);
  const norm = (v: number[]) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));

  const denominator = norm(a) * norm(b);
  return denominator === 0 ? 0 : dot / denominator;
}

/**
 * Finds the top N similar items in a dataset for a given query vector.
 */
export function findSimilar(
  queryVec: number[],
  dataset: EmbeddedItem[],
  limit = 5
): SimilarityResult[] {
  return dataset
    .map((item) => ({
      ...item,
      score: cosineSimilarity(queryVec, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Main function to find similar items based on a query string.
 */
export default async function main() {
  const query = "Cat";
  const dataPath = path.join(import.meta.dirname, "embedded-data.json");

  try {
    console.log(`🔍 Searching for matches to: "${query}"...`);

    // Fetch query embedding and load dataset in parallel
    const [queryEmbeddings, dataset] = await Promise.all([
      generateEmbeddings([query]),
      loadJSON<EmbeddedItem[]>(dataPath),
    ]);

    const queryVec = queryEmbeddings[0]?.embedding;
    if (!queryVec)
      throw new Error(`Failed to generate embedding for: ${query}`);
    if (!dataset.length)
      throw new Error("The embedded-data.json file is empty.");

    // Find and display the top matches
    const matches = findSimilar(queryVec, dataset, 10);

    if (matches.length === 0) {
      console.log("\n⚠️ No matches found.");
      return;
    }

    const bestMatch = matches[0];

    console.log("\n--- Top 10 Matches ---");
    matches.forEach((match, index) => {
      const rank = (index + 1).toString().padStart(2);
      console.log(
        `${rank}. ${match.input.padEnd(15)} | Similarity: ${match.score.toFixed(
          4
        )}`
      );
    });

    if (bestMatch) {
      console.log(
        `\n🏆 Best Match: "${
          bestMatch.input
        }" with a score of ${bestMatch.score.toFixed(4)}`
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error: ${message}`);
  }
}
