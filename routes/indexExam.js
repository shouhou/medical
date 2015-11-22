var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    fs = require('fs'),
    formidable = require('formidable'),
    iconv = require('iconv-lite'),
    querystring = require("querystring");

var indexExam = require('../models/indexExam'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util = require('../models/common/util'),
    soap = require('../service/soap');

router.get('/', function(req, res) {
    res.writeHead(302, {
        'Location': '/indexExam/indexExamAdd'
    });
    res.end();
});

router.get('/indexExamAdd', function(req, res) {
    res.render('indexExamAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/indexExamAdd/form', function(req, res) {
    indexExam.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});

router.post('/indexExamAdd/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = './tmp';
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //2M文件大小

    form.parse(req, function(err, fields, files) {
        if (err) {
            log('FS-文件上传错误');
            throw (err);
        }
        var filePath = '';
        if (files.tpl) {
            filePath = files.tpl.path;
        } else {
            for (var key in files) {
                if (files[key].path && filePath === '') {
                    filePath = files[key].path;
                    break;
                }
            }
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        if ('.csv'.indexOf(fileExt.toLowerCase()) === -1) {
            res.locals.error = '文件类型不正确';
            res.render('error', {});
        }
        fs.readFile(filePath, function(err, data) {
            if (err) {
                log('读取上传文件错误');
                throw err;
            }
            var tplData = iconv.decode(data, 'gbk');
            var tpls = tplData.split('\n');
            var tplsArr = [];
            for (var i in tpls) {
                var arr = tpls[i].split(',');
                if (arr.length > 1) {
                    tplsArr.push(arr);
                }
            }
            res.render('indexExamList', {
                'header': tplsArr[0],
                'data': tplsArr.slice(1, tplsArr.length),
                'dataStr': tpls.slice(1, tpls.length).join('\n')
            });
        });
    });
});


router.post('/indexExamList/batchRPC', function(req, res) {
    var dataStr = '';
    if (dataStr = req.param('dataStr')) {
        datas = dataStr.split('\n');
        var funcs = [];
        for (var i in datas) {
            var data = datas[i].split(',');
            if (data.length > 1) {
                var keys = ['item_name', 'item_code', 'amount', 'num', 'dept', 'doctor', 'form_date', 'standard', 'create_date_time'];
                var json = {};
                for (var j in data) {
                    json[keys[j]] = data[j];
                }
                var func = async.apply(function(json, callback) {
                    indexExam.getOut(json, function(out) {
                        soap.sendReq(out, function(data) {
                            data['item_name'] = json['item_name'];
                            callback(null, data);
                        });
                    });
                }, json);
                funcs.push(func);
            }
        }
        async.parallel(funcs, function(err, results) {
            log('批量上传返回结果:', results);
            res.send(results);
        });
    }
});
module.exports = router;
