"use strict";

var webServer = require("./engine").webServer;
var fileWatcher = require("./engine").fileWatcher;
var liveReloader = require("./engine").liveReloader;

/**
 * 运行服务器
 *
 * @param {String} projectPath 项目路径
 * @method start
 */
var start = function(projectPath) {
    webServer.run(projectPath);
}

/**
 * 监听文件改动
 *
 * @param {String} projectPath 项目路径
 * @param {Function} onFileChange 回调方法
 * @method watchFile
 */
var watchFile = function(projectPath, onFileChange) {
    fileWatcher.run(projectPath, onFileChange);
}

/**
 * 实时刷新页面
 *
 * @param {String} projectPath 项目路径
 * @method run
 */
var liveReload = function(projectPath) {
    liveReloader.run(projectPath)
}

/**
 * 主程序入口
 *
 * @param {String} projectPath 项目路径
 * @param {Function} params 配置对象
 * @method run
 */
var run = function(projectPath, params) {
	var watch;
	var live;
	var onFileChange;

	if (params && typeof params == "object") {
		watch = params.watch;
		live = params.live;
		onFileChange = params.onFileChange;
	}

	webServer.run(projectPath);

	if (watch) {
		watchFile(projectPath, onFileChange)
	}
	
	if (live) {
		liveReload(projectPath);
	}
}

/**
 * pagium 服务模块
 *
 * @author sam.sin
 * @class index
 * @constructor
 */
module.exports = {
    run: run
}