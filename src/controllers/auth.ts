import type { Request, Response } from 'express';

export const registerUser = (_req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {
      id: 'user_001',
      username: 'demo_user',
      email: 'demo@example.com',
    },
    error: null,
  });
};

export const loginUser = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      token: 'fake-jwt-token',
      user: {
        id: 'user_001',
        username: 'demo_user',
        email: 'demo@example.com',
      },
    },
    error: null,
  });
};

export const getCurrentUser = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: 'user_001',
      username: 'demo_user',
      email: 'demo@example.com',
    },
    error: null,
  });
};
