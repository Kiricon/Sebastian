const FileReader = require('./js/helper/FileReader.js');
const ApplicationReader = require('./js/helper/ApplicationReader.js');
const remote = require("electron").remote;
var win = new remote.getCurrentWindow();

var search = new SearchBar();