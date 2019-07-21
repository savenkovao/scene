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
  // livereload = require('gulp-livereload'),
  // hash_src = require('gulp-hash-src'),
  // htmlmin = require('gulp-htmlmin'),
  runSequence = require('run-sequence'),
webserver = require('gulp-webserver');

// gulp.task('webserver', function() {
//   gulp.src('')
//     .pipe(webserver({
//       host: '0.0.0.0',
//       // livereload: true,
//       directoryListing: false,
//       open: true,
//       fallback: 'index.html'
//     }));
// });

require('any-promise/register')('bluebird');

// livereload({start : true});

let origSrc = gulp.src,
  PUBLIC_DIR = './public',
  path = {
    scripts : ['js/**/*.js'],
    less : ['styles/style.less'],
    fonts : ['fonts/**/*.*'],
    img : ['img/**/*.*']
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
  return helpers.es6toes5('js/index.js', 'index.js')
    // .pipe(livereload());
});

gulp.task('script-concat', ['script'], function () {
  return gulp.src([PUBLIC_DIR + '/js/index.js'])
    .pipe(concat('index.js'))
    .pipe(gulp.dest(PUBLIC_DIR + '/js'));
});

gulp.task('script-min', ['script-concat'], () => {
  return gulp.src([PUBLIC_DIR + '/js/index.js'])
    .pipe(minify({
      mangle : false,
      drop_debugger : true,
      drop_console : true,
      evaluate : true,
      unsafe : false
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
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest(PUBLIC_DIR + '/css'))
    // .pipe(livereload());
});

// gulp.task('hash', function () {
//   return gulp.src(['./html/index.html'])
//     .pipe(hash_src({
//       build_dir : './',
//       src_path : './html',
//       hash_len : 5,
//       exts : ['.js', '.css'],
//       query_name : 'v'
//     }))
//     .pipe(htmlmin({
//       collapseWhitespace : true,
//       removeComments : true
//     }))
//     .pipe(gulp.dest('./'))
//     // .pipe(livereload());
// });

gulp.task('watch', function () {
  // livereload.listen();
  gulp.watch('js/**/*.js', ['script']);
  gulp.watch('styles/**/*.less', ['less']);
  // gulp.watch('./html/index.html', ['hash']);
});

gulp.task('default', function (callback) {
  runSequence('script-concat', 'less', 'fonts', 'img'/*, 'hash'*/, 'watch'/*, 'webserver'*/, callback);
});

gulp.task('prod', function (callback) {
  runSequence('script-min', 'less', 'fonts', 'img'/*, 'hash'*/, callback);
});

