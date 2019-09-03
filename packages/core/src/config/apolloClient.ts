import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';
import { ApolloLink, FetchResult } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { GraphQLError } from 'graphql';
import { Subject } from 'rxjs';
import { apolloLocalState } from 'src/state/apollo-local-state';
import configState from 'src/state/apollo-local-state/config/configState';
import { sidebarState } from 'src/state/apollo-local-state/sidebar/sidebarState';
import { gridState } from 'src/state/apollo-local-state/grid/gridState';
import { componentState } from 'src/state/apollo-local-state/component/componentState';
import { modelState } from 'src/state/apollo-local-state/model/modelState';

export const responseSubject = new Subject<SuccessMessage>();
export type SuccessMessage = {
  message: string;
  description: string;
};

const mutationPrefixes: { graphcmsPrefix: string; mappingMessage: string }[] = [
  {
    graphcmsPrefix: 'sync.ts.ts',
    mappingMessage: 'created',
  },
  {
    graphcmsPrefix: 'update',
    mappingMessage: 'updated',
  },
  {
    graphcmsPrefix: 'delete',
    mappingMessage: 'deleted',
  },
  {
    graphcmsPrefix: 'upsert',
    mappingMessage: 'upserted',
  },
];

const getSuccessMessage = (operationName: string) => {
  if (operationName === '') {
    return 'Unknown action executed successfully';
  }
  for (const prefix of mutationPrefixes) {
    if (operationName.includes(prefix.graphcmsPrefix)) {
      // is Mutation
      return `${operationName.replace(prefix.graphcmsPrefix, '')} ${
        prefix.mappingMessage
      } successfully`;
    }
  }
  return null;
};

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || '',
    },
  });
  return forward!(operation).map((data: FetchResult) => {
    const successMessage = getSuccessMessage(operation.operationName || '');
    if (successMessage) {
      responseSubject.next({
        message: successMessage,
        description: '',
      });
    }
    return data;
  });
});

export const errorSubject = new Subject<GraphQLError>();

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.map(graphQLError => {
        errorSubject.next(graphQLError);
      });
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
    return forward(operation);
  },
);

const httpLink = createHttpLink({ uri: 'http://localhost:4000/graphql' });

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

cache.writeData({
  data: {
    ...configState.defaults,
    ...sidebarState.defaults,
    ...gridState.defaults,
    ...componentState.defaults,
    ...modelState.defaults,
  },
});

export const apolloConfig: ApolloClientOptions<any> = {
  link,
  cache,
  resolvers: apolloLocalState.resolvers,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
};
