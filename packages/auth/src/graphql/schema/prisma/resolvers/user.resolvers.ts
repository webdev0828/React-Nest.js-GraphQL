import { forwardTo } from 'prisma-binding';

const {
  ApolloServer,
  AuthenticationError,
  UserInputError,
} = require('apollo-server');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default {
  Query: {
    user: forwardTo('db'),
    // user: (parent, { where }, ctx) => {
    //   return ctx.prisma.user(where);
    // },
    me: (parent, args, ctx) => {
      console.log('me!');
      const { user } = ctx;
      return user;
    },
  },
  Mutation: {
    register: async (parent, args, ctx) => {
      const hash: string = await bcrypt.hash(args.data.password, 10);

      const data = {
        username: args.data.username,
        password: hash,
      };

      let user;
      try {
        user = await ctx.prisma.createUser({ ...data });
      } catch (e) {
        console.log(e);
        throw new AuthenticationError('Username has already been taken.');
      }

      return {
        user,
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
      };
    },
    login: async (parant, args, ctx) => {
      const {
        data: { username, password },
      } = args;

      const user = await ctx.prisma.user({ username });

      if (!user) {
        throw new AuthenticationError(
          `Username and password combination is incorrect.`,
        );
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError(
          `Username and password combination is incorrect.`,
        );
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );

      return {
        token,
        user,
      };
    },
    logout: (parent, args, ctx) => {
      return true;
    },
  },
};
