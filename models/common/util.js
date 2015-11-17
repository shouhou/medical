module.exports = {
    querySql: function(json) {
        var str = '';
        for (var i in json) {
            str += json[i] + ' as ' + i + ' ,';
        }
        return str.substring(0, str.length - 1);
    }
}
