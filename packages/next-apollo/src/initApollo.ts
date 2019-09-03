import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import fetch from 'node-fetch';

export const isBrowser = typeof window !== 'undefined';

export type ApolloConfig = {
  uri: string;
  resolvers: any;
} | null;

let apolloClient;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (apolloConfig: ApolloClientOptions<any>, initialState) => {
  const client = new ApolloClient(apolloConfig);

  if (initialState) {
    client.cache.restore(initialState);
  }

  return client;
};

const initApollo = (apolloConfig, initialState) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(apolloConfig, initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(apolloConfig, initialState);
  }

  return apolloClient;
};

export { initApollo };
