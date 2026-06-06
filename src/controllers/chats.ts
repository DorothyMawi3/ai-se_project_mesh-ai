import type { Request, Response } from 'express';

export const getChats = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      chats: [
        {
          id: 'chat_001',
          title: 'Demo Chat',
          createdAt: '2026-01-01T00:00:00Z',
        },
      ],
    },
    error: null,
  });
};

export const createChat = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      id: 'chat_002',
      title: 'New Chat',
      createdAt: '2026-01-01T00:00:00Z',
    },
    error: null,
  });
};

export const getChatById = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
      title: 'Demo Chat',
      messages: [],
    },
    error: null,
  });
};

export const deleteChat = (_req: Request, res: Response): void => {
  res.status(204).send();
};

export const sendMessage = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      chatId: req.params.id,
      message: 'This is a stubbed AI reply.',
    },
    error: null,
  });
};
