module.exports = function(gulp, plugins, config) {
    return function() {

        var src_dir = config.dir.src + '/' + config.dir.js + '/';

        gulp.src(src_dir + '*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'));
    };
};
