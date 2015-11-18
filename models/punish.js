var conn = require('./common/conn');
var util = require('./common/util');

var json = {
    'event_id': 'data_41',
    'event_name': 'data_11',
    'event_date_time': 'data_7',
    'decision_type': 'data_18',
    'decision_date_time': 'data_17',
    'decision_result': 'data_19'
};

// var json = {
//     'event_id': 'id',
//     'event_name': 'user_login'
// }

module.exports = {
    getPunishById: function(id, callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_113 where id = ?', [id], function(rows, fields) {
            callback(rows);
        });
    },

    getAllPunish: function(callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_113', function(rows, fields) {
            callback(rows);
        });
    }
};
