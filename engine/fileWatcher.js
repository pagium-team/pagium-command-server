"use strict";

var fs = require('fs');
var isDoingChange = false;

/**
 * 程序主入口
 *
 * @param {String} projectPath 项目路径
 * @param {Function} callback 回调方法
 * @method run
 */
var run = function(projectPath, callback) {
	var watchPaths = [
		projectPath + "/views/",
		projectPath + "/components/"
	];

	for (var i = 0; i < watchPaths.length; ++i) {
		fs.watch(watchPaths[i], {
		    persistent: true, // 设为false时，不会阻塞进程。
		    recursive: true,
		    encoding: "utf8"
		}, function(event, filename) {
			if (event == "change" && !isDoingChange) {
				isDoingChange = true;
				callback && callback(function() {
					isDoingChange = false;
				});
			}
		});

		console.log("watch: " + watchPaths[i].green);
	}
}

/**
 * pagium 文件监听器
 *
 * @author sam.sin
 * @class index
 * @constructor
 */
module.exports = {
    run: run
}