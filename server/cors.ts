import { NextFunction, Request, Response } from 'express';

export function cors(request: Request, response: Response, next: NextFunction) {
  response.header('Access-Control-Allow-Origin', `${request.get('origin')}`);
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,OPTIONS'
  );
  response.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Credentials'
  );

  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
    response.end();
  } else {
    next();
  }
}
