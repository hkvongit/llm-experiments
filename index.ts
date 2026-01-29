import { INVOKED_FUNCTION } from "./src/constants.ts";
import simplePrompt from "./src/simple-prompt.ts";
import streamingResponses from "./src/streaming-responses.ts";
import conversations from "./src/conversions.ts";

console.log(
  "Running index.ts file by node, Make sure the node version is v25.5.0**"
);

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
  default:
    break;
}
console.log("INVOKED FUNCTION :", INVOKED_FUNCTION);
