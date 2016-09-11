"use strict";
var Config_1 = require("../helper/Config");
var SettingsController = (function () {
    function SettingsController() {
        if (!Config_1.Config.exists()) {
            Config_1.Config.create();
        }
    }
    return SettingsController;
}());
exports.SettingsController = SettingsController;
