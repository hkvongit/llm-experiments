// Store the source data to vector db after embedding.
// if it is large data, we need to find a way to split the data and then embed then store.
// if the data is a web page, we need ways to fetch and parse the data into LLM readable format > then split > embed > store the embedding to vector DB.

/*
function to load the data from URL using cheerio and return the data
*/
function webDataLoading() {}

/**
 * Fn to split and return the data provided by webDataLoading using `RecursiveCharacterTextSplitter` and return the split
 */
function dataSplitting() {}

/**
 * Use open AI embedding model to generate and return embedding of the data coming from dataSplitting fn
 */
function embedData() {}

/**
 * Fn to store the data to chroma-DB
 */
function storeData() {}

/**
 * fn to retrieve the data from chromaDB based on similarity with the input from the user. The input will be passed from the main function.
 *   */
function dataRetrieval() {}

/**
 * Output the data in formal text format using openAI
 */
function outTextGeneration() {}

export default function main() {}
