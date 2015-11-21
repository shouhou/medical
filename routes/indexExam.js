var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
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
module.exports = router;
