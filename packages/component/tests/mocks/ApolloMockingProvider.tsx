import React from 'react';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { ApolloProvider } from 'react-apollo';
import schema from 'tests/mocks/schema';
import mocks from 'tests/mocks/mocks';
import { mergeResolvers } from '@codelab/utils';

/**
 * Creates a client from schema & resolvers
 */
const ApolloMockingProvider = ({ customResolvers = {}, ...props }) => {
  /**
   * Inject mock data to Apollo
   */
  const combinedMocks = mergeResolvers(mocks(props), customResolvers);

  addMockFunctionsToSchema({ schema, mocks: combinedMocks });

  /**
   * Create Apollo Links
   */
  const cache = new InMemoryCache();

  const schemaLink = new SchemaLink({ schema });

  /**
   * Create Apollo Client
   */
  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([schemaLink]),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApolloMockingProvider;
