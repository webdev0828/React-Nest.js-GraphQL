import { makeExecutableSchema } from 'graphql-tools';
import schemaFile from 'graphql/schema.json';
import { buildClientSchema, printSchema } from 'graphql/utilities';

/**
 * Create Schema
 */
// const schemaString = `
//     type Query {
//       listModels: [Model]
//     }
//     type Model { id: ID, name: String }
// `;
// const schema = makeExecutableSchema({ typeDefs: schemaString });

const { __schema } = (schemaFile as any).data;
// tslint:disable-next-line
const schemaSDL = printSchema(buildClientSchema({ __schema }));
const schema = makeExecutableSchema({
  typeDefs: schemaSDL,
});

export default schema;
