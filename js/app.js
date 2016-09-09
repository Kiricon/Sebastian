"use strict";
var SearchBar_1 = require("./Search/SearchBar");
var remote = require("electron").remote;
var win = new remote.getCurrentWindow();
var search = new SearchBar_1.SearchBar();
