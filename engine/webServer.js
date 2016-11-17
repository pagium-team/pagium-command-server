"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var livereload = require('livereload');


/**
 * 程序主入口
 *
 * @param {String} projectPath 项目路径
 * @method run
 */
var run = function(projectPath) {
	var app = express();
	app.use(express.static(projectPath + "/output/")); // 静态资源目录
	var server = livereload.createServer();
	server.watch(projectPath + "/output");
	// app.use(require('connect-livereload')({
	// 	port: 35729
	// }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.set("port", process.env.PORT || 8800); // 端口
    app.listen(app.get("port"), function() {
        console.log("[%s] pagium server listening on port %d",
            app.get("env").toUpperCase(), app.get("port"));
    });


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