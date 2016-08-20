// 引入gulp
var gulp = require("gulp");

// 引入组件
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var imagemin = require("gulp-imagemin");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

// css 任务
gulp.task("styles", function () {
    gulp.src("src/css/*.css")
        .pipe(concat("style.css"))
        .pipe(minifycss())
        .pipe(rename({ suffix: ".min"}))
        .pipe(gulp.dest("dist/css/"));
});

// 脚本
gulp.task("scripts", function () {
    gulp.src("src/js/*.js")
        .pipe(rename({ suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

// 图片压缩
gulp.task("imgmin", function () {
    var options = {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    };
    gulp.src("src/img/*")
        .pipe(imagemin(options))
        .pipe(gulp.dest("dist/img/"));
});

// 监听文件变化
gulp.task("watch", ["styles", "scripts", "imgmin"], function () {
    // 监听所有的css文件
    gulp.watch("src/css/*.css", ["styles"]);
    // 监听所有的img图片
    gulp.watch("src/img/*", ["imgmin"]);
    // 监听所有的js
    gulp.watch("src/js/*.js", ["scripts"]);
});

// 实时更新视图，自动刷新页面
gulp.task("server", ["watch"], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("dist/**/*.*").on("change", browserSync.reload);
});

// 默认任务
gulp.task("default", ["server"]);
