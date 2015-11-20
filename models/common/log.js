var moment = require('moment');
var fs = require('fs');
exports.log = function() {
    process.stdout.write(moment().format('YYYY-MM-DD HH:mm:ss') + ' ');
    for (var i in arguments) {
        // process.stdout.write(arguments[i] + '\n');
        console.log(arguments[i]);
    }
};
