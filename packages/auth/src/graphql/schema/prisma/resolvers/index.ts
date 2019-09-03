import { mergeResolvers } from 'merge-graphql-schemas';
import prismaResolvers from './prisma.resolvers';
import userResolvers from './user.resolvers';

// import { fileLoader } from 'merge-graphql-schemas';
// import * as path from 'path';

const resolvers = [userResolvers, prismaResolvers];

/*  AUTOMATED APPROACH: Put your resolvers anywhere
 with ".resolvers.[js/ts]" naming convention */
// const resolvers: {} = fileLoader(path.join(__dirname, './**/*.resolvers.*'));

export default mergeResolvers(resolvers);
