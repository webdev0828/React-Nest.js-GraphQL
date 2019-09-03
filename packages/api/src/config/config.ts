const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

export default {
  db: process.env.MONGO_ENDPOINT,
  graphql_endpoint: process.env.GRAPHQL_ENDPOINT,
  port: process.env.API_PORT,
  dataDir: path.resolve(__dirname, '../data'),
  jwtSecret: process.env.JWT_SECRET,
};
