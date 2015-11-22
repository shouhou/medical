define('page/materialAdd', ['common/util'], function(require) {
    var Util = require('common/util');

    function index() {
        this.title = '';
        this.init();
    }
    index.prototype = {
        init: function() {
            this.initEvent();
            this.render();
        },
        initEvent: function() {
            $('.J_Return').on('click', function(event) {
                window.location = '/material/materialList';
            });
            $('.J_Submit').on('click', function(event) {
                event.preventDefault();
                // var data = $('.J_From').serialize();
                var data = $(".J_From").serializeArray();
                var json = Util.array2json(data);
                json['amount'] = (parseFloat(json['amount'])).toFixed(2);
                if (confirm('确认上传吗?')) {
                    $.ajax({
                        url: 'materialAdd/form',
                        type: 'post',
                        dataType: 'json',
                        data: json,
                        success: function(data) {
                            if (data && data.success) {
                                alert('上传成功');
                            } else {
                                alert('上传失败: ' + data.message);
                            }
                        },
                        error: function() {
                            alert('上传失败');
                        }
                    })
                }
            });
        },
        render: function() {
            // var date = new Date();
            // var now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            $('.J_Data').appendDtpicker({
                "inline": false,
                "locale": "cn",
                "closeOnSelected": true,
                "autodateOnStart": false,
                "dateFormat": "YYYY-MM-DD hh:mm:00"
            });
            $('.J_ShortData').appendDtpicker({
                "inline": false,
                "locale": "cn",
                "closeOnSelected": true,
                "autodateOnStart": false,
                "dateFormat": "YYYYMM"
            });
        }
    }
    return index;
})
