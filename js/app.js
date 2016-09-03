var search = new SearchBar();
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