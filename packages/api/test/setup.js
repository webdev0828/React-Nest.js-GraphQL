const path = require('path');

const fs = require('fs');

const { MongoMemoryServer } = require('mongodb-memory-server');

const globalConfigPath = path.join(__dirname, 'globalConfig.json');

const mongod = new MongoMemoryServer({
  autoStart: false,
});


module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }
  const mongo_uri = await mongod.getConnectionString();
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: mongo_uri,
  };
  // Not works
  global.__MONGOD_URI__ = mongo_uri;
  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
};
