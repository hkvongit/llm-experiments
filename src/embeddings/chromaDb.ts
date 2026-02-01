import { vectorDbClient } from "../config/db/vector-db.ts";
import { OpenAIEmbeddingFunction } from "@chroma-core/openai";
import {
  AI_API_KEY,
  DATA_TEST_DB_COLLECTION_NAME,
  DEFAULT_EMBEDDING_MODEL,
} from "../constants.ts";
import type { Collection } from "chromadb";

const main = async () => {
  const embeddingFn = new OpenAIEmbeddingFunction({
    apiKey: AI_API_KEY!,
    modelName: DEFAULT_EMBEDDING_MODEL,
  });

  const dataTestCollection: Collection =
    await vectorDbClient.getOrCreateCollection({
      name: DATA_TEST_DB_COLLECTION_NAME,
      embeddingFunction: embeddingFn,
    });

  addData(dataTestCollection);
};

async function addData(dataTestCollection: Collection) {
  const result = await dataTestCollection.add({
    ids: ["id1"],
    documents: ["Here is my entry"],
  });
  console.log("Result ⬇️");
  console.dir(result);
}

export default main;
