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



var getIcon = function(app, callback){

	var file = "/Applications/"+app+"/Contents/Info.plist";
	try {
	  var obj = plist.parse(fs.readFileSync(file, 'utf8'));
		var iconPath = "/Applications/"+app+"/Contents/Resources/"+obj.CFBundleIconFile;
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
