import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import config from 'src/config/config';
import withMiddleware from 'src/routes/middleware';
import withRoutes from 'src/routes/routes';

/**
 * Setup App
 */
const app = new Koa();
mongoose.connect(config.db!, { useNewUrlParser: true });

/**
 * Add HOC
 */
withMiddleware(app);
withRoutes(app);

/**
 * Connect Server
 */
app.listen(config.port);
