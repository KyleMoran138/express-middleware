import { RequestHandler } from 'express';

const handler: () => RequestHandler = () => async (req, res, next) => {
  const start = new Date();
  console.log(`${req.id}: REQUEST ${req.method} ${req.path}`);
  
  res.on('finish', () => {
    const time = new Date().getTime() - start.getTime();
    console.log(`${req.id}: RESPONSE ${res.statusCode} IN ${time}ms`);
  });

  next();
};

export {
  handler as loggerMiddleware,
};