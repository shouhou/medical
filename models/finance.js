var _ = require('underscore');
var fs = require('fs');

var conn = require('./common/conn');
var util = require('./common/util');
var log = require('./common/log').log;

var json = {
    'id': 'id',
    'event_id': 'data_32',
    'event_name': 'data_3',
    'event_date_time': 'data_19',
    'procedured_detail_id': 'run_id',
    'decision_type': 'data_28',
    'decision_date_time': 'data_21',
    'decision_result': 'data_14',
    'public_type': 'data_29',
    'public_dtae_time': 'data_27',
    'public_result': 'data_16',
    'tender_type': 'data_30',
    'tender_date_time': 'data_23',
    'check_type': 'data_31',
    'check_dtae_time': 'data_24',
    'check_result': 'data_17'
};

var event_num = 1;
module.exports = {
    getFinanceById: function(id, callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_116 where id = ?', [id], function(rows, fields) {
            var data = rows[0];


            callback(data);
        });
    },
    getAllFinance: function(callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_116', function(rows, fields) {
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
        fs.readFile("./models/tpl/finance.tpl", 'utf-8', function(error, tpl) {
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
