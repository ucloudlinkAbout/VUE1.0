'use strict';

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    rename = require('gulp-rename'),
    del = require('del'),
    ukwatch = require('gulp-font-translate'),
    csslint = require('gulp-csslint'),
    eslint = require('gulp-eslint'),
    lesshint = require('gulp-lesshint'),
    plumber = require('gulp-plumber'),
    config = require('./webpack.config'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

var path = {
    jsPath:[
        'src/views/biz/**/*.js',
        'src/views/index.vue',
        'src/views/login.vue',
        'src/views/serviceComInstance/**/*.vue',
        'src/views/page/**/*.vue',
        'src/libs/base/*.js',
        'src/main.js',
        'src/routers.js',
        'src/filters.js'
    ],
    lessPath:'src/views/assets/less/*.less',
    cssPath:'src/views/assets/css/*.css',
    libsJsPath:'src/libs/base/**/*.js',
    //jquery 插件源文件
    jqueryPluginPath:'src/libs/jquery/**/*.js',
    //jquery 插件输出文件夹
    jqueryPluginOutputPath:'dist',
    //jquery 插件输出文件名
    jqueryPluginOutputName:'jqueryPlugin.js',
    libsJsTestPath:'test/src',
    lanJsTestPath:'i18n/*.js',
    config:'src/config.js',
    configUrl:'src/config-url.js',
    uiPath:'src/components/assets/ui-source/bootstrap.less',
    uiWatchPath:['src/assets/ui-source/**/*.less','src/views/assets/less/*.less'],
    uiOutputLess:'./src/assets/less/',
    uiOutput:'./src/views/assets/css/',
    componentPath:'./src/components/**/*.vue'
};

/** 
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['dist/*.js','dist/*.css','dist/*.map']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

/** 
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    webpack(config, cb)
});

/** 
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('dist/style.css')
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'));
});

/** 
 *  压缩js文件
 */
gulp.task('script',['lanBuild'],function() {
    gulp.src('dist/*.js')
    // .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

/**
 *  压缩jquery相关的插件及jquery本体文件
 */
gulp.task('jqueryPlugin',function() {
    return gulp.src([path.jqueryPluginPath, path.config, path.configUrl])
        .pipe(concat(path.jqueryPluginOutputName))
        .pipe(gulp.dest(path.jqueryPluginOutputPath));
});

/**
 * js语法检查
 * */
gulp.task('eslint',function(){
    return gulp.src(path.jsPath)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('jscopy',function(){
    return gulp.src(path.libsJsPath)
        .pipe(gulp.dest(path.libsJsTestPath));
});
gulp.task('lesslint', function () {
    return gulp.src(path.lessPath)
        .pipe(plumber())
        .pipe(lesshint())
        .pipe(lesshint.reporter());
});
gulp.task('csslint', function () {
    return gulp.src(path.cssPath)
        .pipe(plumber())
        .pipe(csslint())
        .pipe(csslint.formatter());
});
gulp.task('uiConcat', function () {
    return gulp.src(path.uiPath)
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(path.uiOutput));
});
gulp.task('watch',['uiConcat'], function () {
    gulp.watch(path.jsPath, ['eslint']);
    gulp.watch(path.config, ['jqueryPlugin']);
    gulp.watch(path.uiWatchPath, ['uiConcat']);
    // gulp.watch(path.lanJsTestPath, ['lanBuild']);
    //gulp.watch(path.lessPath, ['lesslint']);
    //gulp.watch(path.cssPath, ['csslint']);
});
gulp.task('default', ['webpack'], function() {
    console.log(process.env.NODE_ENV);
    gulp.start('style','script');
});

/**
 * 构建多语言
 * */
gulp.task('lanBuild',function() {
    var opt = {
        lanPath:'i18n/',//多语言文件夹
        bulidPath:'dist/',
        lanOutputPath:'dist/i18n'//多语言输出文件夹，一点要配置正确，配置在静态代码生成的环境内，否则语言无法拆分！
    };
    ukwatch.lan(opt,gulp);
});


gulp.task('scanComponents', require('./doc/server/scanComponents').scan);
gulp.task('scanApi', require('./doc/server/scanComponents').scanApi);
