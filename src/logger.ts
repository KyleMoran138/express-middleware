import { RequestHandler } from 'express';

interface Options {
  logPrefix?: string;
}

const handler: (options?: Options) => RequestHandler = (options) => async (req, res, next) => {
  const { 
    logPrefix,
  } = (options || {});

  const start = new Date();
  console.log(`${logPrefix}${req.id}: REQUEST ${req.method} ${req.path}`);
  
  res.on('finish', () => {
    const time = new Date().getTime() - start.getTime();
    console.log(`${logPrefix}${req.id}: RESPONSE ${res.statusCode} IN ${time}ms`);
  });

  next();
};

export {
  handler as loggerMiddleware,
  Options as loggerMiddlewareOptions,
};