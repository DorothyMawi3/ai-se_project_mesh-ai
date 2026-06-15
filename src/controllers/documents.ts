import type { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { PDFParse } from 'pdf-parse';
import { Document } from '../models/document.js';
import { Chunk } from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';

export const uploadDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  if (!req.file) {
    res.status(400).json({
      success: false,
      data: null,
      error: { message: 'File is required' },
    });
    return;
  }

  const buffer = readFileSync(req.file.path);
  const parser = new PDFParse({ data: buffer });
  const { text } = await parser.getText();

  const chunks = chunkText(text);
  const title = req.body.title || req.file.originalname;

  const document = await Document.create({
    title,
    fileName: req.file.originalname,
    userId,
  });

  await Promise.all(
    chunks.map((chunk) =>
      Chunk.create({
        documentId: document._id,
        text: chunk,
        embedding: [],
      }),
    ),
  );

  res.status(201).json({
    success: true,
    data: document,
    error: null,
  });
};

export const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;
  const documents = await Document.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: documents,
    error: null,
  });
};

export const getDocumentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  const document = await Document.findOne({
    _id: req.params.id,
    userId,
  });

  if (!document) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'document not found' },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: document,
    error: null,
  });
};

export const deleteDocument = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user!.userId;

  const document = await Document.findOneAndDelete({
    _id: req.params.id,
    userId,
  });

  if (!document) {
    res.status(404).json({
      success: false,
      data: null,
      error: { message: 'document not found' },
    });
    return;
  }

  await Chunk.deleteMany({ documentId: document._id });

  res.status(204).send();
};
