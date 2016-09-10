declare function require(name:string);
import {IResult} from "../Search/IResult";

const fs = require('fs');
const plist = require('plist');
const iconutil = require('iconutil');
const path = require('path');

export class ApplicationReader{

    static getApplicationsList(callback): void {
        let fileList: Array<IResult> = [];
        let i: number = 1;


        ApplicationReader.getPaths(function(paths, names) {
            paths.forEach(function(path, index) {
                ApplicationReader.getIcon(path, function(encoding) {


                    let obj: IResult = {
                        text: names[index].replace(".app", ""),
                        icon: encoding
                    }
                    i++;
                    fileList.push(obj);
                    if (i == paths.length) {
                        callback(fileList);
                    }


                });
            });
        });


    }


    static getPaths(callback):void {
    let filePaths: string[] = [];
    let fileNames: string[] = [];
    let i :number = 1;
    let done: boolean = false;


    fs.readdir('/Applications', function(err, files) {
        let z: number = files.length;


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




    static getIcon(app: string, callback):void {
        let file: string = app + "/Contents/Info.plist";
        
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
}
