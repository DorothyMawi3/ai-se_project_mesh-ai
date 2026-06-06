import type { Request, Response } from 'express';

export const uploadDocument = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      id: 'doc_001',
      filename: 'sample.pdf',
      status: 'uploaded',
    },
    error: null,
  });
};

export const getDocuments = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      documents: [
        {
          id: 'doc_001',
          filename: 'sample.pdf',
          createdAt: '2026-01-01T00:00:00Z',
        },
      ],
    },
    error: null,
  });
};

export const getDocumentById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
      filename: 'sample.pdf',
      status: 'processed',
    },
    error: null,
  });
};

export const deleteDocument = (_req: Request, res: Response): void => {
  res.status(204).send();
};
