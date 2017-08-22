const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

/**
 * @author Daniel Jimenez <jimenezdaniel87@gmail.com>
 * @function clean
 * @description Clean dist folder 
 */
gulp.task('clean', () =>
  gulp.src(
    // Sources to empty/remove
    [
      'dist/**/*',
      './dist',
    ],
    {
      read: false,
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
    // Process Sass files
    .pipe(sass())
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
 * @function default
 * @description Execute a list of tasks by default
 */
gulp.task('default', [
  'clean',
  'sass',
  'sass:watch',
]);
