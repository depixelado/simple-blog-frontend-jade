const babel = require('gulp-babel');
const clean = require('gulp-clean');
const gulp = require('gulp');
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
    .pipe(clean())
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
    // Init sourcemaps
    .pipe(sourcemaps.init())
    // Process Sass files
    .pipe(sass())
    // Write sourcemaps
    .pipe(sourcemaps.write())
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
      './**/*.js',
      '!gulpfile.js',
    ]
  )
    .pipe(babel({
      presets: ['es2015'],
    }))
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
      './**/*.js',
      '!gulpfile.js',
    ],
    [
      'babel'
    ]
  )
);

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function default
 * @description Execute a list of tasks by default
 */
gulp.task('default', [
  'sass',
  'sass:watch',
  'babel',
  'babel:watch'
]);
