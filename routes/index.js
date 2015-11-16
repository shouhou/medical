var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
    user.getUser(function(data) {
        console.log(data);
    })
    res.render('index', {
        title: 'Shouhou'
    });
});

module.exports = router;
