var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var finance = require('../models/finance'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util = require('../models/common/util'),
    soap = require('../service/soap');

router.get('/', function(req, res) {
    res.writeHead(302, {
        'Location': '/finance/financeList'
    });
    res.end();
});

router.get('/financeList', function(req, res) {
    finance.getAllFinance(function(data) {
        res.render('financeList', {
            'data': data
        });
    });
});

router.post('/financeList/rpc', function(req, res) {
    var id = req.param('id');
    finance.getFinanceById(id, function(data) {
        finance.getOut(data, function(out) {
            soap.sendReq(out, function(data) {
                res.send(data);
            });
        });
    });
});

router.post('/financeList/batchRPC', function(req, res) {
    var ids = req.param('ids').split(',');
    var funcs = [];
    for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        var func = async.apply(function(id, callback) {
            finance.getFinanceById(id, function(reqData) {
                finance.getOut(reqData, function(out) {
                    soap.sendReq(out, function(resData) {
                        resData.id = id;
                        callback(null, resData);
                    });
                });
            });
        }, id);
        funcs.push(func);
    }
    async.parallel(funcs, function(err, results) {
        log('批量上传返回结果:', results);
        res.send(results);
    });
});

router.get('/financeAdd', function(req, res) {
    res.render('financeAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/financeAdd/form', function(req, res) {
    finance.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});
module.exports = router;
