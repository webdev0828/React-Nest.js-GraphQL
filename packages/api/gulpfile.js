const gulp = require('gulp')
var exec = require('child_process').exec

gulp.task('copy-schema', function() {
  return gulp
    .src('./apollo/schema/*.graphql')
    .pipe(gulp.dest('./dist/server/apollo/schema'))
})

const schemaWatcher = gulp.watch('./apollo/schema/*.graphql', ['copy-schema'])

schemaWatcher.on('change', event => {
  // console.log('on change')
  exec('npm run watch-node')
})
