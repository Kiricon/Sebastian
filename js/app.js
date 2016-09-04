const FileReader = require('./js/helper/FileReader.js');

var search = new SearchBar();
search.options = FileReader.getCommands();
document.getElementById('search').addEventListener('keyup', function(){
	search.AnalyzeInput(search)
});
const remote = require("electron").remote;
    var win = new remote.getCurrentWindow();
    document.addEventListener("keydown", event => {

        switch (event.key) {
            case "Escape":
                win.hide();
                break;
             }
    });