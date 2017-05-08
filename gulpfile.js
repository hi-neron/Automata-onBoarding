// main gulp module
const gulp = require('gulp')

// a bundler module, like browserify / on this case, it use for js
const webpack = require('webpack-stream')

// A Gulp plugin for passing through only
// those source files that are newer than
// corresponding destination files. / src: npm page.
const newer = require('gulp-newer')

// to use sass gulp engine
const sass = require('gulp-sass')

// browser sync, this activate realtime develop
var browserSync = require('browser-sync').create()

// tasks start

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  gulp.watch('src/*.html', ['html'])
  gulp.watch('src/sass/*.scss', ['sass'])
  gulp.watch('src/**/**/*.js', ['js'])
  gulp.watch('src/img/*', ['images'])
})


gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(webpack({
      module: {
        loaders: [{
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['env']
          }
        }]
      },
      output: {
        filename: 'app.js'
      }
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('images', function () {
  return gulp.src('./src/img/*.*')
    .pipe(newer('./public/img'))
    .pipe(gulp.dest('./public/img'))
    .pipe(browserSync.stream())
})

gulp.task(
  'default',
  ['browserSync',
   'html',
   'js',
   'sass',
   'images',
  ]
)
