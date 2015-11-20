var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var punish = require('../models/punish'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util =require('../models/common/util'),
    soap = require('../service/soap');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {});
});

router.get('/punishList', function(req, res) {
    punish.getAllPunish(function(data) {
        res.render('punishList', {
            'data': data
        });
    });
});

router.post('/punishList/rpc', function(req, res) {
    var id = req.param('id');
    punish.getPunishById(id, function(data) {
        punish.getOut(data, function(out) {
            soap.sendReq(out, function(data) {
                res.send(data);
            });
        });
    });
});

router.post('/punishList/batchRPC', function(req, res) {
    var ids = req.param('ids').split(',');
    var funcs = [];
    for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        var func = async.apply(function(id, callback) {
            punish.getPunishById(id, function(reqData) {
                punish.getOut(reqData, function(out) {
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

router.get('/punishAdd', function(req, res) {
    res.render('punishAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/punishAdd/form', function(req, res) {
    punish.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});
module.exports = router;
