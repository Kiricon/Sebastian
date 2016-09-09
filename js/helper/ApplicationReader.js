"use strict";
var fs = require('fs');
var plist = require('plist');
var iconutil = require('iconutil');
var path = require('path');
var ApplicationReader = (function () {
    function ApplicationReader() {
    }
    ApplicationReader.getApplicationsList = function (callback) {
        var fileList = [];
        var i = 1;
        this.getPaths(function (paths, names) {
            paths.forEach(function (path, index) {
                this.getIcon(path, function (encoding) {
                    var obj = {
                        text: names[index].replace(".app", ""),
                        icon: encoding
                    };
                    i++;
                    console.log(i + " : " + paths.length);
                    fileList.push(obj);
                    if (i == paths.length) {
                        callback(fileList);
                    }
                });
            });
        });
    };
    ApplicationReader.getPaths = function (callback) {
        var filePaths = [];
        var fileNames = [];
        var i = 1;
        var done = false;
        fs.readdir('/Applications', function (err, files) {
            var z = files.length;
            files.forEach(function (value) {
                if (value.indexOf(".app") > -1) {
                    filePaths.push("/Applications/" + value);
                    fileNames.push(value);
                    i++;
                    if (i == z && !done) {
                        done = true;
                        callback(filePaths, fileNames);
                    }
                }
                else if (value.indexOf('.') == -1) {
                    var apps = fs.readdirSync('/Applications/' + value);
                    z += apps.length;
                    apps.forEach(function (app) {
                        if (app.indexOf(".app") > -1) {
                            filePaths.push("/Applications/" + value + '/' + app);
                            fileNames.push(app);
                        }
                        i++;
                        if (i == z && !done) {
                            done = true;
                            callback(filePaths, fileNames);
                        }
                    });
                    i++;
                    if (i == z && !done) {
                        done = true;
                        callback(filePaths, fileNames);
                    }
                }
                else {
                    i++;
                    if (i == z && !done) {
                        done = true;
                        callback(filePaths, fileNames);
                    }
                }
            });
        });
    };
    ApplicationReader.getIcon = function (app, callback) {
        console.log(app);
        var file = app + "/Contents/Info.plist";
        try {
            var obj = plist.parse(fs.readFileSync(file, 'utf8'));
            if (obj.CFBundleIconFile.indexOf('.icns') > -1) {
                var iconPath = app + "/Contents/Resources/" + obj.CFBundleIconFile;
            }
            else {
                var iconPath = app + "/Contents/Resources/" + obj.CFBundleIconFile + ".icns";
            }
            iconutil.toIconset(iconPath, function (err, icons) {
                try {
                    callback(icons['icon_128x128@2x.png'].toString('base64'));
                }
                catch (e) {
                    callback(null);
                }
            });
        }
        catch (e) {
            callback(null);
        }
    };
    return ApplicationReader;
}());
exports.ApplicationReader = ApplicationReader;
