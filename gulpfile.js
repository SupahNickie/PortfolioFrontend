var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();

var paths = {
  scripts: [
    './src/app.run.js',
    './src/**/*.js'
  ],
  css: [
    './src/*.css',
    './src/**/*.css'
  ]
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('./scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(concat('./styles.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('run', ['watch', 'scripts', 'css', 'browser-sync'], function () {
  gulp.watch("src/**/*.html").on('change', bs.reload);
  gulp.watch("src/*.html").on('change', bs.reload);
  gulp.watch("src/**/*.js").on('change', bs.reload);
  gulp.watch("src/*.js").on('change', bs.reload);
  gulp.watch("src/**/*.css").on('change', bs.reload);
  gulp.watch("src/*.css").on('change', bs.reload);
});


