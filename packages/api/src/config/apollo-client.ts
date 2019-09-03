import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import config from 'src/config/config';

export const link = new HttpLink({
  uri: config.graphql_endpoint,
  fetch: fetch as any,
});
