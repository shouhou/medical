var _ = require('underscore');
var fs = require('fs');

var conn = require('./common/conn');
var util = require('./common/util');
var log = require('./common/log').log;

var json = {
    'id': 'id',
    'event_id': 'data_20',
    'event_name': 'data_1',
    'event_date_time': 'data_2',
    'decision_type': 'substring(data_4,1,1)',
    'decision_date_time': 'data_7',
    'decision_result': 'data_12',
    'procedured_detail_id': 'run_id',
    'public_type': 'substring(data_11,1,1)',
    'public_dtae_time': 'data_9',
    'public_result': 'data_17',
    'recommen_type': 'substring(data_3,1,1)'
};

var event_num = 1;
module.exports = {
    getIssuesById: function(id, callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_114 where id = ?', [id], function(rows, fields) {
            var data = rows[0];
            callback(data);
        });
    },
    getAllIssues: function(callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_114', function(rows, fields) {
            callback(rows);
        });
    },
    getOut: function(data, callback) {
        data.unit_code = '4509020020';
        data.unit_name = '玉林市第二人民医院';
        data.org_code = '49936034-6';
        data.event_num = event_num++;
        data.procedure = 1;

        log('DT-准备发送数据：', data);
        fs.readFile("./models/tpl/issues.tpl", 'utf-8', function(error, tpl) {
            if (error) {
                log('FS-读取模板错误');
                throw error;
            } else {
                var out = _.template(tpl)(data);
                callback(out);
            }
        });
    }
};
