'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var jade = require('gulp-jade');
var rename = require("gulp-rename");
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('autoprefixer');
var server = require("browser-sync").create();
var csscomb = require('gulp-csscomb');
var run = require("run-sequence");
var del = require("del");

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/*.{woff,woff2}",
    "src/img/**",
    "src/js/*.js",
  ], {
    base: "./src"
  })
    .pipe(gulp.dest("build"));
});

// JADE
gulp.task('jade', function() {
  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    // .pipe(connect.reload())
    // .pipe(notify('html was changed'));
});

gulp.task("serve", function() {
  server.init({
    server: "build/"
  });

  gulp.watch("src/stylus/**/*.styl", ["style"]);
  gulp.watch("src/jade/*.jade", ["jade"]);
});
// Слежка
gulp.task('watch', ['style', 'jade'], function () {
  // gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/jade/*.jade'], ['jade']);
  gulp.watch(['./src/jade/blocks/*.jade'], ['jade']);
  gulp.watch(['./src/stylus/*.styl'], ['styl']);
  gulp.watch(['./src/stylus/bloсks/*.styl'], ['styl']);
  gulp.watch(['./src/js/*.js'], ['js']);
  // gulp.watch('./src/css/*.css', ['notify']);
});

gulp.task('beautify', function () {
  return gulp.src('./src/**/*.styl')
    .pipe(csscomb())
    .pipe(gulp.dest('./src/stylus'));
});

gulp.task('style', function() {
  gulp.src('./src/stylus/*.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions']}),
    ]))
    .pipe(csscomb())
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(server.stream());
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*.{png, jpg, gif}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest('build/img'));
});

//Очистка
gulp.task("clean", function() {
  return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "jade",
    fn
  );
});
