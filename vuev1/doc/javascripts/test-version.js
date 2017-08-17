/**
 * Created by chenwenxiao on 2016/11/22.
 */
new Vue({
    el: '#app',
    data: function(){
        return{
            addData: {},
            tableData: [],
            editType: '',
            btnNums: [],
            currentPage: 1,
            totalPage: 1,
            showTable: false,
            tableTips: '数据查询中...'
        }
    },
    methods: {
        addVersion: function () {
            this.addData = {};
            this.editType = 'add';
            $('#add').modal('show');
        },
        stopVersion: function (e) {
            if (confirm('真的要停用版本吗？')) {
                var that = this;
                _ajax.ajaxJson({
                    url: '/api/stopVersion',
                    type: 'post',
                    data: JSON.stringify({
                        id: $(e.currentTarget).attr('data-id')
                    }),
                    success: function (data) {
                        if (typeof data === 'string') {
                            data = JSON.parse(data);
                        }
                        if (data.resultCode === '00000000') {
                            that.getList();
                        } else {
                            alert(data.resultCode);
                        }
                    }
                });
            }
        },
        editVersion: function (e) {
            this.editType = 'edit';
            this.editId = $(e.currentTarget).attr('data-id');
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i]._id == this.editId) {
                    this.addData = {
                        version: this.tableData[i].version,
                        author: this.tableData[i].author,
                        desc: this.tableData[i].desc,
                    };
                    break;
                }
            }
            $('#add').modal('show');
        },
        submit: function () {
            var url = '', that = this;
            if (this.editType === 'edit') {
                url = '/api/editVersionControl';
            } else if (this.editType === 'add') {
                url = '/api/addVersionControl';
            } else {
                return;
            }
            window._ajax.ajaxJson({
                url: url,
                type: 'post',
                data: JSON.stringify({
                    id: that.editId,
                    version: that.addData.version,
                    author: that.addData.author,
                    desc: that.addData.desc
                }),
                success: function (data) {
                    that.addData = {};
                    $('#add').modal('hide');
                    that.getList();
                }
            });
        },
        setPage: function (e) {
            var page = $(e.currentTarget).attr('data-page');
            this.getList({
                perPageCount: 15,
                currentPage: page
            });
        },
        getList: function (data) {
            var that = this;
            window._ajax.ajax({
                url: '/api/getVersion',
                type: 'get',
                data: data || {
                    perPageCount: 15,
                    currentPage: 1
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode === '00000000') {
                        if (data.data.dataList.length > 0) {
                            for (var i = 0; i < data.data.dataList.length; i++) {
                                data.data.dataList[i].createTime = _dateHelper.getFormatTime(data.data.dataList[i].createTime);
                                data.data.dataList[i].stopTime = _dateHelper.getFormatTime(data.data.dataList[i].stopTime);
                            }
                            that.tableData = data.data.dataList;
                            that.currentPage = data.data.currentPage - 1;
                            that.totalPage = data.data.totalPageCount;
                            var page = [];
                            for (var i = 0; i < data.data.totalPageCount; i++) {
                                page.push(i + 1);
                            }
                            that.btnNums = page;
                            that.showTable = true;
                        } else {
                            that.showTable = false;
                            that.tableTips = '暂无数据！';
                        }
                    } else {
                        that.showTable = false;
                        that.tableTips = data.resultDesc;
                    }
                }
            });
        }
    },
    ready: function () {
        this.getList();
    }
});