import { getClient, hasRealNebiusKey } from './openai-client.js';

const EMBEDDING_MODEL = 'Qwen/Qwen3-Embedding-8B';

const createFallbackEmbedding = (text: string): number[] => {
  const vector = new Array(64).fill(0);

  for (let i = 0; i < text.length; i += 1) {
    vector[i % vector.length] += text.charCodeAt(i) / 1000;
  }

  return vector;
};

export const createEmbedding = async (text: string): Promise<number[]> => {
  if (!hasRealNebiusKey()) {
    return createFallbackEmbedding(text);
  }

  const response = await getClient().embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return response.data[0]!.embedding;
};
