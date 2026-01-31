import { INVOKED_FUNCTION } from "./src/constants.ts";
import simplePrompt from "./src/simple-prompt.ts";
import streamingResponses from "./src/streaming-responses.ts";
import conversations from "./src/conversions.ts";
import functionCalling from "./src/function-calling.ts";
import embeddings from "./src/embeddings/index.ts";
import similar from "./src/embeddings/similar.ts";

console.log(
  "Running index.ts file by node, Make sure the node version is v25.5.0**"
);

console.log("INVOKED FUNCTION :", INVOKED_FUNCTION);

console.log(`\n\nRunning on Node version: ${process.version}\n`);
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
  default:
    break;
}

// functionCalling();
