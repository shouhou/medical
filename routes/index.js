var express = require('express'),
    router = express.Router(),
    url = require('url'),
    async = require('async'),
    querystring = require("querystring");

var punish = require('../models/punish'),
    log = require('../models/common/log').log,
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
        console.log('rpc:', id);

        var soapJSON = punish.getJSON(data);
        // soap.sendReq(soapJSON, function(data) {
        //     res.send(data);
        // });
        console.log(soapJSON);
        res.send({
            'success': true,
            'message': '上传成功'
        })
    });
});


router.post('/punishList/batchRPC', function(req, res) {
    var ids = req.param('ids').split(',');
    var funcs = [];
    for (var i = 0, len = ids.length; i < len; i++) {
        var id = ids[i];
        var func = async.apply(function(id, callback) {
            punish.getPunishById(id, function(data) {
                var soapJSON = punish.getJSON(data);
                soap.sendReq(soapJSON, function(data) {
                    data.id = id;
                    callback(null, data);
                });
            });
        }, id);
        funcs.push(func);
    }
    async.parallel(funcs, function(err, results) {
        log('batchRPC complete');
        log(results);
        res.send(results);
    });
});

router.get('/punishAdd', function(req, res) {
    res.render('punishAdd', {});
});

router.get('/punishAdd/form', function(req, res) {
    // var objectUrl = url.parse(req.url);
    // var objectQuery = querystring.parse(objectUrl.query);
    // var event_name = objectQuery.event_name;
    // console.log(req.body);
    // soap.sendReq(objectQuery, function(data) {
    // });
});
module.exports = router;
