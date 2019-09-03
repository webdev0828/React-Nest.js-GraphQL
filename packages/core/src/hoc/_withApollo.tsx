import { withApolloClient } from '@codelab/next-apollo';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { compose } from 'recompose';
import { apolloConfig } from 'src/config/apolloClient';

export const withApollo = compose(
  withApolloClient(apolloConfig),
  ComposedComponent =>
    class extends React.Component<any> {
      render() {
        const { apolloClient } = this.props;

        return (
          <ApolloProvider client={apolloClient}>
            <ComposedComponent {...this.props} />
          </ApolloProvider>
        );
      }
    },
);
