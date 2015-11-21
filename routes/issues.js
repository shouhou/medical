var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var issues = require('../models/issues'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util =require('../models/common/util'),
    soap = require('../service/soap');

router.get('/', function(req, res) {
    res.writeHead(302, {
        'Location': '/issues/issuesList'
    });
    res.end();
});

router.get('/issuesList', function(req, res) {
    issues.getAllIssues(function(data) {
        res.render('issuesList', {
            'data': data
        });
    });
});

router.post('/issuesList/rpc', function(req, res) {
    var id = req.param('id');
    issues.getIssuesById(id, function(data) {
        issues.getOut(data, function(out) {
            soap.sendReq(out, function(data) {
                res.send(data);
            });
        });
    });
});

router.post('/issuesList/batchRPC', function(req, res) {
    var ids = req.param('ids').split(',');
    var funcs = [];
    for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        var func = async.apply(function(id, callback) {
            issues.getIssuesById(id, function(reqData) {
                issues.getOut(reqData, function(out) {
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

router.get('/issuesAdd', function(req, res) {
    res.render('issuesAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/issuesAdd/form', function(req, res) {
    issues.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});
module.exports = router;
