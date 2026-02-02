import { INVOKED_FUNCTION } from "./src/constants.ts";
import simplePrompt from "./src/simple-prompt.ts";
import streamingResponses from "./src/streaming-responses.ts";
import conversations from "./src/conversions.ts";
import functionCalling from "./src/function-calling.ts";
import embeddings from "./src/embeddings/index.ts";
import similar from "./src/embeddings/similar.ts";
import chromaDbTest from "./src/embeddings/chromaDb.ts";
import embeddedRelevantInfo from "./src/embeddings/relevantInfo.ts";
// Langchain imports
import langChainModelFn from "./src/langchain/model.ts";
import langChainPromptPlusOutParser from "./src/langchain/prompt-builder-with-parser.ts";

const nodeRuntimeVersion = process.version;
const requiredNodeVersion = "v25.5.0";

if (nodeRuntimeVersion != requiredNodeVersion) {
  console.error(
    `\n
    ⚠️  Please choose node version ${requiredNodeVersion}, current version is ${nodeRuntimeVersion} ❌❌❌
      👆 \n`
  );
  throw new Error("Runtime Node version mismatch");
}

console.log("INVOKED FUNCTION :", INVOKED_FUNCTION);

switch (INVOKED_FUNCTION) {
  case "simplePrompt":
    simplePrompt();
    break;
  case "streamingResponses":
    streamingResponses();
    break;
  case "conversations":
    conversations();
    break;
  case "functionCalling":
    functionCalling();
    break;
  case "embeddings":
    embeddings();
    break;
  case "findEmbedSimilarity":
    similar();
    break;
  case "chromaDbTest":
    chromaDbTest();
    break;
  case "embedded_relevantInfo":
    embeddedRelevantInfo();
    break;
  case "langChainModelFn":
    langChainModelFn();
    break;
  case "langChainPromptPlusOutParser":
    langChainPromptPlusOutParser();
    break;
  default:
    break;
}

// functionCalling();
