var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');
var config = require('./build/config.json');

// Load tasks
requireDir('./build/tasks');

// Build task
gulp.task('build', function () {
  runSequence('clean', 'scripts');
});

// Watch
gulp.task('watch', function () {
  gulp.watch(config.files, ['clean', 'scripts']);
});

// Default
gulp.task('default', ['watch', 'build']);

