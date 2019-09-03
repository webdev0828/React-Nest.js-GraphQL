import { ApolloClientOptions } from 'apollo-client';
import Head from 'next/head';
import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import { initApollo } from './initApollo';

// Gets the display name of a JSX component for dev tools
const getComponentDisplayName = Component => {
  return Component.displayName || Component.name || 'Unknown';
};

const withApolloClient = (apolloConfig: ApolloClientOptions<any>) => {
  return ComposedComponent => {
    return class Apollo extends React.Component<any> {
      public apolloClient;

      static displayName = `withApollo(${getComponentDisplayName(
        ComposedComponent,
      )})`;

      static async getInitialProps(ctx) {
        const { Component, router } = ctx;

        let pageProps = {};
        if (ComposedComponent.getInitialProps) {
          pageProps = await ComposedComponent.getInitialProps(ctx);
        }

        // Run all GraphQL queries in the component tree
        // and extract the resulting data
        const apollo = initApollo(apolloConfig, null);
        if (!(process as any).browser) {
          try {
            // Run all GraphQL queries
            await getDataFromTree(
              <ComposedComponent
                {...pageProps}
                Component={Component}
                router={router}
                apolloClient={apollo}
              />,
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }

        // Extract query data from the Apollo store
        const apolloState = apollo.cache.extract();

        return {
          ...pageProps,
          apolloState,
        };
      }

      constructor(props) {
        super(props);
        this.apolloClient = initApollo(apolloConfig, props.apolloState);
      }

      render() {
        const props = { ...this.props };
        return (
          <ComposedComponent {...props} apolloClient={this.apolloClient} />
        );
      }
    };
  };
};

export { withApolloClient };
