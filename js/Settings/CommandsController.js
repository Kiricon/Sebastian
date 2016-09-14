"use strict";
var Config_1 = require("../helper/Config");
var CommandsController = (function () {
    function CommandsController() {
        this.commands = Config_1.Config.get('Commands');
        this.commandsList = document.getElementById('commandList');
        this.newCommand = document.getElementById('newCommand');
        this.newCommandType = document.getElementById('newCommandType');
        this.newCommandContainer = document.getElementById('newCommandActionContainer');
    }
    CommandsController.prototype.contructor = function () {
    };
    CommandsController.prototype.init = function () {
        this.populateCommandList();
        this.listen();
    };
    CommandsController.prototype.listen = function () {
        var self = this;
        this.newCommandType.addEventListener('change', function () {
            self.changeActionInput();
        });
    };
    CommandsController.prototype.populateCommandList = function () {
        //Clear out list
        this.commandsList.innerHTML = "";
        if (this.commands.length > 0) {
            //Populate with all commands
            this.commands.forEach(function (command) {
                var commandElement = "";
                commandElement = "<div class='command'>" + command.text + " + " + command.type + "</div>";
                this.commandsList.innerHTML += commandElement;
            });
        }
        else {
            this.commandsList.innerHTML = "No commands currently set. Create a new one!";
        }
    };
    CommandsController.prototype.changeActionInput = function () {
        var actionInput = "";
        switch (this.newCommandType.value) {
            case "terminal":
                actionInput = "<input type='text' id='newCommandAction' placeholder='Enter command you want ran in terminal...' />";
                break;
            case "file":
                actionInput = "<input type='file' id='newcommandAction' />";
                break;
        }
        if (actionInput != "") {
            this.newCommandContainer.innerHTML = actionInput;
            this.newCommandAction = document.getElementById('newCommandAction');
        }
    };
    return CommandsController;
}());
exports.CommandsController = CommandsController;
