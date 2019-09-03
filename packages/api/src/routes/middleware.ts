const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

const withMiddleware = (app: any) => {
  // trust proxy
  app.proxy = true;

  // Parser
  app.use(bodyParser());

  // Sessions
  app.keys = ['secret'];
  // app.use(session({}, app));

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Cors
  app.use(cors());

  app.on('error', (err, ctx) => {
    console.log(err);
    const { type, name, code, message } = err;

    /**
     * Set error info
     */
    if (type === 'MongoError' && code === 11000) {
      const status = 409;
      ctx.status = status;
      ctx.body = {
        status,
        message,
      };
    }

    if (type === 'Application' && name === 'UserNotFoundException') {
      ctx.status = 404;
      ctx.body = {
        message,
      };
    }

    if (type === 'Application' && name === 'IncorrectPasswordException') {
      ctx.status = 403;
      ctx.body = {
        message,
      };
    }

    return ctx;
  });
};

export default withMiddleware;
