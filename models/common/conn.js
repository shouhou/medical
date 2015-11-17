var mysql = require('mysql'),
    log = require('./log').log,
    config = require('../../config.js');

// var conn = null;
// conn = mysql.createConnection(config);
// conn.on('error', function(error) {
//     console.log(new Date(), ' error:', error);
// });

// conn.connect(function(error) {
//     if (error) setTimeout(conn.connect, 3000);
// });

// conn.query('select * from `wp_users`', function(error, rows, fields) {
//     if (error) throw error;
//     console.log(rows[0]);
// });

// conn.end();
// module.exports = conn;

var pool = mysql.createPool(config);
module.exports = {
    query: function() {
        var _arguments = arguments;
        pool.getConnection(function(error, conn) {
            if (error) {
                log('DB-数据库连接异常');
                throw error;
            }
            // '[sql args callback]'
            var sql = _arguments[0],
                args = _arguments.length == 2 ? null : _arguments[1],
                callback = _arguments[_arguments.length - 1];

            function handler(error, rows, fields) {
                if (error) {
                    log('DB-执行SQL异常: ' + sql);
                    conn.rollback(function() {
                        throw error;
                    });
                    return;
                }
                log('DB-执行SQL: ' + sql);
                if (args) log('参数: [' + args.join(',') + ']');
                callback(rows, fields);
            }

            // 开启事务
            conn.beginTransaction(function(error) {
                if (error) {
                    log('DB-开启事务失败: ' + sql);
                    throw error;
                }
                if (!args) {
                    conn.query(sql, handler);
                } else {
                    conn.query(sql, args, handler);
                }
            });

            // 提交事务
            conn.commit(function(error) {
                if (error) {
                    conn.rollback(function() {
                        log('DB-提交事务失败: ' + sql);
                        throw error;
                    });
                }
            });

            //释放连接
            conn.release(function(error) {
                if (error) {
                    log('DB-关闭数据库连接异常');
                    throw error;
                }
            });
        });
    }
};
