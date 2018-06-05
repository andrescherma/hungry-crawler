

var gulp = require('gulp'),
      pjson = require('./package.json'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      plumber = require('gulp-plumber'),
      pixrem = require('gulp-pixrem');


var paths = {
	css: '/src/css',
	sass: 'src/sass',
};

// Styles autoprefixing and minification
gulp.task('styles', function() {
  return gulp.src(paths.sass + '/project.scss')
    .pipe(sass({
      includePaths: [
        paths.sass,
      ]
    }).on('error', sass.logError))
    .pipe(plumber()) // Checks for errors
    .pipe(autoprefixer({browsers: ['last 2 versions']})) // Adds vendor prefixes
    .pipe(pixrem())  // add fallbacks for rem units
    .pipe(gulp.dest(paths.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano()) // Minifies the result
    .pipe(gulp.dest(paths.css));
});


// Watch
gulp.task('watch', function() {

  gulp.watch(paths.sass + '/**/*.scss', ['styles']);

});