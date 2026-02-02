---
name: Build LangChain RAG App
overview: Implement a RAG application that fetches HTML from a URL, splits it, embeds it using OpenAI, stores it in ChromaDB, and retrieves answers using LangChain libraries.
todos:
  - id: install-deps
    content: Install cheerio and @langchain/community
    status: pending
  - id: implement-rag
    content: Implement RAG pipeline in src/langchain/RAG-app/RAG-app.ts
    status: pending
  - id: update-index
    content: Update index.ts to run the RAG app
    status: pending
isProject: false
---

I will implement the RAG (Retrieval-Augmented Generation) pipeline using LangChain libraries as requested.

### 1. Install Dependencies

I will install the necessary packages for web scraping and LangChain community integrations.

- `cheerio`: For parsing HTML content.
- `@langchain/community`: For `CheerioWebBaseLoader` and `Chroma` vector store integration.

### 2. Implement RAG Pipeline in `src/langchain/RAG-app/RAG-app.ts`

I will overwrite the existing file with the following components:

-   **Data Loading**: Use `CheerioWebBaseLoader` to fetch content from a URL (defaulting to a sample URL like a Wikipedia page or LangChain docs).
-   **Splitting**: Use `RecursiveCharacterTextSplitter` to chunk the text into manageable parts (e.g., 1000 characters with overlap). [Documentation here](https://docs.langchain.com/oss/javascript/integrations/splitters)
-   **Embedding & Storage**:
    -   Use `OpenAIEmbeddings` for generating embeddings. [Docs here](https://docs.langchain.com/oss/javascript/integrations/text_embedding#install-and-use)
    -   Use `Chroma` from `@langchain/community/vectorstores/chroma` to store the embeddings. I will configure it to use the existing ChromaDB configuration if possible, or a local instance/collection.[Documentation here](https://docs.langchain.com/oss/javascript/integrations/vectorstores/chroma)
-   **Retrieval & Generation**:
    -   Theory is explained in [internal doc](./retriever-theory.md)
    -   Create a `retriever` from the Chroma vector store.
    -   Use `ChatOpenAI` as the LLM.
    -   Construct a RAG chain using `createStuffDocumentsChain` (for answer generation) and `createRetrievalChain` (to connect retriever and generator).
-   **Execution**:
    -   Add a `main` function to run the full pipeline: Load -> Split -> Store -> Ask Question.

### 3. Usage

I will provide instructions on how to run the script (e.g., `npm run dev` with modification to `index.ts` to call this new module).
