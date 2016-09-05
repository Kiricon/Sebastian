const FileReader = require('./js/helper/FileReader.js');
const ApplicationReader = require('./js/helper/ApplicationReader.js');
const remote = require("electron").remote;
var win = new remote.getCurrentWindow();

var search = new SearchBar();
//search.options = FileReader.getCommands();
//search.options = ApplicationReader.getApplicationsList();
ApplicationReader.getApplicationsList(function(obj){
	search.options = obj;
});
/*
ApplicationReader.getIcon('Sublime Text.app', function(string){
	console.log(string);
}); */

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
/*
ApplicationReader.getIcon("Atom.app", function(string){
document.getElementById('searchIcon').src = "data:image/png;base64," + string;
}); */
