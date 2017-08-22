const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function clean
 * @description Delete dist folder 
 */
gulp.task('clean', () =>
  gulp.src(
    // Sources to empty/remove
    [
      './dist',
    ],
    {
      read: false,
      force: true,
    }
  )
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(clean())
    .pipe(plumber.stop())
    .pipe(notify('Dist folder deleted.'))
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function sass
 * @description Process SCSS files into CSS
 */
gulp.task('sass', () =>
  gulp.src([
    // Files to include
    'assets/scss/**/*.scss',
    // Files to omit
    '!assets/scss/**/_*.scss',
  ])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    // Init sourcemaps
    .pipe(sourcemaps.init())
    // Process Sass files
    .pipe(sass(
      {
        includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/']
      }
    ))
    // Write sourcemaps
    .pipe(sourcemaps.write())
    // Stop plumber
    .pipe(plumber.stop())
    .pipe(notify({ message: 'CSS Generated', onLast: true }))
    // Generated files destination source
    .pipe(gulp.dest('dist/public/css'))
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function sass:watch
 * @description Executes sass task when scss files are changed
 */
gulp.task('sass:watch', () =>
  gulp.watch('assets/scss/**/*.scss', ['sass'])
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function babel
 * @description Transpile javascript code throught babel
 */
gulp.task('babel', () =>
  gulp.src(
    [
      './src/**/*.js',
      '!gulpfile.js',
    ]
  )
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(plumber.stop())
    .pipe(notify({ message: 'JS Transpiled', onLast: true }))
    .pipe(gulp.dest('dist'))
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function babel:watch
 * @description Executes babel task when js files are changed
 */
gulp.task('babel:watch', () =>
  gulp.watch(
    [
      './src/**/*.js',
      '!gulpfile.js',
    ],
    [
      'babel',
    ]
  )
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function copy
 * @description Copy necessary files for running into dist folder
 */
gulp.task('copy', () =>
  gulp.src(
    [
      './src/views/**/*',
    ]
  )
    .pipe(gulp.dest('./dist/views'))
    .pipe(notify({ message: 'Files copied', onLast: true }))
);


/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function copy:watch
 * @description Copy necessary files for running into dist folder when something change
 */
gulp.task('copy:watch', () =>
  gulp.watch(
    [
      './src/views/**/*',
    ],
    [
      'copy',
    ]
  )
);

gulp.task('run', () => 
  nodemon(
    {
      script: 'dist/server.js',
      ext: 'js jade',
    }
  )
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function dev
 * @description Executes all required gulp task for development
 */
gulp.task('dev', [
  'copy',
  'copy:watch',
  'sass',
  'sass:watch',
  'babel',
  'babel:watch',
  'run',
]);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function default
 * @description Execute a list of tasks by default (Dev mode)
 */
gulp.task('default', ['dev']);
