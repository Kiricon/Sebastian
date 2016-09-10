"use strict";
var fs = require('fs');
var FileReader = (function () {
    function FileReader() {
    }
    FileReader.getCommands = function () {
        var obj = JSON.parse(fs.readFileSync('commands.json', 'utf8'));
        return obj;
    };
    return FileReader;
}());
exports.FileReader = FileReader;
