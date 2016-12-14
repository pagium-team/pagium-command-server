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
		if (!isUsed && !globalConfig.__server) {
			var app = express();
			// app.use("/pagium/", express.static(projectPath)); // 静态资源目录
			app.use("/pagium/:id/", function(req, res, next) {
				return express.static(projectPath + "/" + req.params.id + "/output/")(req, res, next);
			}); // 静态资源目录
			app.use("/", express.static(projectPath)); // 静态资源目录
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded());
			app.set("port", port); // 端口
		    globalConfig.__server = app.listen(app.get("port"), function() {
		        console.log("[%s] pagium server listening on port " + "%d".green,
		            app.get("env").toUpperCase(), app.get("port"));
		    });
		} else {
			console.log(port + " is already used !!");
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
