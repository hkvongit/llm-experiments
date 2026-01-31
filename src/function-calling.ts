import type {
  ResponseInput,
  ResponseOutputItem,
  Tool,
} from "openai/resources/responses/responses.js";
import { aiClient, defaultAiConfig } from "./config/ai-config.ts";

const tools: Tool[] = [
  {
    type: "function",
    name: "get_weather",
    description: "Get today's weather of the location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "name of the location",
        },
        unit: {
          type: "string",
          enum: ["celsius", "fahrenheit"],
          description: "Units the temperature will be returned in.",
        },
      },
      required: ["location", "unit"],
      additionalProperties: false,
    },
    strict: true,
  },
];

let input: ResponseInput = [
  { role: "user", content: "What is the weather in Kollam, Kerala" },
];

interface getWhetherInf {
  location: string;
  unit: string;
}
// function to be called by the AI model
function getWeather({ location, unit }: getWhetherInf) {
  let value = 0;
  switch (unit) {
    case "celsius":
      value = 29;
      break;
    case "fahrenheit":
      value = 84;
      break;
    default:
      value = 1;
      break;
  }
  return `Weather at ${location} is ${value} degree ${unit}`;
}

export default async function main() {
  try {
    let response = await aiClient.responses.create({
      ...defaultAiConfig,
      tools: tools,
      input,
    });

    response.output.forEach((item: ResponseOutputItem) => {
      // 1. ALWAYS push the model's output item to history first
      input.push(item as any);
      if (item.type == "function_call") {
        if (item.name == "get_weather") {
          const weather = getWeather(JSON.parse(item.arguments));

          // adding the result of function call to the initial input
          input.push({
            type: "function_call_output",
            call_id: item.call_id,
            output: weather.toString(),
          });
        }
      }
    });

    console.log(`\n FINAL ANSWER \n`);
    response = await aiClient.responses.create({
      ...defaultAiConfig,
      tools: tools,
      input,
    });
    console.log(JSON.stringify(response.output, null, 2));
  } catch (error) {
    throw new Error(`${error}`);
  }
}
