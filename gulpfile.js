const gulp = require('gulp');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sprite = require('gulp.spritesmith');
const concat = require('gulp-concat');

// 1. html 压缩工具
// gulp-htmlmin
// $ cnpm i gulp-htmlmin -D
gulp.task('htmlmin', () => {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist/html'));
});


// 2. less 编译工具
// gulp-less
// $ cnpm i gulp-less -D
gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./src/css'));
});

// 3. css 压缩
// gulp-cssmin
// $ cnpm i gulp-cssmin -D

gulp.task('cssmin', () => {
  return gulp.src('./src/css/**/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'));
});

// 4. js  压缩
// gulp-uglify
// $ cnpm i gulp-uglify -D
gulp.task('jsmin', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
});


// 5. 图片压缩
// gulp-imagemin
// $ cnpm i gulp-imagemin@7.1.0 -D

gulp.task('imagemin', () => {
  return gulp.src('./src/img/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});


// 6. 精灵图
// gulp.spritesmith
// $ cnpm i gulp.spritesmith -D

gulp.task('sprite', () => {
  return gulp.src('./dist/img/*.png')
    .pipe(sprite({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }))
    .pipe(gulp.dest('./dist/css'));
});

// 7. 文件合并
// gulp-concat
// $ cnpm i gulp-concat -D

gulp.task('concatjs', () => {
  return gulp.src(['./src/js/jquery.js', './src/js/index.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/js'));
});

// ---------------------------------------------
// gulp.watch() 监听文件

gulp.task('watchless', () => {
  gulp.watch('./src/less/**/*.less', gulp.series('less'));
});

// 8. 自动项目构建
gulp.task('dev', () => {
  gulp.watch(
    ['./src/less/**/*.less', './src/html/*.html', './src/js/**/*.js'],
    gulp.series('htmlmin', 'concatjs', 'less', 'cssmin', 'jsmin')
  );
});