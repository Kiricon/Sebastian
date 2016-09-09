declare function require(name:string);
import {SearchBar} from "./Search/SearchBar";
const remote = require("electron").remote;
var win = new remote.getCurrentWindow();

var search = new SearchBar();