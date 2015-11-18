var http = require('http'),
    https = require('https'),
    xml2js = require('xml2js'),
    fs = require("fs");

var log = require('../models/common/log').log;

var builder = new xml2js.Builder(); //JSON->xml

var options = {
    host: '127.0.0.1',
    port: 8888,
    method: 'POST',
    path: 'https://59.211.16.98:4439/BasWebService.asmx?wsdl', //url
    headers: {
        // 'Content-Type': 'text/xml; charset=utf-8',
        // 'Content-Length': Buffer.byteLength(data),
        // 'SOAPAction': 'http://www.gxws.gov.cn/PunishDataUpload'
        'Content-Type': 'application/soap+xml; charset=utf-8'
    }
};

function fetchReq(options, type, data, callback) {
    var req = https.request(options);
    var chunks = '';
    // var chunks = [];
    req.on('error', function(err) {
        console.log('req:', err);
    });

    req.on('response', function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        var resTimer = setTimeout(function() {
            res.destroy();
            log('WS-请求超时');
        }, 10000);//10秒超时

        // res.setEncoding('binary');utf8
        res.setEncoding(type);
        res.on('error', function(err) {
            console.log('res:', err);
        })
        res.on('data', function(chunk) {
            chunks += chunk;
            //chunks.push(chunk);
        });
        res.on('end', function() { //Buffer.concat(chunks) 乱码
            callback(chunks)
        });
    });
    req.write(data + "\n");
    req.end();
}

module.exports = {
    sendReq: function(reqJSON, callback) {
        reqXml = builder.buildObject(reqJSON);
        reqXml = reqXml.substring(reqXml.indexOf('<Request>'), reqXml.length);

        var unitCode = 4509020020;
        var data = ['<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">',
            '<soap12:Header>',
            '<MySoapHeader xmlns="http://www.gxws.gov.cn/">',
            '<_UnitCode>' + unitCode + '</_UnitCode>',
            '<UserID>bas' + unitCode + '</UserID>',
            '<PassWord>' + unitCode + '2816202@gxwst</PassWord>',
            '</MySoapHeader>',
            '</soap12:Header>',
            '<soap12:Body>',
            '<PunishDataUpload xmlns="http://www.gxws.gov.cn/">',
            '<xml> <![CDATA[',
            reqXml,
            ']]></xml>',
            '</PunishDataUpload>',
            '</soap12:Body>',
            '</soap12:Envelope>'
        ].join('');

        log('WS-发送报文: ', data);
        fetchReq(options, 'utf-8', data, function(res) {
            log('WS-接收报文: ', res);
            callback(res);
        });
    }
}
