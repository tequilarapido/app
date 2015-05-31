var
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  wrapper = require('gulp-wrapper'),
  jshint = require('gulp-jshint'),
  config = require('../config.json'),
  version = require('../../package.json').version;

function banner() {
  return ''
    + '/**\n'
    + ' * tequilarapido-app.js v' + version + '\n'
    + ' * (c) ' + new Date().getFullYear() + ' tequilarapido.\n'
    + ' */\n';
}

gulp.task('scripts', function () {
  gulp.src(config.files)
    .pipe(jshint())
    .pipe(concat('tequilarapido-app.js'))
    .pipe(wrapper({header: banner()}))
    .pipe(gulp.dest(config.distDir))
});
