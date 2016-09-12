/// <reference path="../../node.d.ts" />
import * as process from "process";
import * as fs from "fs";


export class Config {
    static configPath: string = process.env.HOME + "/.sebastian/";
    static configPathFile: string = process.env.HOME + "/.sebastian/config.json";

    //Check if config files exists
    static exists(): boolean {
        try {
            return fs.statSync(Config.configPathFile).isFile();
        } catch (e) {
            return false
        }
    }

    //Creates a new empty config file
    static create(): boolean {

      let defaultObject: Object = {
        Commands: []
      };

        fs.mkdirSync(Config.configPath);
        fs.writeFileSync(Config.configPathFile, JSON.stringify(defaultObject));
        return Config.exists();
    }

    //gets top level value of config file
    static get(item: string): any {
        return Config.object()[item];
    }

    //Set's top level value of config file
    static set(item: string, content: any): boolean {
        let configObject = Config.object();
        configObject[item] = content;

        fs.writeFileSync(Config.configPathFile, JSON.stringify(configObject));

        return Config.exists();
    }

    //Gets the entire content of the config file as an object
    static object(): Object {
        return JSON.parse(fs.readFileSync(Config.configPathFile, "utf8"));
    }

}
