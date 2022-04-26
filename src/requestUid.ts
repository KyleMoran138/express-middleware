import { RequestHandler } from 'express';
import { v4 as uuidv4, V4Options } from 'uuid';

interface Options {
  idOptions?: V4Options;
}

const handler: (options?: Options) => RequestHandler = (options) => async (req, res, next) => {
  const {
    idOptions,
  } = (options || {});
  
  req.id = uuidv4(idOptions);

  next();
};

export {
  handler as requestIdMiddleware,
  Options as requestIdMiddlewareOptions,
};