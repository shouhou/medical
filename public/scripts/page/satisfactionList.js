define('page/satisfactionList', [], function(require) {
    function Page() {
        this.title = '';
        this.init();
    }
    Page.prototype = {
        init: function() {
            this.initEvent();
        },
        initEvent: function() {
            $('.J_BatchUpload').on('click', function(event) {
                if (confirm('确认批量上传吗?')) {
                    $.ajax({
                        url: '../satisfactionList/batchRPC',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            'dataStr':$('input[name="dataStr"]').val()
                        },
                        success: function(data) {
                            var errIds = [];
                            for (var i in data) {
                                if (!data[i].success) {
                                    errIds.push(data[i].patient_code);
                                }
                            }
                            if (errIds.length == 0) {
                                alert('上传成功');
                            } else {
                                alert('上传失败就诊号: ' + errIds.join(','));
                            }
                        },
                        error: function() {
                            alert('上传失败');
                        }
                    })
                }
            });
            $('.J_Return').on('click', function(event) {
                window.location = '../satisfactionAdd/';
            });
        },
        render: function() {}
    }
    return Page;
})
