"use strict";
/// <reference path="../../node.d.ts" />
var Config_1 = require("../helper/Config");
var fs = require("fs");
var SettingsController = (function () {
    function SettingsController() {
        this.content = document.getElementById('content');
        this.menuItems = document.getElementById('menu').getElementsByTagName('div');
        //Makes config file if one doesn't exist
        if (!Config_1.Config.exists()) {
            Config_1.Config.create();
        }
    }
    //Change the content to the partials input.
    SettingsController.prototype.display = function (name, index) {
        var partialPath = __dirname + "/../../pages/partials/" + name + ".html";
        var partial = fs.readFileSync(partialPath, "utf8");
        this.content.innerHTML = partial;
        for (var i = 0; i < this.menuItems.length; i++) {
            if (i == index - 1) {
                this.menuItems[i].className = "menu-item selected";
            }
            else {
                this.menuItems[i].className = "menu-item";
            }
        }
    };
    return SettingsController;
}());
exports.SettingsController = SettingsController;
