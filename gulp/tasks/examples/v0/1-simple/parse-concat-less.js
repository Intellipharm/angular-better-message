module.exports = function(gulp, plugins, config) {
    return function() {

        var src_dir = config.dir.eg1 + '/' + config.dir.less + '/';
        var dest_dir = config.dir.eg1 + '/' + config.dir.css + '/';

        gulp.src(src_dir + '*.less')
            .pipe(plugins.less())
            .pipe(plugins.concat(config.name + '.css'))
            .pipe(gulp.dest(dest_dir));
    };
};
