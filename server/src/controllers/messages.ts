import type { Request, Response } from 'express';
import { Chat } from '../models/chat.js';
import { Chunk } from '../models/chunk.js';
import { Document } from '../models/document.js';
import { Message } from '../models/message.js';
import {
  buildContext,
  getClient,
  hasRealNebiusKey,
  LLM_MODEL,
} from '../utils/openai-client.js';
import { createEmbedding } from '../utils/embeddings.js';
import { rankBySimilarity } from '../utils/vector-search.js';

export const createMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { question } = req.body;
  const chatId = String(req.params.id);
  const userId = req.user!.userId;

  if (!question) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'question is required' },
    });
    return;
  }

  const chat = await Chat.findOne({ _id: chatId, userId });

  if (!chat) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'chat not found' },
    });
    return;
  }

  const userDocs = await Document.find({ userId }, '_id');
  const docIds = userDocs.map((document) => document._id);

  const chunkRecords = await Chunk.find({ documentId: { $in: docIds } });

  const chunks = chunkRecords.map((chunk) => ({
    id: String(chunk._id),
    documentId: String(chunk.documentId),
    text: chunk.text,
    embedding: chunk.embedding,
  }));

  const queryEmbedding = await createEmbedding(question);
  const ranked = rankBySimilarity(queryEmbedding, chunks, 5);
  const context = buildContext(ranked);

  const answer = hasRealNebiusKey()
    ? (
        await getClient().chat.completions.create({
          model: LLM_MODEL,
          messages: [
            {
              role: 'system',
              content:
                'Answer the user question using only the provided document context.',
            },
            {
              role: 'user',
              content: `Context:\n${context}\n\nQuestion: ${question}`,
            },
          ],
        })
      ).choices[0]?.message?.content || 'No answer was generated.'
    : `Based on the uploaded documents, here is the most relevant context I found: ${context}`;

  const userMessage = await Message.create({
    chatId,
    role: 'user',
    content: question,
  });

  const assistantMessage = await Message.create({
    chatId,
    role: 'assistant',
    content: answer,
  });

  res.status(201).json({
    success: true,
    data: [userMessage, assistantMessage],
    error: null,
  });
};
