import {ApplicationReader} from "../helper/ApplicationReader";
import {IResult} from "./IResult";

declare function require(name: string);

const remote = require("electron").remote;
const exec = require("child_process").exec;
var win = new remote.getCurrentWindow();
export class SearchBar {
    //Build out our searchbar and pre define properties
    element: HTMLInputElement = (<HTMLInputElement>document.getElementById('search'));
    results: IResult[] = [];
    options: IResult[] = [];
    selected: number = 0;
    resultsElement: HTMLElement = document.getElementById('results');

    constructor() {
        this.Listen();
        this.GetOptions();
    }

    //Get the  result options
    GetOptions(): void {
        let self = this;
        ApplicationReader.getApplicationsList(function(obj) {
            self.options = obj;
        });
    }

    //Initalize all listeners.
    Listen(): void {
        var self = this;
        document.getElementById('search').addEventListener('keyup', function(event) {
            if (event.key != "ArrowUp" && event.key != "ArrowDown" && event.key != "Enter") {
                self.AnalyzeInput(self);
            }
        });

        document.addEventListener("keydown", event => {
            switch (event.key) {
                case "Escape":
                    win.hide();
                    break;
                case "ArrowUp":
                    this.MoveUp();
                    break;
                case "ArrowDown":
                    this.MoveDown();
                    break;
                case "Enter":
                    this.Select();
            }
        });
    }

    //Analyzes input text and returns a list of results that are suitable
    AnalyzeInput(context): void {

        this.selected = 0;
        context.results = [];
        let inputString: string = this.element.value.toLowerCase();


        if (inputString.trim() != "") {

            let input: string[] = inputString.trim().split(' ');
            context.options.forEach(function(option) {

                let optionWords: string[] = option.text.toLowerCase().split(' ');
                input.forEach(function(word) {
                    optionWords.forEach(function(optionWord, index) {

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

    }


    //Updates the html results based on the current list of results.
    //This command is usually run after the Analyze Input Method is complete
    Update(): void {

        let resultList: string = "";
        let resultListHeight: number = 0;
        var self = this;


        this.results.forEach(function(value, index) {
            let resultString: string = "";
            let img: string = value.icon ? "<img src='data:image/png;base64," + value.icon + "' class='resultIcon'>" : "";
            let select: string = (index == self.selected) ? "selected" : "";
            let text: string = value.text;
            if (value.highlight) {
                let highlightText: string = "";
                let words: string[] = value.text.split(" ");
                words.forEach(function(word, index) {
                    if (index == value.highlight) {
                        highlightText += "<span class='highlight'>" + word + "</span> ";
                    } else {
                        highlightText += word + " ";
                    }
                    text = highlightText.trim();
                });
            }

            resultList += '<div class="result ' + select + '" onclick="search.Select(' + index + ')">' + img + '<span class="resultText">' + text + '</span></div>';


            if (resultListHeight <= 300) {
                resultListHeight += 50
            }
        });
        this.resultsElement.innerHTML = resultList;
        win.setSize(
            win.getSize()[0],
            resultListHeight + 56
        );
        this.resultsElement.style.height = resultListHeight + "px";
        let parent: HTMLElement = <HTMLElement>this.element.parentNode;
        if (this.results.length > 0) {
            parent.className = "active";
        } else {
            parent.className = "";
        }
    }

    //Move up from selected option
    MoveUp(): void {
        if (this.selected > 0) {
            this.selected--;
            this.Update();
        }
    }

    //Move down from selected option
    MoveDown(): void {
        if (this.selected < this.results.length - 1) {
            this.selected++;
            this.Update();
        }
    }

    //Set current selection
    Select(index?: number) {
        index = index || this.selected;
        //alert(this.results[index].text);
        this.Execute(this.results[index]);
    }

    Execute(result: IResult): void {

        let command: string = result.text.trim().replace(" ", "\\ ");

        //Execute our command, I'll eventually add result types.
        switch (result.type) {
            case "app":
                exec('open -a ' + command, (error, stdout, stderr) => {
                    if (error) {
                        alert(error);
                    } else {
                        win.hide();
                    }
                });
                break;
        }

    }


}
