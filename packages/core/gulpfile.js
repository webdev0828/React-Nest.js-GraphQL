const run = require('gulp-run');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const yaml = require('js-yaml');
const fs = require('fs');
const { watch, series, gulp } = require('gulp');
const { remove } = require('lodash');
const del = require('del');

const endpoint =
  'https://api-uswest.graphcms.com/v1/cjj7mi1rj05uo01cm6q486ov1/master';

const watchedFiles = 'src/models/**/*.graphql';

/**
 * Generate Typescript from GraphQL endpoint
 */
function generateGraphqlTypes() {
  return run(
    `apollo client:codegen __generated__ --endpoint ${endpoint} --target=typescript --includes ${watchedFiles}`,
  )
    .exec()
    .on('error', gutil.log);
}

function downloadGraphqlSchema() {
  return run(`apollo schema:download --endpoint ${endpoint} schema.json
  `)
    .exec()
    .on('error', gutil.log);
}

function clearBabelCache(done) {
  del.sync(['./node_modules/.cache/babel-loader']);
  done();
  return process.exit();
}

watch([watchedFiles], series(generateGraphqlTypes));
function defaultTask() {}

exports.clearBabelCache = clearBabelCache;
exports.generateGraphqlTypes = generateGraphqlTypes;
exports.downloadGraphqlSchema = downloadGraphqlSchema;
exports.default = defaultTask;
