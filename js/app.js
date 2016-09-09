//import {SearchBar} from "./Search/SearchBar";
var SearchBar = require('./js/Search/SearchBar');
var remote = require("electron").remote;
var win = new remote.getCurrentWindow();
console.log(SearchBar);
var search = new SearchBar.SearchBar();
search.init();
