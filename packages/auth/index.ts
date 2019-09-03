const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

import { prisma } from '__generated__/prisma-client';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import AuthDirective from 'src/graphql/directives/auth';
import schema from 'src/graphql/schema';

const exec = require('child_process').exec;
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Attach context to resolvers
 */
const context = async ({ req, res }) => {
  const token: string = req.headers.authorization;
  let user;

  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(id);
    user = await prisma.user({ id });
  } catch (e) {
    // console.log(e);
  }

  const db = new Prisma({
    typeDefs: 'src/graphql/typeDefs/prisma.schema.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
  });

  return { req, res, prisma, db, user };
};

async function startServer() {
  /**
   * Create server
   */
  const server = new ApolloServer({
    context,
    schemaDirectives: {
      auth: AuthDirective,
    },
    schema: await schema(),
  });

  const app = express();

  // const corsOptions = {
  //   origin: '*',
  //   credentials: true,
  // };
  app.use(cors());
  // app.options('*', cors());
  // app.use(passport.initialize());

  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  return await app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
}

/**
 * Start server
 */
startServer()
  .then(() => {
    // These scripts depend on the endpoint
    exec('yarn --cwd ../core generate:graphql-api');
  })
  .catch(e => {
    console.log(e);
  });
