var SearchBar = (function () {
    //Build out our searchbar and pre define properties
    function SearchBar() {
        this.element = document.getElementById('search');
        this.results = [];
        this.options = [];
        this.selected = 0;
        this.resultsElement = document.getElementById('results');
        this.Listen();
        this.GetOptions();
    }
    //Get the  result options
    SearchBar.prototype.GetOptions = function () {
        ApplicationReader.getApplicationsList(function (obj) {
            this.options = obj;
        });
    };
    //Initalize all listeners. 
    SearchBar.prototype.Listen = function () {
        var self = this;
        document.getElementById('search').addEventListener('keyup', function (event) {
            if (event.key != "ArrowUp" && event.key != "ArrowDown" && event.key != "Enter") {
                self.AnalyzeInput(self);
            }
        });
        document.addEventListener("keydown", function (event) {
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
    };
    //Analyzes input text and returns a list of results that are suitable
    SearchBar.prototype.AnalyzeInput = function (context) {
        this.selected = 0;
        context.results = [];
        var input = document.getElementById('search').value.toLowerCase();
        if (input.trim() != "") {
            input = input.trim().split(' ');
            context.options.forEach(function (option) {
                var optionWords = option.text.toLowerCase().split(' ');
                input.forEach(function (word, index) {
                    optionWords.forEach(function (optionWord) {
                        if (optionWord == word || optionWord.substring(0, word.length) == word) {
                            if (!context.results.includes(option))
                                context.results.push(option);
                        }
                    });
                });
            });
        }
        context.Update();
    };
    //Updates the html results based on the current list of results.
    //This command is usually run after the Analyze Input Method is complete
    SearchBar.prototype.Update = function () {
        var resultList = "";
        var resultListHeight = 0;
        var self = this;
        this.results.forEach(function (value, index) {
            var img = "";
            if (value.icon) {
                img = "<img src='data:image/png;base64," + value.icon + "' class='resultIcon'>";
            }
            if (index == self.selected) {
                resultList += '<div class="result selected" onclick="search.Select(' + index + ')">' + img + '<span>' + value.text + '</span></div>';
            }
            else {
                resultList += '<div class="result" onclick="search.Select(' + index + ')">' + img + '<span>' + value.text + '</span></div>';
            }
            if (resultListHeight <= 300) {
                resultListHeight += 50;
            }
        });
        this.resultsElement.innerHTML = resultList;
        win.setSize(win.getSize()[0], resultListHeight + 56);
        this.resultsElement.style.height = resultListHeight + "px";
        if (this.results.length > 0) {
            this.element.parentNode.className = "active";
        }
        else {
            this.element.parentNode.className = "";
        }
    };
    //Move up from selected option
    SearchBar.prototype.MoveUp = function () {
        if (this.selected > 0) {
            this.selected--;
            this.Update();
        }
    };
    //Move down from selected option
    SearchBar.prototype.MoveDown = function () {
        if (this.selected < this.results.length - 1) {
            this.selected++;
            this.Update();
        }
    };
    //Set current selection
    SearchBar.prototype.Select = function (index) {
        if (index) {
            this.selected = index;
            alert(this.results[index].text);
        }
        else {
            alert(this.results[this.selected].text);
        }
    };
    return SearchBar;
}());
