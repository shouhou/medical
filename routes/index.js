var express = require('express'),
    router = express.Router(),
    punish = require('../models/punish'),
    url = require('url'),
    querystring = require("querystring");

var soap = require('../service/soap');

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
    var rs = {
        'success': true
    }
    res.send(rs);
});

router.post('/punishList/batchRPC', function(req, res) {
    var ids = req.param('ids');
    console.log(ids);
    var rs = {
        'success': true
    }
    res.send(rs);
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
