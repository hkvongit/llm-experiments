import { CloudClient } from "chromadb";
import {
  VECTOR_DB_API_KEY,
  VECTOR_DB_NAME,
  VECTOR_DB_TENANT,
} from "../../constants.ts";

export const dbClient = new CloudClient({
  apiKey: VECTOR_DB_API_KEY,
  tenant: VECTOR_DB_TENANT,
  database: VECTOR_DB_NAME,
});
