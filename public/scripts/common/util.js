define('common/util', [''], function(require, exports, module) {
    var util = {
        array2json: function(arr) {
            var rtn = {};
            for (var i in arr) {
                rtn[arr[i].name] = arr[i].value;
            }
            return rtn;
        }
    };
    return util;
});
