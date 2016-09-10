declare function require(name:string);
const fs = require('fs');
import {IResult} from "../Search/IResult";

export class FileReader{

	static getCommands():IResult[]  {
		let obj: IResult[] = JSON.parse(fs.readFileSync('commands.json', 'utf8'));
		return obj;
	}
	
}