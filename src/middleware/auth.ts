import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

type JwtPayload = {
  userId: string;
};

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'authorization required' },
    });
    return;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      data: null,
      error: { message: 'authorization required' },
    });
  }
};
