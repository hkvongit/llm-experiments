import { aiClient, defaultAiConfig } from "./config/ai-config.ts";
import { streamResponseOutput } from "./helper/helper-for-node.ts";

interface handleRequestInf {
  prev_chat_id: string | null;
  userInput: string;
}

const handleRequest = async ({ prev_chat_id, userInput }: handleRequestInf) => {
  const requestData = {
    ...defaultAiConfig,
    input: userInput,
    store: true,
    stream: true,
  };
  if (prev_chat_id)
    Object.assign(requestData, { previous_response_id: prev_chat_id });

  const stream = await aiClient.responses.create(requestData);
  const streamOut = await streamResponseOutput(stream);
  return streamOut.responseId ? streamOut.responseId : null;
};

export default function main() {
  let prev_chat_id: string | null = null;

  console.log("\n😊 You:");
  process.stdin.addListener("data", async function (input) {
    const userInput = input.toString().trim();
    console.log("\n>>>> 🤖 Machine answer:");
    prev_chat_id = await handleRequest({ prev_chat_id, userInput });
    console.log("\n⭐ ================================================ ⭐\n");
    console.log(">>>> 😊 You:");
  });
}
