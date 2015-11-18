var _ = require('underscore');
var conn = require('./common/conn');
var util = require('./common/util');
var _ = require('underscore');

var json = {
    'id': 'id',
    'event_id': 'data_41',
    'event_name': 'data_11',
    'event_date_time': 'data_7',
    'decision_type': 'data_18',
    'decision_date_time': 'data_17',
    'decision_result': 'data_19',
    'procedured_detail_id': 'run_id',
    'procedured_date_time': 'data_7'
};

var data = {
    id: 3,
    event_id: '',
    event_name: ' 关于全院范围内推广运行OA系统的申请',
    event_date_time: '2015-09-01 10:00:00',
    decision_type: '4党政联席会',
    decision_date_time: '2015-09-02 10:00:00',
    decision_result: '经讨论决定，全院推广使用OA系统，组织加强培训，实现无纸化办公。 ',
    procedured_detail_id: '22',
    procedured_date_time: '2015-09-01 10:00:00'
}

var reqJSON = {
    "Request": {
        "Head": {
            "Function": " MAJOR_PUNISH ",
            "Operation": "0"
        },
        "Body": {
            "MAJOR_PUNISH": {
                "MAIN": {
                    "UNIT_CODE": "<%= unit_code %>",
                    "UNIT_NAME": "<%= unit_name %>",
                    "EVENT_NUM": "<%= event_num %>",
                    "ORG_CODE": "<%= org_code %>",
                    "EVENT_ID": "<%= event_id %>",
                    "EVENT_NAME": "<%= event_name %>",
                    "PROCEDURE": "<%= procedure %>",
                    "EVENT_DATE_TIME": "<%= event_date_time %>"
                },
                "DETAIL": {
                    "UNIT_CODE": "<%= unit_code %>",
                    "PROCEDURED_DETAIL_ID": "<%= procedured_detail_id %>",
                    "EVENT_ID": "<%= event_id %>",
                    "PROCEDURED_DATE_TIME": "<%= procedured_date_time %>",
                    "DECISION_TYPE": "<%= decision_type %>",
                    "DECISION_DATE_TIME": "<%= decision_date_time %>",
                    "DECISION_RESULT": "<%= decision_result %>"
                }
            }
        }
    }
}

module.exports = {
    getPunishById: function(id, callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_113 where id = ?', [id], function(rows, fields) {
            callback(rows[0]);
        });
    },
    getAllPunish: function(callback) {
        conn.query('select ' + util.querySql(json) + ' from flow_data_113', function(rows, fields) {
            callback(rows);
        });
    },
    getJSON: function(data) {
        data.unit_code = '4509020020';
        data.unit_name = '玉林市第二人民医院';
        data.org_code = '49936034-6';
        data.event_num = 1;
        data.procedure = 1;
        
        var tpl = JSON.stringify(reqJSON);
        var out = _.template(tpl)(data);
        return JSON.parse(out);
    }
};