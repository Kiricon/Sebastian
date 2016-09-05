const fs = require('fs');
const plist = require('plist');
const iconutil = require('iconutil');
const path = require('path');



exports.getApplicationsList = function(callback) {
        var fileList = [];
        var i = 1;
        getPaths(function(paths, names) {
            paths.forEach(function(path, index) {
                getIcon(path, function(encoding) {
                    var obj = {
                        text: names[index].replace(".app", ""),
                        icon: encoding
                    }
                    i++;
                    console.log(i + " : " + paths.length);
                    fileList.push(obj);
                    if (i == paths.length) {
                        callback(fileList);
                    }
                });
            });
        });
    }

function getPaths(callback) {
    var filePaths = [];
    var fileNames = [];
    var i = 1;

    var done = false;
    fs.readdir('/Applications', function(err, files) {
        var z = files.length;
        files.forEach(function(value) {
            if (value.indexOf(".app") > -1) {
                filePaths.push("/Applications/" + value);
                fileNames.push(value);
                i++;
                
			if(i == z && !done){
				done = true;
				 callback(filePaths, fileNames);
			} 
            } else if (value.indexOf('.') == -1) {
                var apps = fs.readdirSync('/Applications/' + value);
                    z += apps.length;
                    apps.forEach(function(app) {
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

            } else {
                i++;
                if (i == z && !done) {
                    done = true;
                    callback(filePaths, fileNames);
                }
            }
        });
    });
}
/*
getPaths(function(paths, names){
	console.log(paths);
}) */

var getIcon = function(app, callback) {
        console.log(app);
        var file = app + "/Contents/Info.plist";
        try {
            var obj = plist.parse(fs.readFileSync(file, 'utf8'));
            if (obj.CFBundleIconFile.indexOf('.icns') > -1) {
                var iconPath = app + "/Contents/Resources/" + obj.CFBundleIconFile;
            } else {
                var iconPath = app + "/Contents/Resources/" + obj.CFBundleIconFile + ".icns";
            }
            iconutil.toIconset(iconPath, function(err, icons) {
                try {
                    callback(icons['icon_128x128@2x.png'].toString('base64'));
                } catch (e) {
                    callback(null);
                }
            });
        } catch (e) {
            callback(null);
        }
    }
    /*

exports.getIcon = function(app, callback){

	var file = "/Applications/"+app+"/Contents/Info.plist";
	try {
		//console.log(fs.readFileSync(file, 'utf8'));
	  var obj = plist.parse(fs.readFileSync(file, 'utf8'));
	  //console.log(obj);
		var iconPath = "/Applications/"+app+"/Contents/Resources/"+obj.CFBundleIconFile;
		console.log(iconPath);
		iconutil.toIconset(iconPath, function(err, icons) { 
	   // console.log(icons['icon_128x128@2x.png'].toString('base64'));
	   try {
	    callback(icons['icon_128x128@2x.png'].toString('base64'));
		}catch (e){
			callback(null);
		}
		});
	} catch (e) {
	  callback(null);
	}
} */

/*
getIcon("Atom.app", function(string){
	console.log(string);
}) */