define('page/financeAdd', ['common/util'], function(require) {
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
                window.location = '/finance/financeList';
            });
            $('.J_Submit').on('click', function(event) {
                event.preventDefault();
                // var data = $('.J_From').serialize();
                var data = $(".J_From").serializeArray();

                if (confirm('确认上传吗?')) {
                    $.ajax({
                        url: 'financeAdd/form',
                        type: 'post',
                        dataType: 'json',
                        data: Util.array2json(data),
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
        }
    }
    return index;
})
