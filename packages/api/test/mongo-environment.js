// import { mongooseConnect } from './helpers/mongo-test-helpers';
const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const globalConfigPath = path.join(__dirname, 'globalConfig.json');

// const globalConfig = require('./globalConfig.json');

/**
 * Create our own custom environment & do our setup/teardown here.
 *
 * We can also set global variables to be used across test suites.
 *
 */
class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();

    // Start Mongo server
    this.mongoServer = new MongoMemoryServer();
    const mongoUri = await this.mongoServer.getConnectionString();

    // Write global config to disk because all tests run in different contexts.
    // We use config info to connect to Mongoose before each test.
    const mongoConfig = {
      mongoDBName: 'jest',
      mongoUri,
    };
    fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  }

  async teardown() {
    await super.teardown();

    await this.mongoServer.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
