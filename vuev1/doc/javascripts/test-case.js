/**
 * Created by chenwenxiao on 2016/12/23.
 */
new Vue({
    el: '#app',
    data: function () {
        return {
            scanAdd: {},
            swaggerVersion: [],
            testVersionList: [],
            currentTestVersion: {
                _id: '',
                author: '',
                version: '',
                desc: '',
                createTime: 0,
                status: 0
            },
            apiArrObject: {},
            baseApiData: {},
            login: {
                username: '',
                password: ''
            },
            currentUsername: '',
            chargePeople: {
                username: ''
            },
            selectShowApi: {},
            userCaseItem: {
                allPercent: 0,
                count: 0
            },
            selectedAPI: '',
            currentCase: 0,
            selectedTestResult: {},
            testResultData: [],
            testResultStatistics: [],
            currentCaseStatistics: -1,
            testResultStatisticsValue: {},
            selectedTestResult_List: {},
            testResultData_List: [],
            selectedAPIUseCaseList: [],
            selectedAPIData: {}
        }
    },
    methods: {
        getPercent: function(num, total) {
            console.log('num=' + num + ',total=' + total);
            num = parseInt(num);
            total = parseInt(total);
            if (isNaN(num) || isNaN(total)) {
                throw new Error('num or total is NaN');
            }
            if (total == 0 || num > total) {
                return '100%';
            } else if (num == 0 ) {
                return '0%';
            }
            return Math.ceil(( num / total ) * 100) + '%';
        },

        e_initSwaggerData: function (data) {
            var arrObject = {};
            for (var d in data) {
                if (arrObject[data[d].path]) {
                    arrObject[data[d].path][data[d].dirPath] = data[d];
                } else {
                    arrObject[data[d].path] = {};
                    arrObject[data[d].path][data[d].dirPath] = data[d];
                }
            }
            this.baseApiData = data;
            this.selectedAPIData = this.apiArrObject = arrObject;
        },
        e_selectTestResult:function (e) {
            this.currentCase = $(e.currentTarget).index();
            this.selectedTestResult = this.testResultData[this.currentCase];

            // console.info('---- selectedTestResult', JSON.parse(JSON.stringify(this.selectedTestResult)));
        },
        e_cf_submit:function (v) {
            var that = this;
            _ajax.ajaxJson({
                url: '/api/configTest',
                type: 'post',
                data: JSON.stringify({
                    id: v.id,
                    api: that.selectedAPI,
                    status: v.status
                }),
                success: function (data) {
                    if (data.resultCode == '00000000') {
                        that.e_getOpenCaseList();
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_cf_success:function (e) {
            //0未处理，1成功，2失败，3非期望值，4作废
            this.e_cf_submit({
                id: $(e.currentTarget).attr('data-id'),
                status: 1
            });
        },
        e_cf_failed:function (e) {
            this.e_cf_submit({
                id: $(e.currentTarget).attr('data-id'),
                status: 2
            });
        },
        e_cf_unexpect:function (e) {
            this.e_cf_submit({
                id: $(e.currentTarget).attr('data-id'),
                status: 3
            });
        },
        e_cf_giveup:function (e) {
            this.e_cf_submit({
                id: $(e.currentTarget).attr('data-id'),
                status: 4
            });
        },
        e_login: function () {
            var that = this;
            _ajax.ajaxJson({
                url: '/oms/loginforoms/login',
                type: 'post',
                data: JSON.stringify({
                    clientId: 'php160',
                    clientSecret: 'php160',
                    userCode: that.login.username,
                    password: faultylabs.MD5(that.login.password).toLocaleLowerCase(),
                }),
                success: function (data) {
                    if (data.resultCode == '00000000') {
                        $.cookie('access_token', data.data.accessToken);
                        $.cookie('loginCustomerId', data.data.loginCustomerId);
                        localStorage.test_loginCustomerId = data.data.loginCustomerId;
                        localStorage.test_currentUser = that.login.username;
                        that.currentUsername = that.login.username;
                        $('#login').modal('hide');
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_selectApi: function (e) {
            var that = this;
            $('#test-case-ul .list-group-item').removeClass('list-group-item-danger');
            $(e.currentTarget).addClass('list-group-item-danger');
            that.selectedAPI = e.currentTarget.attributes[1].value;
            that.selectedAPIData = this.baseApiData[this.selectedAPI];
            that.testResultStatisticsValue = {};

            that.userCaseItem.allPercent = 0;
            that.userCaseItem.count = 0;

            console.info('--- selectedAPIData', that.selectedAPIData);

            // 有参接口
            if (this.selectedAPIData.param && this.selectedAPIData.param.properties) {
                var arr = {};
                for (var d in this.selectedAPIData.param.properties) {
                    if (d !== 'streamNo' && d !== 'partnerCode' && d !== 'loginCustomerId')
                        arr[d] = this.selectedAPIData.param.properties[d];
                }
                window.window_selectedAPIUseCaseParamBack = $.extend(true, {}, arr);

                this.selectedAPIUseCaseList = [{
                    data: arr,
                    author: localStorage.test_chargeUser,
                    method: this.selectedAPIData.method
                }];
            } else {
                // 无参接口
                window.window_selectedAPIUseCaseParamBack = null;

                this.selectedAPIUseCaseList = [{
                    data: null,
                    author: localStorage.test_chargeUser,
                    method:this.selectedAPIData.method
                }];
            }

            //拉取已经保存的用例
            _ajax.ajax({
                url: '/api/getUsecaseByApi',
                type: 'get',
                data: {
                    api: e.currentTarget.attributes[1].value
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode == '00000000') {
                        if (data.data) {
                            that.userCaseItem.allPercent = data.data.percent;
                            that.userCaseItem.count = data.data.usecase.length;

                            for (var i = 0; i < data.data.usecase.length; i++) {
                                // console.info('usercase', JSON.parse(JSON.stringify(data.data.usecase[i])));

                                var newObj = {
                                    data: null,
                                    updateTime: data.data.usecase[i].updateTime,
                                    createTime: data.data.usecase[i].createTime,
                                    author: data.data.usecase[i].author,
                                    percent: data.data.usecase[i].percent,
                                    desc: data.data.usecase[i].desc,
                                    method: data.data.usecase[i].method,
                                    createTimeShow: '',
                                    updateTimeShow: ''
                                };

                                newObj.createTimeShow = _dateHelper.getFormatTime(newObj.createTime);
                                newObj.updateTimeShow = _dateHelper.getFormatTime(newObj.updateTime);

                                // 有参接口
                                if (window.window_selectedAPIUseCaseParamBack !== null) {
                                    newObj.data = $.extend(true, {}, window_selectedAPIUseCaseParamBack);

                                    for (var d in data.data.usecase[i].data) {
                                        // console.info('----- usercase data', JSON.stringify(data.data.usecase[i].data[d]));
                                        if (data.data.usecase[i].data[d] instanceof Array) {
                                            console.log('array');
                                            newObj.data[d].vv = data.data.usecase[i].data[d];
                                        } else if (data.data.usecase[i].data[d] instanceof Object) {
                                            console.log('object');
                                            for (let key in data.data.usecase[i].data[d]) {
                                                newObj.data[d].properties[key].vv = data.data.usecase[i].data[d][key];
                                            }
                                        } else {
                                            newObj.data[d].vv = data.data.usecase[i].data[d];
                                        }
                                    }
                                }

                                // console.info('newObj', JSON.parse(JSON.stringify(newObj)));
                                that.selectedAPIUseCaseList.push(newObj);
                                that.selectedAPIUseCaseList.$set(0, that.selectedAPIUseCaseList[0]);
                            }
                        }
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });

            //获取测版本
            _ajax.ajax({
                url: '/api/getApiTestStatistics',
                type: 'get',
                data: {
                    api:that.selectedAPI
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode === '00000000') {
                        that.testResultStatistics = data.data;
                        // console.info('that.testResultStatistics', JSON.parse(JSON.stringify(that.testResultStatistics)));
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });

        },
        e_clickVersionStatistics:function (e) {
            this.currentCaseStatistics = $(e.currentTarget).index();
            var data = this.testResultStatistics[$(e.currentTarget).index()];
            console.info('---- in e_clickVersionStatistics data', data);
            var val = data.success / (data.total - data.defaults - data.giveup);
            val = isNaN(val) ? 0 : val;
            data.successRate = val * 100 + '%';
            this.testResultStatisticsValue = data;
            var pie = echarts.init(document.getElementById('echart-pie'));
            var role = echarts.init(document.getElementById('echart-role'));
            var pieOption = {
                series: [
                    {
                        name: '版本测试结果',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {
                                value: data.success,
                                name: '成功',
                                itemStyle: {normal: {color: '#91c7ae'}}
                            },
                            {
                                value: data.failed,
                                name: '失败',
                                itemStyle: { normal: {color: '#c23531'}}
                            },
                            {
                                value: data.defaults,
                                name: '未处理',
                                itemStyle: { normal: {color: '#d48265'}}
                            },
                            {
                                value: data.giveup,
                                name: '作废',
                                itemStyle: { normal: {color: '#bda29a'}}
                            },
                            {
                                value: data.unexpect,
                                name: '非期望结果',
                                itemStyle: { normal: {color: '#2f4554'}}
                            }
                        ]
                    }
                ]
            };
            pie.setOption(pieOption);
            var roleOption = {
                // color: ['#5cb85c','#2f4554', '#d48265', '#d48265', '#91c7ae'],
                xAxis: {
                    data: ["成功", "失败", "未处理", "作废", "非期望结果"]
                },
                yAxis: {},
                series: [{
                    name: '版本测试结果',
                    type: 'bar',
                    data: [
                        {
                            value: data.success,
                            itemStyle: {normal: {color: '#91c7ae'}}
                        },
                        {
                            value: data.failed,
                            itemStyle: { normal: {color: '#c23531'}}
                        },
                        {
                            value: data.defaults,
                            itemStyle: { normal: {color: '#d48265'}}
                        },
                        {
                            value: data.giveup,
                            itemStyle: { normal: {color: '#bda29a'}}
                        },
                        {
                            value: data.unexpect,
                            itemStyle: { normal: {color: '#2f4554'}}
                        }
                    ]
                }]
            };
            role.setOption(roleOption);
        },
        e_changeSwagger: function (e) {
            var that = this;
            _ajax.ajax({
                url: '/api/getSwaggerById',
                type: 'get',
                data: {
                    id: that.swaggerVersionValue
                },
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode == '00000000') {
                        that.e_initSwaggerData(data.data[0].data);
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_setCharge:function () {
            localStorage.test_chargeUser = this.chargePeople.username;
            $('#setCharge').modal('hide');
        },
        e_addCase: function () {
            this.selectedAPIUseCaseList.unshift({data:$.extend(true,{},window_selectedAPIUseCaseParamBack)});
            this.selectedAPIUseCaseList.$set(0, this.selectedAPIUseCaseList[0]);
        },
        e_delCase:function (e) {
            var index = $(e.currentTarget).parents('#test-case-inputGroup').index();
            var dt = this.selectedAPIUseCaseList;
            for (var i = index; i < dt.length; i++) {
                dt[i] = dt[i + 1]
            }
            dt.length--;
            this.selectedAPIUseCaseList.$set(0, this.selectedAPIUseCaseList[0]);
        },
        e_getCaseList:function () {
            var that = this;
            _ajax.ajax({
                url: '/api/getUsecaseList',
                type: 'get',
                data: {},
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode === '00000000') {
                        var oj = {};
                        for (var i = 0; i < data.data.length; i++) {
                            var str = data.data[i].api;
                            str = str.split('/');
                            str.length--;
                            str = str.join('/');
                            if(oj[str]){
                                oj[str][data.data[i].api] = data.data[i];
                            }else{
                                oj[str] = {};
                                oj[str][data.data[i].api] = data.data[i];
                            }
                        }
                        console.info('---- selectShowApi', oj);
                        that.selectShowApi = oj;
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_selectTestApi:function () {
            this.currentCaseStatistics = -1;
            var arr = [], that = this;
            $('#selectShowApi').find('ul input:checked').each(function () {
                arr.push($(this).val());
            });

            // console.info('---- e_selectTestApi data', arr);
            // console.info('version', that.currentTestVersion);

            if(arr.length == 0) {
                alert('请选择');
                return;
            }

            _ajax.ajaxJson({
                url: '/api/startTest',
                type: 'post',
                data: JSON.stringify({
                    data: arr,
                    version: that.currentTestVersion._id
                }),
                success: function (data) {
                    if (typeof data !== 'object') {
                        data = JSON.parse(data);
                    }
                    if(data.resultCode==='00000000'){
                        alert('完成');
                    }else{
                        alert(data.resultDesc);
                    }
                }
            });
        },

        e_getOpenCaseList:function () {
            var that = this;
            if(that.selectedAPI == ''){
                return;
            }
            _ajax.ajax({
                url: '/api/getNotConfigTest',
                type: 'get',
                data: {
                    api: that.selectedAPI,
                    status: 0
                },
                success: function (data) {
                    data = JSON.parse(data);
                    that.currentCase = 0;
                    console.info('---- success', data);
                    if (data.resultCode === '00000000') {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data[i].resultStr = _util.syntaxHighlight(data.data[i].result);
                            data.data[i].paramStr = _util.syntaxHighlight(data.data[i].param);
                        }
                        that.testResultData = data.data;
                        if (data.data[0]) {
                            that.selectedTestResult = data.data[0];
                            // console.info('---- selectedTestResult', JSON.parse(JSON.stringify(that.selectedTestResult)));
                        }

                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_selectApiAll:function (e) {
            if ($(e.currentTarget).prop('checked')) {
                $(e.currentTarget).parents('.selectShowApi').find('ul').find('input').prop('checked', true);
            } else {
                $(e.currentTarget).parents('.selectShowApi').find('ul').find('input').prop('checked', false);
            }
        },
        e_selectApiSingle:function (e) {
            if ($(e.currentTarget).prop('checked')) {
                $(e.currentTarget).attr('ck','true');
            }else{
                $(e.currentTarget).attr('ck','false');
            }
            if ($(e.currentTarget).parents('.selectShowApi').find('ul input[ck="true"]').length == $(e.currentTarget).parents('.selectShowApi').find('ul input').length) {
                $(e.currentTarget).parents('.selectShowApi').find('.selectShowApiTitle input').prop('checked', true);
            } else {
                $(e.currentTarget).parents('.selectShowApi').find('.selectShowApiTitle input').prop('checked', false);
            }
        },
        e_saveCase: function () {
            if (!localStorage.test_chargeUser) {
                alert('请先设置负责人');
                return;
            }
            var $div = $('#test-case-inputGroup .js-case-item');
            var usecaseArr = [], that = this, checkParamObj = {};

            for (var i = 0; i < $div.length; i++) {
                var usecaseItem = {}, paramObj = {}, paramNum = 0, paramTotal = 0, percent = '0%';
                $($div[i]).find('.js-param-item').find('input').each(function () {
                    paramTotal ++;
                    if ($(this).val() != '') {
                        checkParamObj[$(this).attr('name')] = $(this).val();
                        paramObj[$(this).attr('name')] = $(this).val();
                        paramNum ++;
                    }
                });
                // 参数是 object
                var keyObj = $($div[i]).find('.js-param-key');
                if (keyObj.length > 0) {
                    keyObj.each(function() {
                        var key = $(this).find('label').text();
                        paramObj[key] = {};
                        checkParamObj[key] = {};
                        $(this).siblings('.js-param-value').find('input').each(function() {
                            paramTotal ++;
                            if ($(this).val() != '') {
                                checkParamObj[key][$(this).attr('name')] = $(this).val();
                                paramObj[key][$(this).attr('name')] = $(this).val();
                                paramNum ++;
                            }
                        });
                    });
                }
                // 参数是 array
                var arrayObj = $($div[i]).find('.js-param-array');
                if (arrayObj.length > 0) {
                    arrayObj.each(function() {
                        var type = $(this).attr('data-type');
                        $(this).find('input').each(function() {
                            paramTotal ++;
                            if ($(this).val() != '') {
                                var value = $(this).val().split(',');
                                if (type == 'integer' || type == 'number') {
                                    for (var i = 0; i < value.length; i++) {
                                        value[i] = parseInt(value[i]);
                                    }
                                }
                                checkParamObj[$(this).attr('name')] = value;
                                paramObj[$(this).attr('name')] = value;
                                paramNum++;
                            }
                        });
                    });
                }

                if (paramNum !== 0) {
                    percent = this.getPercent(paramNum, paramTotal);
                    usecaseItem = {
                        data: paramObj,
                        createTime: parseInt($($div[i]).find('.js-ti').find('[name="createTime"]').val()) || new Date().getTime(),
                        updateTime: new Date().getTime(),
                        author: $($div[i]).find('.js-ti').find('[name="author"]').val() || localStorage.test_chargeUser,
                        desc: $($div[i]).find('.js-ti').find('[name="desc"]').val(),
                        percent: percent
                    };
                    console.info('---- usecase usecaseItem=', usecaseItem);
                    usecaseArr.push(usecaseItem);
                }
            }
            var ns = 0, ms = 0, totalPrecent = '0%';
            for (var d in checkParamObj) {
                if (!(checkParamObj[d] instanceof Array) && typeof checkParamObj[d] === 'object') {
                    for(var dd in checkParamObj[d]) {
                        ns++;
                    }
                } else {
                    ns++;
                }
            }
            for (var d in window_selectedAPIUseCaseParamBack) {
                if (window_selectedAPIUseCaseParamBack[d].properties) {
                    for(var dd in window_selectedAPIUseCaseParamBack[d].properties) {
                        ms++;
                    }
                } else {
                    ms++;
                }
            }
            totalPrecent = this.getPercent(ns, ms);

            // console.info('saveUsecase,data', totalPrecent, usecaseArr);

            ajax.ajaxJson({
                url: '/api/saveUsecase',
                type: 'post',
                data: JSON.stringify({
                    usecase: usecaseArr,
                    swaggerVersion: that.swaggerVersionValue,
                    method: that.selectedAPIData.method,
                    Json: that.selectedAPIData.contentType.match('json') ? 'true' : 'false',
                    percent: totalPrecent,
                    api: that.selectedAPI
                }),
                success: function (data) {
                    if (data.resultCode == '00000000') {
                        alert(data.resultDesc);
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_scan_swagger: function () {
            var that = this;
            if (that.scanAdd.author == undefined || that.scanAdd.description == undefined) {
                alert('创建人和描述不能为空！');
                return;
            }
            _ajax.ajaxJson({
                url: '/api/scanSwagger',
                type: 'post',
                data: JSON.stringify({
                    author: that.scanAdd.author,
                    description: that.scanAdd.description
                }),
                success: function (data) {
                    if (data.resultCode == '00000000') {
                        that.scanAdd = {};
                        $('#createScan').modal('hide');
                        alert(data.resultDesc);
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        },
        e_createUsecase: function() {
            _ajax.ajax({
                url: '/api/createUsecase',
                type: 'get',
                data: {},
                success: function (data) {
                    data = JSON.parse(data);
                    if (data.resultCode === '00000000') {
                    } else {
                        alert(data.resultDesc);
                    }
                }
            });
        }
    },
    ready:function () {
        var that = this;
        that.currentUsername = localStorage.test_currentUser;
        that.chargePeople.username = localStorage.test_chargeUser;
        _ajax.ajax({
            url: '/api/getSwagger',
            type: 'get',
            data: {},
            success: function (data) {
                data = JSON.parse(data);
                if (data.resultCode === '00000000') {
                    that.swaggerVersion = data.data;
                    that.swaggerVersionValue = data.data[0]._id;
                    that.e_changeSwagger();
                } else {
                    alert(data.resultDesc);
                }
            }
        });

        //获取测版本
        _ajax.ajax({
            url: '/api/getOpenVersion',
            type: 'get',
            data: {},
            success: function (data) {
                data = JSON.parse(data);
                if (data.resultCode === '00000000') {
                    that.testVersionList = data.data;
                    that.currentTestVersion = data.data[0];
                } else {
                    alert(data.resultDesc);
                }
            }
        });

        $(document).on('click', '#test-case-ul .js-hand', function () {
            var elemUl = $(this).siblings('ul');
            $('#test-case-ul ul').each(function (index, item) {
                if (!$(item).hasClass('hide')) {
                    // console.log(index + ' get');
                    $(item).slideUp(function () {
                        $(item).addClass('hide');
                    });
                    return false;
                }
            });

            if (elemUl.hasClass('hide')) {
                elemUl.removeClass('hide').slideDown();
            } else {
                elemUl.slideUp(function () {
                    $(this).addClass('hide');
                });
            }
        });
    }
});