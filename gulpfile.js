'use strict';

const fs = require('fs');
const fsx = require('fs-extra');
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');

var distDir = path.join(__dirname, 'build');

/**
 * Build the application
 */
gulp.task('build', ['transpile']);

/**
 * Transpile the application
 */
gulp.task('transpile', ['clean'], function() {
  return gulp.src([
      'src/**/*'
    ])
    .pipe(babel())
    .pipe(gulp.dest(distDir));
});

/**
 * Clean the environment
 */
gulp.task('clean', function() {
  fsx.removeSync(distDir);
});
