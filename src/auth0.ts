import { RequestHandler } from 'express';
import { expressjwt } from 'express-jwt';
import { ExpressJwtOptions, expressJwtSecret } from 'jwks-rsa';

interface Options {
  secret: ExpressJwtOptions;
  audience: string;
  issuer: string;
  algorithms?: string[];
}

const handler: (options: Options) => RequestHandler = (options) => {

  const {
    secret,
    algorithms = ['RS256'],
    audience,
    issuer,
  } = (options || {});

  return expressjwt({
    secret: expressJwtSecret(secret),
    algorithms,
    audience,
    issuer,
  });
}

export {
  handler as auth0Middleware,
  Options as auth0MiddlewareOptions,
}

