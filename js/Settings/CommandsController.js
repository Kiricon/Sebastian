"use strict";
var Config_1 = require("../helper/Config");
var CommandsController = (function () {
    function CommandsController() {
        this.commands = Config_1.Config.get('Commands');
        this.commandsList = document.getElementById('commandList');
    }
    CommandsController.prototype.contructor = function () {
    };
    CommandsController.prototype.init = function () {
        this.populateCommandList();
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
    return CommandsController;
}());
exports.CommandsController = CommandsController;
