import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fecha = new Date().toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });
    console.log(`[${fecha}] Método: ${req.method} | Ruta: ${req.originalUrl}`);
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const fecha = new Date().toLocaleString('es-CO', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
  console.log(`[${fecha}] Método: ${req.method} | Ruta: ${req.originalUrl}`);
  next();
}
