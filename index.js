"use strict";

var webServer = require("./engine").webServer;
var fileWatcher = require("./engine").fileWatcher;


/**
 * 程序主入口
 *
 * @param {String} projectPath 项目路径
 * @param {Function} onFileChange 回调方法
 * @method run
 */
var run = function(projectPath, onFileChange) {
    webServer.run(projectPath);
    fileWatcher.run(projectPath, onFileChange);
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