import { makeExecutableSchema } from 'graphql-tools';

const models = [
  {
    id: '1',
    name: 'Test Model',
  },
];

const typeDefs = `
  type Model {
    id: String
    name: String
  }

  type Query {
    models: [Model] 
  }

  type Mutation {
    createModel(name: String!): Model
  }
`;

const resolvers = {
  Query: {
    models: () => models,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
