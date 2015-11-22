var _ = require('underscore');
var fs = require('fs');

var conn = require('./common/conn');
var util = require('./common/util');
var log = require('./common/log').log;

var json = {
    'id': 'id',
    'event_id': 'data_34',
    'event_name': 'data_3',
    'event_date_time': 'data_12',
    'procedured_detail_id': 'run_id',
    'decision_type': 'substring(data_24,1,1)',
    'decision_date_time': 'data_16',
    'decision_result': 'data_8',
    'public_type': 'substring(data_25,1,1)',
    'public_dtae_time': 'data_18',
    'public_result': 'data_10',
    'check_type': 'substring(data_26,1,1)',
    'check_date_time': 'data_19',
    'check_result': 'data_11'
};

var event_num = 1;
module.exports = {
    getDecisionById: function(id, callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_115 where id = ?', [id], function(rows, fields) {
            var data = rows[0];
            callback(data);
        });
    },
    getAllDecision: function(callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_115', function(rows, fields) {
            callback(rows);
        });
    },
    getOut: function(data, callback) {
        data.unit_code = '4509020020';
        data.unit_name = '玉林市第二人民医院';
        data.org_code = '49936034-6';
        data.event_num = event_num++;
        data.procedure = 1;
        data.procedured_date_time = data.event_date_time;

        log('DT-准备发送数据：', data);
        fs.readFile("./models/tpl/decision.tpl", 'utf-8', function(error, tpl) {
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
