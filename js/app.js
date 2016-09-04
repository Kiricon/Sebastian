const FileReader = require('./js/helper/FileReader.js');
const remote = require("electron").remote;
var win = new remote.getCurrentWindow();

var search = new SearchBar();
search.options = FileReader.getCommands();
document.getElementById('search').addEventListener('keyup', function(event){
	if(event.key != "ArrowUp" && event.key != "ArrowDown" && event.key != "Enter"){
		search.AnalyzeInput(search);
	}
});

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "Escape":
                win.hide();
                break;
            case "ArrowUp":
            	search.MoveUp();
            	break;
           	case "ArrowDown":
           		search.MoveDown();
           		break;
           	case "Enter":
           		search.Select();
             }
    });