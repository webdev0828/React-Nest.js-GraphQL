import React, { Component } from 'react';

const Router = require('next/router').default;
const { action } = require('@storybook/addon-actions');

const actionWithPromise = () => {
  action('clicked link')();
  return new Promise((resolve, reject) => resolve());
};

const mockedRouter = {
  push: actionWithPromise,
  replace: actionWithPromise,
  replaceRoute: () => {},
  prefetchRoute: () => {},
  pushRoute: () => {},
  prefetch: () => {},
  route: '/mock-route',
  pathname: 'mock-path',
};

Router.route = mockedRouter;

const withMockRouterContext = mockRouter => {
  class MockRouterContext extends Component<any, any> {
    getChildContext() {
      return {
        router: Object.assign(mockedRouter, mockRouter),
      };
    }

    render() {
      return this.props.children;
    }
  }

  return MockRouterContext;
};

export { mockedRouter, withMockRouterContext };

const RouterMock = withMockRouterContext([mockedRouter]);

export default RouterMock;
