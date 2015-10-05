var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');

gulp.task("sass", function() {
    return gulp.src("src/*.scss")
    .pipe(sass())
    .pipe(pleeease())
    .pipe(gulp.dest("dist/"));
});

gulp.task("default", ['sass'], function() {
    gulp.watch("src/*.scss", ['sass']);
});
