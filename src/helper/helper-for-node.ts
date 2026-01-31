import type Stream from "node:stream";
import { parseArgs } from "node:util";
import type { ResponseStreamEvent } from "openai/resources/responses/responses.mjs";
import fs from "node:fs/promises";

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

/**
 * Loads and parses a JSON file.
 * @param filePath Path to the JSON file.
 */
export async function loadJSON<T>(filePath: string): Promise<T> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(rawData);
}

/**
 * Saves data to a JSON file.
 * @param filePath Path to the output file.
 * @param data Data to be saved.
 */
export async function saveJSON(filePath: string, data: any): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
