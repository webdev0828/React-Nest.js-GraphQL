const nextRoutes = require('next-routes');

export const USER_APP_ROUTE = 'user.app';
export const HOME_ROUTE = 'home';
export const USER_ROUTE = 'user';
export const USER_APP_VARIANT_ROUTE = 'user.app.variant';
export const USER_APP_PAGE_ROUTE = 'user.app.page';
export const USER_APP_PAGE_LAYOUT_ROUTE = 'user.app.page.layout';
export const USER_APP_MODEL_ID_ROUTE = 'user.app.model.id';
export const USER_APP_CONTENT_ID = 'user.app.content.id';
export const USER_APP_QUERY_ROUTE = 'user.app.query';
export const USER_APP_API_ROUTE = 'user.app.api';

const routes = nextRoutes()
  /**
   * Documentation
   */
  .add({
    name: 'doc',
    pattern: '/doc',
    page: 'doc/index',
  })
  /**
   * Home
   */
  .add({
    name: HOME_ROUTE,
    pattern: '/',
    page: 'index',
  })
  .add({
    name: USER_ROUTE,
    pattern: '/:username',
    page: 'user/index',
  })
  .add({
    name: USER_APP_ROUTE,
    pattern: '/:username/:app',
    page: 'user/app/index',
  })
  .add({
    name: USER_APP_VARIANT_ROUTE,
    pattern: '/:username/:app/variant',
    page: 'user/app/variant',
  })
  .add({
    name: USER_APP_API_ROUTE,
    pattern: '/:username/:app/api',
    page: 'user/app/api',
  })
  .add({
    name: USER_APP_QUERY_ROUTE,
    pattern: '/:username/:app/queries',
    page: 'user/app/queries',
  })
  .add({
    name: USER_APP_PAGE_ROUTE,
    pattern: '/:username/:app/:page',
    page: 'user/app/page/index',
  })
  .add({
    name: USER_APP_PAGE_LAYOUT_ROUTE,
    pattern: '/:username/:app/:page/layout',
    page: 'user/app/page/layout',
  })
  .add({
    name: USER_APP_MODEL_ID_ROUTE,
    pattern: '/:username/:app/models/:model/:id',
    page: 'user/app/models',
  })
  .add({
    name: USER_APP_CONTENT_ID,
    pattern: '/:username/:app/contents/:model/:id',
    page: 'user/app/contents',
  });

const { Link, Router } = routes;

export { Link, Router };

export default routes;
