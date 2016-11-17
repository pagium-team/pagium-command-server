"use strict";

/**
 * engine
 *
 * @author sam.sin
 * @class modules
 * @constructor
 */
module.exports = {
      /**
       * web 服务器
       * @property page 
       * @type Object
       * @static
       */
	webServer: require("./webServer"),

	/**
       * web 服务器
       * @property page 
       * @type Object
       * @static
       */
	fileWatcher: require("./fileWatcher"),

      /**
       * liveReload
       * @property page 
       * @type Object
       * @static
       */
      liveReloader: require("./liveReloader")
}