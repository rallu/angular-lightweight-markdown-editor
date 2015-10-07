var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var ngModuleInject = require('gulp-angular-inject-module');
var gulpAngularExtender = require('gulp-angular-extender');
var gulpif = require("gulp-if");
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var del = require('del');
var base64 = require('gulp-base64');
var jshint = require('gulp-jshint');

gulp.task("sass", function() {
    return gulp.src("src/angular-markdown-editor.scss")
    .pipe(sass())
    .pipe(pleeease())
    .pipe(gulp.dest("dist/"));
});

gulp.task("base64fonts", ['sass'], function() {
    return gulp.src('dist/angular-markdown-editor.css')
        .pipe(base64({
            baseDir: "src"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ['base64fonts', 'templateCache', 'js', 'cleanAfterBuild'], function() {
    gulp.watch("src/*.scss", ['base64fonts']);
    gulp.watch(["src/**/*.html", "src/**/*.js"], ['templateCache', 'js', 'cleanAfterBuild']);
});

gulp.task("templateCache", function() {
    return gulp.src('src/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        addRootSlash: false,
        removeCommens: true
    }))
    .pipe(templateCache({
        module: "angular-markdown-editor-templates",
        root: "",
        standalone: true
    }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("hint", function() {
    return gulp.src(["src/**/*.js"])
    .pipe(jshint())
});

gulp.task("js", ["templateCache", "hint"], function() {
    var angularExtenederOptions = {};
    angularExtenederOptions["angular-markdown-editor"] = ["angular-markdown-editor-templates"];

    return gulp.src(["dist/templates.js", "src/**/*.js"])
    .pipe(gulpif(/(.*)angular-markdown-editor\.js/, gulpAngularExtender(angularExtenederOptions)))
    .pipe(concat("angular-markdown-editor.min.js"))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("cleanAfterBuild", ["js"], function() {
    return del([
        'dist/templates.js'
    ]);
});

gulp.task("release", ['base64fonts', 'templateCache', 'js', 'cleanAfterBuild']);
