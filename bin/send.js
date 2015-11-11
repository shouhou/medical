var http = require('http');
var https = require('https');

var xml2js = require('xml2js');
var fs = require("fs");

var builder = new xml2js.Builder(); //JSON->xml
var reqJSON = {
    "Request": {
        "Head": {
            "Function": "MAJOR_ISSUES",
            "Operation": "0"
        },
        "Body": {
            "MAJOR_ISSUES": {
                "MAIN": {
                    "UNIT_CODE": "1001",
                    "UNIT_NAME": "卫生统计信息中心",
                    "EVENT_NUM": "1",
                    "ORG_CODE": "10001",
                    "EVENT_ID": "10002",
                    "EVENT_NAME": "重大人事任免事件",
                    "PROCEDURE": "1",
                    "EVENT_DATE_TIME": "2015-08-21 00:00:00"
                },
                "DETAIL": {
                    "UNIT_CODE": "1001",
                    "EVENT_ID": "10002",
                    "DECISION_TYPE": "1",
                    "PROCEDURED_DETAIL_ID": "100001",
                    "DECISION_DATE_TIME": "2015-08-25 00:00:00",
                    "DECISION_RESULT": "重大人事任免事件决策",
                    "PUBLIC_TYPE": "1",
                    "PUBLIC_DTAE_TIME": "2015-08-25 00:00:00",
                    "PUBLIC_RESULT": "重大人事任公示结果/通过",
                    "RECOMMEN_TYPE": "1"
                }
            }
        }
    }
}

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

var options = {
    host: '127.0.0.1',
    port: 8888,
    method: 'POST',
    path: 'https://59.211.16.98:4439/BasWebService.asmx?wsdl',//url
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

fetchReq(options, 'utf-8', data, function(res) {
    fs.writeFile("soap.log", res, function(err) {
        if (err) throw err;
    });
    console.log(res);
});
