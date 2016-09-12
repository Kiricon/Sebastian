"use strict";
/// <reference path="../../node.d.ts" />
var process = require("process");
var fs = require("fs");
var Config = (function () {
    function Config() {
    }
    //Check if config files exists
    Config.exists = function () {
        try {
            return fs.statSync(Config.configPathFile).isFile();
        }
        catch (e) {
            return false;
        }
    };
    //Creates a new empty config file
    Config.create = function () {
        var defaultObject = {
            Commands: []
        };
        fs.mkdirSync(Config.configPath);
        fs.writeFileSync(Config.configPathFile, JSON.stringify(defaultObject));
        return Config.exists();
    };
    //gets top level value of config file
    Config.get = function (item) {
        return Config.object()[item];
    };
    //Set's top level value of config file
    Config.set = function (item, content) {
        var configObject = Config.object();
        configObject[item] = content;
        fs.writeFileSync(Config.configPathFile, JSON.stringify(configObject));
        return Config.exists();
    };
    //Gets the entire content of the config file as an object
    Config.object = function () {
        return JSON.parse(fs.readFileSync(Config.configPathFile, "utf8"));
    };
    Config.configPath = process.env.HOME + "/.sebastian/";
    Config.configPathFile = process.env.HOME + "/.sebastian/config.json";
    return Config;
}());
exports.Config = Config;
