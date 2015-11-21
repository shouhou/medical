var moment = require('moment');
var fs = require('fs');
exports.log = function() {
    process.stdout.write(moment().format('YYYY-MM-DD HH:mm:ss') + ' ');
    var msg = '';
    msg += moment().format('YYYY-MM-DD HH:mm:ss') + ' ';
    for (var i in arguments) {
        // process.stdout.write(arguments[i] + '\n');
        console.log(arguments[i]);
        msg += String(arguments[i]);
    }
    process.send(msg + '\n');
};