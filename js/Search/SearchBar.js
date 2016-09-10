"use strict";
var ApplicationReader_1 = require("../helper/ApplicationReader");
var remote = require("electron").remote;
var exec = require("child_process").exec;
var win = new remote.getCurrentWindow();
var SearchBar = (function () {
    function SearchBar() {
        //Build out our searchbar and pre define properties
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
        var self = this;
        ApplicationReader_1.ApplicationReader.getApplicationsList(function (obj) {
            self.options = obj;
        });
    };
    //Initalize all listeners.
    SearchBar.prototype.Listen = function () {
        var _this = this;
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
                    _this.MoveUp();
                    break;
                case "ArrowDown":
                    _this.MoveDown();
                    break;
                case "Enter":
                    _this.Select();
            }
        });
    };
    //Analyzes input text and returns a list of results that are suitable
    SearchBar.prototype.AnalyzeInput = function (context) {
        this.selected = 0;
        context.results = [];
        var inputString = this.element.value.toLowerCase();
        if (inputString.trim() != "") {
            var input_1 = inputString.trim().split(' ');
            context.options.forEach(function (option) {
                var optionWords = option.text.toLowerCase().split(' ');
                input_1.forEach(function (word) {
                    optionWords.forEach(function (optionWord, index) {
                        if (optionWord == word || optionWord.substring(0, word.length) == word) {
                            if (!context.results.includes(option)) {
                                option.highlight = index;
                                context.results.push(option);
                            }
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
            var resultString = "";
            var img = value.icon ? "<img src='data:image/png;base64," + value.icon + "' class='resultIcon'>" : "";
            var select = (index == self.selected) ? "selected" : "";
            var text = value.text;
            if (value.highlight) {
                var highlightText_1 = "";
                var words = value.text.split(" ");
                words.forEach(function (word, index) {
                    if (index == value.highlight) {
                        highlightText_1 += "<span class='highlight'>" + word + "</span> ";
                    }
                    else {
                        highlightText_1 += word + " ";
                    }
                    text = highlightText_1.trim();
                });
            }
            resultList += '<div class="result ' + select + '" onclick="search.Select(' + index + ')">' + img + '<span class="resultText">' + text + '</span></div>';
            if (resultListHeight <= 300) {
                resultListHeight += 50;
            }
        });
        this.resultsElement.innerHTML = resultList;
        win.setSize(win.getSize()[0], resultListHeight + 56);
        this.resultsElement.style.height = resultListHeight + "px";
        var parent = this.element.parentNode;
        if (this.results.length > 0) {
            parent.className = "active";
        }
        else {
            parent.className = "";
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
        index = index || this.selected;
        //alert(this.results[index].text);
        this.Execute(this.results[index]);
    };
    SearchBar.prototype.Execute = function (result) {
        var command = result.text.trim().replace(" ", "\\ ");
        //Execute our command, I'll eventually add result types.
        switch (result.type) {
            case "app":
                exec('open -a ' + command, function (error, stdout, stderr) {
                    if (error) {
                        alert(error);
                    }
                    else {
                        win.hide();
                    }
                });
                break;
        }
    };
    return SearchBar;
}());
exports.SearchBar = SearchBar;
