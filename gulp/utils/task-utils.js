// node modules
var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();

// methods
var load = function(section, task_name, config) {
    return require('../tasks/' + config.dir[section] + '/' + task_name)(gulp, plugins, config);
};

// export
module.exports.load = load;
