import React from 'react';
import { addMockFunctionsToSchema, MockList } from 'graphql-tools';
import mergeResolvers from 'src/utils/mergeResolvers';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { withClientState } from 'apollo-link-state';
import schema from './schema';
import { ApolloProvider, Query, graphql } from 'react-apollo';
import mocks from 'tests/mocks/mocks';

/**
 * Creates a client from schema & resolvers
 */
const ApolloMockingProvider = props => {
  /**
   * Inject mock data to Apollo
   */
  const combinedMocks = mergeResolvers(mocks(props), props.customResolvers);

  addMockFunctionsToSchema({ schema, mocks: combinedMocks });

  /**
   * Create Apollo Links
   */
  const cache = new InMemoryCache();

  const schemaLink = new SchemaLink({ schema });

  const stateLink = withClientState({
    cache,
    ...props.cacheResolvers,
  });

  /**
   * Create Apollo Client
   */
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink, schemaLink]),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloMockingProvider;
