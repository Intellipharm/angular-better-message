module.exports = function(gulp, plugins, config) {
    return function() {

        var src_dir = config.dir.src + '/' + config.dir.html + '/';
        var dest_dir = config.dir.src + '/' + config.dir.js + '/' + config.name + '/' + config.dir.templates + '/';


        gulp.src(src_dir + '/*.html')
            .pipe(plugins.htmlmin({collapseWhitespace: true}))
            .pipe(plugins.ngTemplates({
                filename: config.name + '-templates.js',
                module: config.module,
                path: function (path, base) {
                    return 'html/' + path.replace(base, '');
                }
            }))
            .pipe(gulp.dest(dest_dir));
    };
};
