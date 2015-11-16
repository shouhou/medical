var conn = require('./conn');
module.exports = {
    getUser: function(callback) {
        conn.query('select * from `wp_users`', function(err, rows, fields) {
            if (err) throw err;
            callback(rows[0]);
        });
    }
};
