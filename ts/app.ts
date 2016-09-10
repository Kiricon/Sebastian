declare function require(name:string);
//import {SearchBar} from "./Search/SearchBar";
var SearchBar = require('./js/Search/SearchBar');

var search = new SearchBar.SearchBar();
search.init();