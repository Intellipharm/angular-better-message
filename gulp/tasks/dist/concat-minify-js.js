module.exports = function(gulp, plugins, config) {
    return function() {

        var src_dir = config.dir.src + '/' + config.dir.js + '/';
        var dest_dir = config.dir.dist + '/' + config.dir.js + '/';

        gulp.src([
                src_dir + config.name + '.js',
                src_dir + '*.js'
            ])
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat(config.name + '.js'))
            .pipe(gulp.dest(dest_dir))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(dest_dir));
    };
};
