import type { Request, Response } from 'express';

export const askQuestion = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      answer: 'This is a stubbed answer from MeshAI.',
      sources: [],
    },
    error: null,
  });
};
