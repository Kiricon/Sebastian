"use strict";
/// <reference path="../../node.d.ts" />
var Config_1 = require("../helper/Config");
var fs = require("fs");
var CommandsController_1 = require("./CommandsController");
var HotKeysController_1 = require("./HotKeysController");
var StyleController_1 = require("./StyleController");
var PreferencesController_1 = require("./PreferencesController");
var SettingsController = (function () {
    function SettingsController() {
        this.content = document.getElementById('content');
        this.menuItems = document.getElementById('menu').getElementsByTagName('div');
        this.controllers = ['', CommandsController_1.CommandsController, '', '', ''];
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
        this.setController(index);
        for (var i = 0; i < this.menuItems.length; i++) {
            if (i == index - 1) {
                this.menuItems[i].className = "menu-item selected";
            }
            else {
                this.menuItems[i].className = "menu-item";
            }
        }
    };
    SettingsController.prototype.setController = function (index) {
        switch (index) {
            case 2:
                this.pageController = new CommandsController_1.CommandsController();
                break;
            case 3:
                this.pageController = new HotKeysController_1.HotKeysController();
                break;
            case 4:
                this.pageController = new StyleController_1.StyleController();
                break;
            case 5:
                this.pageController = new PreferencesController_1.PreferenceController();
                break;
        }
        this.pageController.init();
    };
    return SettingsController;
}());
exports.SettingsController = SettingsController;
