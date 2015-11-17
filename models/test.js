var punish = require('./punish');
// punish.getPunishById('1', function(data) {
//     console.log(data);
// })

punish.getAllPunish(function(data) {
    console.log(data);
})