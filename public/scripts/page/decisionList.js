define('page/decisionList', [], function(require) {
    function Page() {
        this.title = '';
        this.init();
    }
    Page.prototype = {
        init: function() {
            this.initEvent();
        },
        initEvent: function() {
            $('.J_CheckAll').on('click', function(event) {
                $('.J_CheckBox').prop('checked', $(this).prop('checked'));
            });
            $('.J_BatchUpload').on('click', function(event) {
                if (confirm('确认批量上传吗?')) {
                    var ids = [];
                    $('.J_CheckBox:checked').each(function(index, el) {
                        ids.push($(el).val());
                    });
                    $.ajax({
                        url: 'decisionList/batchRPC',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            'ids': ids.join(',')
                        },
                        success: function(data) {
                            var errIds = [];
                            for (var i in data) {
                                if (!data[i].success) {
                                    errIds.push(data[i].id);
                                }
                            }
                            if (errIds.length == 0) {
                                alert('上传成功');
                            } else {
                                alert('上传失败ID: ' + errIds.join(','));
                            }
                        },
                        error: function() {
                            alert('上传失败');
                        }
                    })
                }
            });
            $('.J_ManualUpload').on('click', function(event) {
                window.location = './decisionAdd';
            });

            $('table').on('click', function(event) {
                var $target = $(event.target);
                if ($target.hasClass('J_Upload')) {
                    if (confirm('确认上传吗?')) {
                        var id = $target.parents('tr').find('input[type="checkbox"]').val();
                        $.ajax({
                            url: 'decisionList/rpc',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                'id': id
                            },
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
                }
            });
        },
        render: function() {}
    }
    return Page;
})
