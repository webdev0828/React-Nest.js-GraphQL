const Router = require('koa-router');
import { modelsQuery } from 'src/app/models/Query';
import Schema from 'src/app/models/Schema';

const _ = require('lodash');

const route = new Router({
  prefix: '/query',
});

route.get('/', async (ctx, next) => {
  console.log('-------------');
  const query = await modelsQuery();
  const schema = new Schema(query);

  ctx.body = 'Loaded!';
});

export default route;
