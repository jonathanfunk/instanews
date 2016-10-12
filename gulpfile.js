var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint');

gulp.task('uglify', function(){//Runs a task that we named default
    gulp.src('./js/*.js')// Files gulp will work with
      .pipe(plumber())
      .pipe(uglify()) //Minifies
      .pipe(rename({ extname: '.min.js' })) //Changes name to .min.js
      .pipe(gulp.dest('./build/js')) //Takes everything and puts them in build/js?
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.css").on('change', browserSync.reload);//Keep this inside browser-sync function

});

gulp.task('lint', function() {
  return gulp.src('js/*.js').pipe(eslint())
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});


gulp.task('default', ['browser-sync', 'uglify', 'lint']);
