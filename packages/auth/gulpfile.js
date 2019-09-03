const del = require('del');

function clearBabelCache(done) {
  del.sync(['./node_modules/.cache/babel-loader']);
  done();
  return process.exit();
}

exports.clearBabelCache = clearBabelCache;
