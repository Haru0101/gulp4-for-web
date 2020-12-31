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
            .pipe(gulp.dest("pre-autoprefixer"))
        );
    });
});