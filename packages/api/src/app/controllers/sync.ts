const Router = require('koa-router');
import { modelsQuery } from 'src/app/models/Query';
import Schema from 'src/app/models/Schema';

const _ = require('lodash');

const route = new Router({
  prefix: '/sync',
});

route.get('/', async (ctx, next) => {
  console.log('-------------');
  const query = await modelsQuery();
  const schema = new Schema(query);

  /**
   * Break down task by each model
   */
  await query.data.models.forEach(async model => {
    const { name, contents } = model;
    const Model = schema.models[name];

    /**
     * Compare contentIDs on Mongoose & GraphCMS, remove non-existing records.
     */
    const records = await Model.find({});
    const graphcmsContentIDs = _.map(contents, 'id');
    const mongooseContentIDs = _.map(records, 'graphcms_id');
    const idsToDelete = _.difference(mongooseContentIDs, graphcmsContentIDs);
    _.difference(graphcmsContentIDs, mongooseContentIDs);

    await idsToDelete.forEach(
      async id => await Model.deleteOne({ graphcms_id: id }),
    );

    /**
     * Go through each content to create/update
     */
    await contents.forEach(async content => {
      const { id: contentID, fieldValues: values } = content;

      // Convert array of field values to object literal
      const fields = values.reduce((acc, cur) => {
        acc['graphcms_id'] = contentID;
        acc[cur.key] = cur.value;
        return acc;
      }, {});

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      await Model.findOneAndUpdate({ graphcms_id: contentID }, fields, options);
    });
  });
  ctx.body = 'Data synced!';
});

export default route;
