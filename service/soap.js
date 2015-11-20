var http = require('http'),
    https = require('https'),
    // xml2js = require('xml2js'),
    fs = require("fs");

var log = require('../models/common/log').log;

// var builder = new xml2js.Builder(); //JSON->xml

var options = {
    host: '127.0.0.1',
    port: 8888,
    method: 'POST',
    // path: 'https://shouhou91.eicp.net:26402/BasWebService.asmx?wsdl',
    path: 'https://59.211.16.98:4439/BasWebService.asmx?wsdl',

    // hostname:'shouhou91.eicp.net',
    // port:26402,
    // path:'/BasWebService.asmx?wsdl',
    headers: {
        // 'Content-Type': 'text/xml; charset=utf-8',
        // 'Content-Length': Buffer.byteLength(data),
        // 'SOAPAction': 'http://www.gxws.gov.cn/PunishDataUpload'
        'Content-Type': 'application/soap+xml; charset=utf-8'
    }
};

function fetchReq(options, type, data, callback) {
    var req = http.request(options);
    var chunks = '';
    // var chunks = [];
    req.on('error', function(err) {
        console.log('req:', err);
    });

    var req_timer = setTimeout(function() {
        if (chunks.length == 0) {
            req.abort();
            log('WS-请求发出超时');
        }
    }, 5000);

    req.on('response', function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

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

        var resTimer = setTimeout(function() {
            if (chunks.length == 0) {
                res.destroy();
                log('WS-请求响应超时');
            }
        }, 10000); //10秒超时
    });
    req.write(data + "\n");
    req.end();
}

function parseRes(res, type) {
    // <PunishDataUploadResult>1,成功</PunishDataUploadResult>
    res = res.replace(/ /g, '');
    var data = res.substring(res.indexOf('<' + type + '>') + type.length + 2, res.indexOf('</' + type + '>'));
    var rtn = {
        'success': data.indexOf('成功') > 0 ? true : false,
        'message': data
    };
    console.log(rtn);
    return rtn;
}

module.exports = {
    sendReq: function(out, callback) {
        // reqXml = builder.buildObject(reqJSON);
        // reqXml = reqXml.substring(reqXml.indexOf('<Request>'), reqXml.length);
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
            out,
            ']]></xml>',
            '</PunishDataUpload>',
            '</soap12:Body>',
            '</soap12:Envelope>'
        ].join('');

        log('WS-发送报文: ', data);
        fetchReq(options, 'utf-8', data, function(res) {
            log('WS-接收报文: ', res);
            var rtn = parseRes(res, 'PunishDataUploadResult');
            callback(rtn);
        });
    }
}
