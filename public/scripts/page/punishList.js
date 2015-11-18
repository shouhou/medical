define('page/punishList', [], function(require) {
    function Page() {
        this.title = '';
    }
    Page.prototype = {
        init: function() {
            this.initEvent();
        },
        initEvent: function() {
            var ids = [];
            $('.J_BatchUpload').on('click', function(event) {
                $('.J_CheckBox:checked').each(function(index, el) {
                    ids.push($(el).val());
                });
                $.ajax({
                    url: 'punishList/batchRPC',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        'ids': ids.join(',')
                    },
                    success: function(data) {
                        if (data && data.success) {
                            alert('上传成功');
                        } else {
                            alert('上传失败');
                        }
                    },
                    error: function() {
                        alert('上传失败');
                    }
                })
            });
            $('.J_ManualUpload').on('click', function(event) {
                window.location = './punishAdd';
            });

            $('table').on('click', function(event) {
                var $target = $(event.target);
                if ($target.hasClass('J_Upload')) {
                    if (confirm('确认上传吗?')) {
                        var id = $target.parents('tr').find('input[type="checkbox"]').val();
                        $.ajax({
                            url: 'punishList/rpc',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                'id': id
                            },
                            success: function(data) {
                                if (data && data.success) {
                                    alert('上传成功');
                                } else {
                                    alert('上传失败');
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
