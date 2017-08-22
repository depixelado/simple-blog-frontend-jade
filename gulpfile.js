const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', () =>
  gulp.src(['assets/scss/**/*.scss', '!assets/scss/**/_*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/public/css'))
);

gulp.task('default', ['sass']);
