// gulpの読み込み  
const gulp = require("gulp");
// gulp-sassの読み込み  
const sass = require("gulp-sass");

// scssに変更があるたびにコンパイルを行う  
gulp.task("watch-scss", function () {
    // 監視するファイル  
    return gulp.watch("scss/common.scss", function () {
        return (
            gulp
            .src("scss/common.scss")
            .pipe(
                sass({
                    // 出力スタイルを指定
                    outputStyle: "compact"
                })
                .on("error", sass.logError)
            )
            // コンパイル後のcssファイルの出力先  
            .pipe(gulp.dest("pre-autoprefix"))
        );
    });
});

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.task("autopre", function () {
  return gulp.watch('pre-autoprefixer/common.css', function () {
    return gulp.src("pre-autoprefixer/common.css")
      .pipe(postcss([
        autoprefixer({
          cascade: false
        })
      ]))
      .pipe(gulp.dest("css"));
  });
});

