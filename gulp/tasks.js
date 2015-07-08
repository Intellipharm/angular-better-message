// requirements
var gulp        = require('gulp'); // node modules
var config      = require('./config.js'); // config
var task_utils  = require('./utils/task-utils.js'); // custom utils

//-------------------------------
// src
//-------------------------------

gulp.task('src-compile-js', task_utils.load('src', 'compile-js', config.common));
gulp.task('src-lint-js', task_utils.load('src', 'lint-js', config.common));

gulp.task('src', ['src-lint-js', 'src-compile-js']);

//-------------------------------
// dist
//-------------------------------

gulp.task('dist-concat-minify-js', task_utils.load('dist', 'concat-minify-js', config.common));
gulp.task('dist-concat-minify-tmpl-js', task_utils.load('dist', 'concat-minify-tmpl-js', config.common));
gulp.task('dist-parse-concat-minify-less', task_utils.load('dist', 'parse-concat-minify-less', config.common));

gulp.task('dist', [
    'src-lint-js',
    'src-compile-js',
    'dist-concat-minify-js',
    'dist-concat-minify-tmpl-js',
    'dist-parse-concat-minify-less'
]);

//-------------------------------
// egs
//-------------------------------

gulp.task('eg1-parse-concat-less', task_utils.load('eg1', 'parse-concat-less', config.common));

gulp.task('egs', ['eg1-parse-concat-less']);

//-------------------------------
// watch :: src
//-------------------------------

gulp.task('watch', [
    'src-lint-js',
    'src-compile-js',
    'dist-concat-minify-js',
    'dist-concat-minify-tmpl-js',
    'dist-parse-concat-minify-less'
], function() {

    // src

    gulp.watch(config.common.dir.src + '/' + config.common.dir.js + '/**/*.js', [
        'src-lint-js',
        'src-compile-js',
        'dist-concat-minify-js',
        'dist-concat-minify-tmpl-js'
    ]);
    gulp.watch(config.common.dir.src + '/' + config.common.dir.html + '/**/*.html', [
        'dist-concat-minify-tmpl-js'
    ]);
    gulp.watch(config.common.dir.src + '/' + config.common.dir.less + '/**/*.less', [
        'dist-parse-concat-minify-less'
    ]);

    // egs

    gulp.watch(config.common.dir.eg1 + '/' + config.common.dir.less + '/**/*.less', [
        'eg1-parse-concat-less'
    ]);
});
