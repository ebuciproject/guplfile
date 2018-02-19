var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require('del');

gulp.task('sass', function() {
  return gulp.src('app/sass/main.sass')
    .pipe(sass({outputStyles: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/sass/**/*.sass', ['sass']);
});

gulp.task('clear', function() {
  del.sync('build');
});

gulp.task('build', ['sass', 'clear'], function() {
  var html = gulp.src('app/**/*.html').pipe(gulp.dest('build'));
  var css = gulp.src('app/css/main.css').pipe(gulp.dest('build/css'));
  var fonts = gulp.src('app/fonts/**/*.*').pipe(gulp.dest('build/fonts'));
  var img = gulp.src('app/img/**/*.*')
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }));
});