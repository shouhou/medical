var mysql = require('mysql'),
    config = require('../config.js');

var conn = null;
conn = mysql.createConnection(config);
conn.on('error', function(err) {
    console.log(new Date(), ' error:', err);
});

conn.connect(function(error) {
    if (error) setTimeout(conn.connect, 3000);
});

// conn.query('select * from `wp_users`', function(err, rows, fields) {
//     if (err) throw err;
//     console.log(rows[0]);
// });

// conn.end();
module.exports = conn;
