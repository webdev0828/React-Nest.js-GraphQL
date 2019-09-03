import { default as query } from 'src/app/controllers/query';
import { default as sync } from 'src/app/controllers/sync';

const withRoutes = (app: any) => {
  /**
   * My Endpoints
   */
  app.use(sync.routes());
  app.use(query.routes());
};

export default withRoutes;
