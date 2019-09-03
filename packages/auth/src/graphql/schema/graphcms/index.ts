import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';

const fetch = require('node-fetch');

const graphcmsLink = setContext(request => ({
  headers: {
    // 'Authorization': `Bearer ${GITHUB_TOKEN}`,
  },
})).concat(new HttpLink({ fetch, uri: process.env.GRAPHCMS_ENDPOINT }));

const graphcmsSchema = async () => {
  const graphcmsRemoteSchema = await introspectSchema(graphcmsLink);

  const graphcmsSchema = makeRemoteExecutableSchema({
    schema: graphcmsRemoteSchema,
    link: graphcmsLink,
  });

  return graphcmsSchema;
};

export default graphcmsSchema;
