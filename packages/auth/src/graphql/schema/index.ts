import { mergeSchemas } from 'graphql-tools';
import graphcmsSchema from 'src/graphql/schema/graphcms';
import prismaSchema from 'src/graphql/schema/prisma';
import { stitchSchema } from 'src/graphql/schema/stitch';
import { stitchResolvers } from 'src/graphql/schema/stitch/stitch.resolvers';

const schema = async () =>
  mergeSchemas({
    /**
     * We load all schema required for stitchResolvers, which is entire app
     */
    schemas: [await graphcmsSchema(), prismaSchema, stitchSchema],
    /**
     * Stitch App & User together
     */
    resolvers: stitchResolvers,
  });

export default schema;
