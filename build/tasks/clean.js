var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config.json');

gulp.task('clean', function (cb) {
  return rimraf(config.distDir, cb);
});
