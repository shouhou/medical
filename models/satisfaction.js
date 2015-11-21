var _ = require('underscore');
var fs = require('fs');

var conn = require('./common/conn');
var util = require('./common/util');
var log = require('./common/log').log;

module.exports = {
    getOut: function(data, callback) {
        data.unit_code = '4509020020';
        data.unit_name = '玉林市第二人民医院';
        data.org_code = '49936034-6';

        log('DT-准备发送数据：', data);
        fs.readFile("./models/tpl/satisfaction.tpl", 'utf-8', function(error, tpl) {
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
