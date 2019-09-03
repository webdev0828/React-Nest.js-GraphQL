import graphcmsSchema from 'src/graphql/schema/graphcms';

export const stitchResolvers = {
  User: {
    app: {
      // fragment: `... on User { id }`,
      async resolve(user, args, context, info) {
        console.log(args);
        console.log(context);
        console.log(info);
        return info.mergeInfo.delegateToSchema({
          context,
          info,
          args: {
            where: {
              userId: user.username,
              ...args.where,
            },
          },
          // schema: await mergedSchemas(),
          schema: await graphcmsSchema(),
          operation: 'query',
          fieldName: 'app',
        });
      },
    },
    apps: {
      // fragment: `... on User { id }`,
      async resolve(user, args, context, info) {
        console.log(user);
        console.log(args);
        return info.mergeInfo.delegateToSchema({
          context,
          info,
          args: {
            where: {
              userId: user.username,
              ...args.where,
            },
          },
          // schema: await mergedSchemas(),
          schema: await graphcmsSchema(),
          operation: 'query',
          fieldName: 'apps',
        });
      },
    },
  },
};
