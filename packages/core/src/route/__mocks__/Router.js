const Router = jest.genMockFromModule('../Router');

const pushRoute = route => {
  console.log('push route to: ' + route);
};

Router.pushRoute = pushRoute;

export default Router;
