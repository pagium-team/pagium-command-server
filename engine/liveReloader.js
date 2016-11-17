"use strict";

var livereload = require('livereload');

/**
 * 程序主入口
 *
 * @param {String} projectPath 项目路径
 * @method run
 */
var run = function(projectPath) {
    var server = livereload.createServer();
	server.watch(projectPath + "/output");
	console.log("livereload watch: " + projectPath.green + "/output".green);
}

/**
 * pagium Web 服务
 *
 * @author sam.sin
 * @class index
 * @constructor
 */
module.exports = {
    run: run
}