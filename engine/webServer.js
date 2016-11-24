"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var net = require('net');
var globalConfig = require("../global");

var portInUse = function(port, callback) {
    var server = net.createServer(function(socket) {
		socket.write('Echo server\r\n');
		socket.pipe(socket);
    });

    server.listen(port);
    server.on('error', function (e) {
		callback(true);
    });
    server.on('listening', function (e) {
		server.close();
		callback(false);
    });
};

/**
 * 程序主入口
 *
 * @param {String} projectPath 项目路径
 * @method run
 */
var run = function(projectPath) {
	console.log("pagium make you happy!!".rainbow);

	var port = process.env.PORT || 3330;
	portInUse(port, function(isUsed) {
		if (isUsed && globalConfig.__server) {
			globalConfig.__server.close();
		} else {
			var app = express();
			app.use(express.static(projectPath + "/output/")); // 静态资源目录
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded());
			app.set("port", port); // 端口
		    globalConfig.__server = app.listen(app.get("port"), function() {
		        console.log("[%s] pagium server listening on port " + "%d".green,
		            app.get("env").toUpperCase(), app.get("port"));
		    });
		}
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