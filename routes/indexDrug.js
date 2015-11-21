var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var indexDrug = require('../models/indexDrug'),
    dict = require('../models/common/dict'),
    log = require('../models/common/log').log,
    util = require('../models/common/util'),
    soap = require('../service/soap');

router.get('/', function(req, res) {
    res.writeHead(302, {
        'Location': '/indexDrug/indexDrugAdd'
    });
    res.end();
});

router.get('/indexDrugAdd', function(req, res) {
    res.render('indexDrugAdd', {
        'dic_gongshi': util.json2array(dict.DIC_GONGSHI),
        'dict_juece': util.json2array(dict.DIC_JUECE),
        'dic_tuijian': util.json2array(dict.DIC_TUIJIAN),
        'dic_zhaobiao': util.json2array(dict.DIC_ZHAOBIAO),
        'dic_yanshou': util.json2array(dict.DIC_YANSHOU)
    });
});

router.post('/indexDrugAdd/form', function(req, res) {
    indexDrug.getOut(req.body, function(out) {
        soap.sendReq(out, function(data) {
            res.send(data);
        });
    });
});
module.exports = router;
