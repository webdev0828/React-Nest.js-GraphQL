import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

/**
 * Don't use resolvers for schema
 */
const prismaSchema = makeExecutableSchema({ typeDefs, resolvers });

export const prismaSchemaOnly = makeExecutableSchema({ typeDefs });

export default prismaSchema;
