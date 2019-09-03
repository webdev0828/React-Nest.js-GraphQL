import { withRouter } from 'next/router';
import React, { Component } from 'react';
import { compose } from 'recompose';

export const withRoutes = compose(
  // Adds route to props
  withRouter,
  ComposedComponent =>
    class WithRoute extends Component {
      render() {
        return <ComposedComponent {...this.props} />;
      }
    },
);
