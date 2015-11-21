var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var decision = require('../models/decision'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util = require('../models/common/util'),
    soap = require('../service/soap');

router.get('/', function(req, res) {
    res.writeHead(302, {
        'Location': '/decision/decisionList'
    });
    res.end();
});

router.get('/decisionList', function(req, res) {
    decision.getAllDecision(function(data) {
        res.render('decisionList', {
            'data': data
        });
    });
});

router.post('/decisionList/rpc', function(req, res) {
    var id = req.param('id');
    decision.getDecisionById(id, function(data) {
        decision.getOut(data, function(out) {
            soap.sendReq(out, function(data) {
                res.send(data);
            });
        });
    });
});

router.post('/decisionList/batchRPC', function(req, res) {
    var ids = req.param('ids').split(',');
    var funcs = [];
    for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        var func = async.apply(function(id, callback) {
            decision.getDecisionById(id, function(reqData) {
                decision.getOut(reqData, function(out) {
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

router.get('/decisionAdd', function(req, res) {
    res.render('decisionAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/decisionAdd/form', function(req, res) {
    decision.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});
module.exports = router;
