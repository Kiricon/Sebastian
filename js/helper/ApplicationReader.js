const fs = require('fs');
const plist = require('plist');
const iconutil = require('iconutil');
const path = require('path'); 

exports.getApplicationsList = function(callback){
		if(process.platform == 'darwin'){
	var fileList = [];
	fs.readdir('/Applications', function(err, files){
		var i = 1;
		files.forEach(function(value){
			
			value = value.replace(" ", "\ ");
			if(value.indexOf(".app") > -1 && value[0] != "."){
				getIcon(value, function(encoding){
					var obj = {
						text: value.replace(".app", ""),
						icon: encoding
					}
					fileList.push(obj);
					i++;
					if(i == files.length){
						//console.log(fileList);
						callback(fileList);
					}
				})
			}else if(value[0] != "."){
				fs.readdir('/Applications/'+value, function(err, files){
					files.forEach(function(value){

					})
				});
				fileList.push({text: value, icon: null});
				i++;
				if(i == files.length){
					//console.log(fileList);
					callback(fileList);
				}
			}else{
				i++;
				if(i == files.length){
					console.log(fileList);
					callback(fileList);
				}
			}
		});
		//console.log(fileList);
		
	});
}

} 

function getPaths(){
	var filePaths = [];
	var i = 1;
	var z = 0;
	fs.readdir('/Applications', function(err, files){
		z += files.length;
		console.log(z);
		files.forEach(function(value){
			if(value.indexOf(".app") > -1){
			filePaths.push("/Applications/"+value);
			i++;
			if(i == z){
				console.log(filePaths);
			}
		}else if(value.indexOf('.') == -1){
			fs.readdir('/Applications/'+value, function(err, apps){
				z+= apps.length;
				apps.forEach(function(app){
					if(app.indexOf(".app") > -1){
						filePaths.push("/Applications/"+value+'/'+app);
					}
					i++;
						if(i == z){
							console.log(filePaths);
						}
				});
			});
			i++;
						if(i == z){
							console.log(filePaths);
						}
		}else{
			i++;
						if(i == z){
							console.log(filePaths);
						}
		}
		});
	});
}

getPaths();

var getIcon = function(app, callback){

	var file = "/Applications/"+app+"/Contents/Info.plist";
	try {
	  var obj = plist.parse(fs.readFileSync(file, 'utf8'));
	  	if(obj.CFBundleIconFile.indexOf('.icns') > -1){
		var iconPath = "/Applications/"+app+"/Contents/Resources/"+obj.CFBundleIconFile;
		}else{
			var iconPath = "/Applications/"+app+"/Contents/Resources/"+obj.CFBundleIconFile+".icns";
		}
		iconutil.toIconset(iconPath, function(err, icons) { 
	   try {
	    callback(icons['icon_128x128@2x.png'].toString('base64'));
		}catch (e){
			callback(null);
		}
		});
	} catch (e) {
	  callback(null);
	}
}


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
}

/*
getIcon("Atom.app", function(string){
	console.log(string);
}) */
