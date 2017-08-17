/**
 * Created by chenwenxiao on 2016/11/23.
 */
new Vue({
    el:'#app',
    data:{
        addData:{},
        listData:{},
        addDataExample:{
            schema:'{\n    \"streamNo\": \"web_bss147684821077692157\",\n    \"resultCode\": \"00000000\",     \n    \"resultDesc\": \"成功\",\n    \"data\": {\n        \"perPageCount\": 30,     \n        \"currentPage\": 1,\n        \"totalCount\": 40,     \n        \"totalPageCount\": 1,\n        \"dataList\": [\n            {\n                \"id\": \"id\",     \n                \"createTime\": \"date(-)\",     \n                \"customerId\": \"id\",\n                \"name\": \"string(5,10)\",     \n                \"countryCode\": \"number(1)\",     \n                \"phone\": \"number(11)\",\n                \"address\": {     \n                    \"zipcode\":\"number(6)\",\n                    \"country\":\"country\",     \n                    \"province\":\"province\",     \n                    \"city\":\"city\",     \n                    \"address\":\"road\"     \n                },\n                \"isDefault\": \"boolean\",     \n                \"isIdentify\": \"boolean\",\n                \"createCustId\": \"id\",\n                \"mvnoId\": \"id\",\n                \"isDeleted\": \"boolean\"\n            }\n        ]\n    }\n}',
            desc:'获取收件人列表接口的假数据',
            api:'/bss/address/QueryAddressList',
            author:'陈文骁'
        }
    },
    methods: {
        openHide:function (e) {
            var $this = $(e.currentTarget);
            if($this.hasClass('active')){
                $(e.currentTarget).removeClass('active').html('展开schema详情').siblings('pre').slideUp();
            }else{
                $(e.currentTarget).addClass('active').html('收起schema详情').siblings('pre').slideDown();
            }
        },
        init: function (data) {
            var that = this;
            _ajax.ajax({
                url: '/api/getDataSchema',
                type: 'get',
                data: {},
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode === '00000000') {
                        var dataList = {};
                        for (var d in data.data.dataList) {
                            var id = d.split('/');
                            id.length--;
                            id = id.join('/');
                            data.data.dataList[d].createTime = _dateHelper.getFormatTime(data.data.dataList[d].createTime);
                            data.data.dataList[d].updateTime = _dateHelper.getFormatTime(data.data.dataList[d].updateTime);
                            data.data.dataList[d].schema = _util.syntaxHighlight(data.data.dataList[d].schema);
                            if (dataList[id]) {
                                dataList[id].push(data.data.dataList[d]);
                            } else {
                                dataList[id] = [];
                                dataList[id].push(data.data.dataList[d]);
                            }
                        }
                        that.listData = dataList;
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        addSchema: function () {
            var that = this;
            if (that.addData.schema == '' || that.addData.desc == '' || that.addData.author == '' || that.addData.api == '') {
                alert('所有的参数不能为空，请认真填写！');
                return;
            }
            try {
                if (that.addData.api.split('/').length < 4) {
                    alert('api请参照标准的api格式进行书写，如/bss/address/QueryAddress');
                    return;
                }
            } catch (e) {
                alert('api请参照标准的api格式进行书写，如/bss/address/QueryAddress');
                return;
            }
            try {
                JSON.parse(that.addData.schema);
            } catch (e) {
                alert('schema必须参照标准的对象形式编写！');
                return;
            }
            _ajax.ajaxJson({
                url: '/api/addDataSchema',
                type: 'post',
                data: JSON.stringify({
                    schema: that.addData.schema,
                    desc: that.addData.desc,
                    author: that.addData.author,
                    api: that.addData.api
                }),
                success: function (data) {
                    if (data.resultCode == '00000000') {
                        $('#makeData').modal('hide');
                        that.addData = {};
                        that.init();
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        }
    },
    ready:function () {
        this.init();
    }
});