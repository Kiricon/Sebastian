var fs = require('fs');
exports.getCommands = function () {
    var obj = JSON.parse(fs.readFileSync('commands.json', 'utf8'));
    return obj;
};
