module.exports = {
    querySql: function(json) {
        var str = '';
        for (var i in json) {
            str += json[i] + ' as ' + i + ' ,';
        }
        return str.substring(0, str.length - 1);
    },
    // var template = "<div><h1>{title}</h1><p>{content}</p></div>"; 
    // var data = [{title:"a",content:"aaaa"},{title:"b",content:"bbb"},{title:"c",content:"ccc"}]; 
    template: function(template, data) {
        var outPrint = "";
        for (var i = 0; i < data.length; i++) {
            var matchs = template.match(/\{[a-zA-Z]+\}/gi);
            var temp = "";
            for (var j = 0; j < matchs.length; j++) {
                if (temp == "")
                    temp = template;
                var re_match = matchs[j].replace(/[\{\}]/gi, "");
                temp = temp.replace(matchs[j], data[i][re_match]);
            }
            outPrint += temp;
        }
        return outPrint;
    }
}

