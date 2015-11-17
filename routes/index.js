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


router.get('/punishAdd', function(req, res) {
    res.render('punishAdd', {
    });
});

router.get('/punishAdd/submit', function(req, res) {
    var objectUrl = url.parse(req.url);
    var objectQuery = querystring.parse(objectUrl.query);
    // var event_name = objectQuery.event_name;
    soap.sendReq(objectQuery, function(data) {});
});


module.exports = router;
