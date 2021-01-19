// gulpの読み込み  
const gulp = require("gulp");
// gulp-sassの読み込み  
const sass = require("gulp-sass");

// scssに変更があるたびにコンパイルを行う  
gulp.task("watch-scss", function () {
  // 監視するファイル  
  return gulp.watch("src/scss/common.scss", function () {
    return (
      gulp
      .src("src/scss/common.scss")
      .pipe(
        sass({
          // 出力スタイルを指定
          outputStyle: "compact"
        })
        .on("error", sass.logError)
      )
      // コンパイル後のcssファイルの出力先  
      .pipe(gulp.dest("src/pre-autoprefix"))
    );
  });
});

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("watch-autoprefix", function () {
  return gulp.watch('src/pre-autoprefix/common.css', function () {
    return gulp.src("src/pre-autoprefix/common.css")
      .pipe(postcss([
        autoprefixer({
          cascade: false
        })
      ]))
      .pipe(gulp.dest("src/css"));
  });
});


const babel = require("gulp-babel");

gulp.task('watch-babel', function () {
  return gulp.watch('src/es6/*.es6', function () {
    return (
      gulp.src('src/es6/*.es6')
      .pipe(babel({
        presets: ["@babel/preset-env"]
      }))
      .pipe(gulp.dest('src/js'))
    )
  });
});


const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const changed = require('gulp-changed');
const notify = require('gulp-notify');

gulp.task('watch-imagemin', () => {
  gulp.watch('src/img' + '/**/*', () => {
    // src/imgフォルダ以下にある画像ファイルを圧縮
    // 想定している拡張子は.png、.jpg、.gif
    return gulp.src('src/img' + '/**/*.{png,jpg,gif}')
      // src/imgフォルダと、public/imgフォルダを比較して異なる画像ファイル（新規追加や変更）だけを圧縮の対象にする
      .pipe(changed('public/img'))
      // 圧縮の処理開始
      .pipe(imagemin([
        // PNGの画質の設定 0〜100まで幅を持って指定可能
        // 数字が大きいほど画質を高く保てる
        pngquant([
          '65-80',
          1,
          0
        ]),
        mozjpeg({
          // jpg、jpegｍｐ画質の設定
          // 0から100まで指定できるが、PNGと違って幅を持って指定はできない
          quality: 85,
          // baselineとprogressiveがある
          // baselineよりprogressiveのほうがエンコードは遅いが圧縮率は高い
          progressive: true
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
      ]))
      // public/imgファイルに圧縮後の画像を保存
      .pipe(gulp.dest('public/img'))
  })
});


gulp.task('default', gulp.parallel('watch-scss', 'watch-autoprefix', 'watch-babel', 'watch-imagemin'));