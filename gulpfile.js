let gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    copy = require('gulp-contrib-copy'),
    autoprefixer = require('gulp-autoprefixer'),
    helpers = require('./gulp.helpers'),
    minify = require('gulp-babel-minify'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    es = require('event-stream');

require('any-promise/register')('bluebird');

let origSrc = gulp.src,
    PUBLIC_DIR = './public',
    path = {
      scripts: ['src/js/**/*.js'],
      less: ['src/styles/style.less'],
      fonts: ['src/fonts/**/*.*'],
      img: ['src/img/**/*.*']
    };

gulp.src = function () {
  return helpers.fixPipe(origSrc.apply(this, arguments));
};

gulp.task('fonts', function () {
  return gulp.src(path.fonts)
      .pipe(copy())
      .pipe(gulp.dest(PUBLIC_DIR + '/fonts'));
});

gulp.task('img', function () {
  return gulp.src(path.img)
      .pipe(imagemin())
      .pipe(gulp.dest(PUBLIC_DIR + '/img'));
});

gulp.task('script', function () {
  let files = [
    './src/js/Pages/index.js',
    './src/js/Pages/scenes-list.js',
  ];
  var tasks = files.map(function (entry) {
    return helpers.es6toes5(entry)
  });

  // return es.merge.apply(null, tasks);
});

// gulp.task('script-concat', ['script'], function () {
//   return gulp.src([PUBLIC_DIR + '/js/index.js'])
//       .pipe(concat('index.js'))
//       .pipe(gulp.dest(PUBLIC_DIR + '/js'));
// });

gulp.task('script-min', ['script'], () => {
  return gulp.src([PUBLIC_DIR + '/js/*.js'])
      .pipe(minify({
        mangle: false,
        drop_debugger: true,
        drop_console: true,
        evaluate: true,
        unsafe: false
      }))
      .pipe(gulp.dest(PUBLIC_DIR + '/js'));
});

gulp.task('less', function () {
  return gulp.src(path.less)
      .pipe(concat('app.css'))
      .pipe(less())
      .pipe(autoprefixer([
        'Firefox > 20',
        'Safari > 8',
        'iOS > 7',
        'ie > 8'
      ]))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(PUBLIC_DIR + '/css'))
});


gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['script']);
  gulp.watch('src/styles/**/*.less', ['less']);
});

gulp.task('default', function (callback) {
  runSequence('script', 'less', 'fonts', 'img', 'watch', callback);
});

gulp.task('prod', function (callback) {
  runSequence('script-min', 'less', 'fonts', 'img', callback);
});

