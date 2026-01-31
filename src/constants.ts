import { parseRuntimeArgs } from "./helper/helper-for-node.ts";

export const AI_API_KEY = process.env.AI_API_KEY;
export const DEFAULT_AI_MODEL = "gpt-4o-mini";
export const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
export const INVOKED_FUNCTION = parseRuntimeArgs().invoke_fn;
