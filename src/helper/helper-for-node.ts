import type Stream from "node:stream";
import { parseArgs } from "node:util";
import type { ResponseStreamEvent } from "openai/resources/responses/responses.mjs";

export const parseRuntimeArgs = () => {
  const args = process.argv.splice(2);
  const { values } = parseArgs({
    args,
    options: {
      port: { type: "string" },
      invoke_fn: { type: "string" },
    },
  });

  console.log(values); // { port: '3000' }
  console.log(values.port);

  return values;
};

export const streamResponseOutput = async (stream: any) => {
  let responseId = null;
  for await (const event of stream) {
    try {
      const response = event?.delta || "";
      process.stdout.write(response);
      if (event.sequence_number == 0) responseId = event?.response?.id ?? null;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  return { responseId };
};
