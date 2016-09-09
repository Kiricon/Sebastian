declare function require(name:string);
//import {SearchBar} from "./Search/SearchBar";
var SearchBar = require('./js/Search/SearchBar');
const remote = require("electron").remote;
var win = new remote.getCurrentWindow();
console.log(SearchBar)
var search = new SearchBar.SearchBar();
search.init();