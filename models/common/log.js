var moment = require('moment');
exports.log = function() {
    process.stdout.write(moment().format('YYYY-MM-DD HH:mm:ss') + ' ');
    for (var i in arguments) {
        console.log(arguments[i]);
    }
};
