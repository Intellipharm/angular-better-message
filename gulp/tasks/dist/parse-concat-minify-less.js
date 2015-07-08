module.exports = function(gulp, plugins, config) {
    return function() {

        var src_dir = config.dir.src + '/' + config.dir.less + '/';
        var dest_dir = config.dir.dist + '/' + config.dir.css + '/';

        gulp.src(src_dir + '*.less')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.concat(config.name + '.css'))
            .pipe(gulp.dest(dest_dir))
            .pipe(plugins.minifyCss({compatibility: config.compatibility}))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(dest_dir));
    };
};
