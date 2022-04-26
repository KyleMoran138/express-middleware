import { ErrorRequestHandler } from 'express';

interface Options {
  errorMessage?: string;
  returnData?: boolean;
}

const handler: (options?: Options) => ErrorRequestHandler = (options) => (err, req, res, next) => {

  const {
    errorMessage = 'Internal Server Error',
    returnData = false,
  } = (options || {});

  if(err){
    return res.status(500).json({
      errorMessage,
      data: returnData ? err : undefined,
    });
  }

  return next();
};

export {
  handler as exceptionHandlerMiddleware,
};