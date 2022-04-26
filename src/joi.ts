import { RequestHandler } from 'express';
import * as Joi from 'joi';

interface Options {
  schema?: Joi.Schema;
}

const handler: (options?: Options) => RequestHandler = (options) => async (req, res, next) => {

  const {
    schema,
  } = (options || {});

  if(!schema){
    return next();
  }

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      errorMessage: validation.error.message,
    });
  }

  req.body = validation.value;

  return next();
};

export {
  handler as joiMiddleware,
  Options as joiMiddlewareOptions,
};