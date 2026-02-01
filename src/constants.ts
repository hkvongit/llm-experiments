import { parseRuntimeArgs } from "./helper/helper-for-node.ts";

export const AI_API_KEY = process.env.AI_API_KEY;
export const DEFAULT_AI_MODEL = "gpt-4o-mini";
export const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
export const INVOKED_FUNCTION = parseRuntimeArgs().invoke_fn;

// VECTOR_DB RELATED
export const VECTOR_DB_API_KEY = process.env.CHROMA_DB_API_KEY ?? "";
export const VECTOR_DB_TENANT = process.env.CHROMA_DB_TENANT ?? "";
export const VECTOR_DB_NAME = process.env.CHROMA_DB_NAME ?? "";
export const DATA_TEST_DB_COLLECTION_NAME = "data-test";
