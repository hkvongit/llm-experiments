import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import {
  AI_API_KEY,
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_AI_MODEL,
} from "../constants.ts";

/**
 * Fn to load the data from URL using cheerio and return the data
 */
async function webDataLoading(url: string) {
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();
  return docs;
}

/**
 * Fn to split and return the data provided by webDataLoading using `RecursiveCharacterTextSplitter` and return the split
 */
async function dataSplitting(docs: any[]) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splits = await splitter.splitDocuments(docs);
  return splits;
}

/**
 * Fn to store the data to chroma-DB and return the vector store
 */
async function storeData(splits: any[]) {
  const embeddings = new OpenAIEmbeddings({
    apiKey: AI_API_KEY,
    modelName: DEFAULT_EMBEDDING_MODEL,
  });

  const vectorStore = await Chroma.fromDocuments(splits, embeddings, {
    collectionName: "rag-test-collection",
    // url: "http://localhost:8000", // Optional: if running a local Chroma server
  });

  return vectorStore;
}

/**
 * Main RAG logic: Retrieve data and generate answer
 */
async function ragPipeline(vectorStore: Chroma, question: string) {
  // 1. Create Retriever
  const retriever = vectorStore.asRetriever({ k: 2 });

  // 2. Create Model
  const llm = new ChatOpenAI({
    apiKey: AI_API_KEY,
    modelName: DEFAULT_AI_MODEL,
    temperature: 0,
  });

  // 3. Create Chains
  const questionAnsweringChain = await createStuffDocumentsChain({
    llm,
  });

  const retrievalChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnsweringChain,
  });

  // 4. Invoke Chain
  const response = await retrievalChain.invoke({
    input: question,
  });

  return response.answer;
}

export default async function main() {
  const url = "https://js.langchain.com/docs/get_started/introduction";

  console.log(`Loading data from ${url}...`);
  const docs = await webDataLoading(url);
  console.log(`Loaded ${docs.length} documents.`);

  console.log("Splitting data...");
  const splits = await dataSplitting(docs);
  console.log(`Split into ${splits.length} chunks.`);

  console.log("Embedding and storing data...");
  const vectorStore = await storeData(splits);
  console.log("Data stored in Chroma.");

  const question = "What is LangChain?";
  console.log(`\nAnswering question: "${question}"...`);
  const answer = await ragPipeline(vectorStore, question);

  console.log("\nAnswer:");
  console.log(answer);
}
