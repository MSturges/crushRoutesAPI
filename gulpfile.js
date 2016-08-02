const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')


gulp.task('start', () => {
  nodemon({
    script: './bin/www'
  })
})

gulp.task('sass', () => {

  gulp.src('./public/style/sass/style.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  })).on('error', sass.logError)
  .pipe(gulp.dest('./public/style/css'))

})

gulp.task('watch', () => {
  gulp.watch('./public/style/sass/**/*.scss', ['sass'])
})

gulp.task('default', ['start', 'sass', 'watch'])
