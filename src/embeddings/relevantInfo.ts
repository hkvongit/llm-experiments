import { vectorDbClient } from "../config/db/vector-db.ts";
import { OpenAIEmbeddingFunction } from "@chroma-core/openai";
import {
  AI_API_KEY,
  DATA_TEST_DB_COLLECTION_NAME,
  DEFAULT_EMBEDDING_MODEL,
} from "../constants.ts";
import type { Collection } from "chromadb";
import { aiClient, defaultAiConfig } from "../config/ai-config.ts";

const studentInfo = `Alexandra Thompson, a 19-year-old computer science sophomore with a 3.7 GPA,
is a member of the programming and chess clubs who enjoys pizza, swimming, and hiking
in her free time in hopes of working at a tech company after graduating from the University of Washington.`;

const clubInfo = `The university chess club provides an outlet for students to come together and enjoy playing
the classic strategy game of chess. Members of all skill levels are welcome, from beginners learning
the rules to experienced tournament players. The club typically meets a few times per week to play casual games,
participate in tournaments, analyze famous chess matches, and improve members' skills.`;

const universityInfo = `The University of Washington, founded in 1861 in Seattle, is a public research university
with over 45,000 students across three campuses in Seattle, Tacoma, and Bothell.
As the flagship institution of the six public universities in Washington state,
UW encompasses over 500 buildings and 20 million square feet of space,
including one of the largest library systems in the world.`;

const embeddingFn = new OpenAIEmbeddingFunction({
  apiKey: AI_API_KEY!,
  modelName: DEFAULT_EMBEDDING_MODEL,
});

const dataTestCollection: Collection =
  await vectorDbClient.getOrCreateCollection({
    name: DATA_TEST_DB_COLLECTION_NAME,
    embeddingFunction: embeddingFn,
  });

async function addData(dataTestCollection: Collection) {
  const result = await dataTestCollection.add({
    ids: ["id2", "id3", "id4"],
    documents: [studentInfo, clubInfo, universityInfo],
  });
  console.log("Result ⬇️");
  console.dir(result);
}

async function askQuestion() {
  const question = "Where are the campuses of University of Washington ?";
  const result = await dataTestCollection.query({
    queryTexts: [question],
    nResults: 1,
  });
  const relevantInfo = result.documents[0];

  if (relevantInfo) {
    const aiModelResp = await aiClient.chat.completions.create({
      ...defaultAiConfig,
      temperature: 0,
      messages: [
        {
          role: "assistant",
          content: `Answer the next question using this information: ${relevantInfo}`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const responseInChat = aiModelResp.choices[0]?.message;
    console.log(responseInChat?.content);
  }
}

export default async function main() {
  try {
    // addData(dataTestCollection);
    askQuestion();
  } catch (err) {
    throw new Error(`${err}`);
  }
}
