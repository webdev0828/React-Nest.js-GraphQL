import routes from 'src/route/routes';

const next = require('next');
const express = require('express');
const cors = require('cors');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express()
    .use(
      cors({
        origin: '*',
      }),
    )
    .use(handler)
    .listen(3000);
});
