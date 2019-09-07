"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var server = require("browser-sync").create();

gulp.task("style", function () {
  return gulp.src("source/sass/**/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/images/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/images"));
});

gulp.task("webp", function () {
  return gulp.src("source/images/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/images"));
});

gulp.task("sprite", function(){
  return gulp.src("source/images/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/images"));
});

gulp.task("html", function(){
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false
  });
  gulp.watch("source/sass/**/*.scss", gulp.series("style"))
  gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/images/**",
      "source/js/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

// General tasks

var build = gulp.series("clean", "copy", gulp.parallel("style", "images", "webp", "sprite", "html"));

exports.build = build;
