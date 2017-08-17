/**
 * Created by chenwenxiao on 2016/11/23.
 */

(function ($) {

    $(function () {
        //接口统计数量
        $('.historyBack').click(function () {
            window.history.go(-1);
        });
        //下拉点击事件
        $(document).on('click','.system .title,.history .title',function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').siblings('ul').slideUp();
            } else {
                $(this).addClass('active').siblings('ul').slideDown();
            }
        });
        //全选功能
        $(document).on('click','.system .title .title-click-fix',function (e) {
            if ($(this).find('input').prop('checked')) {
                $(this).parents('.title').siblings('ul').find('input').prop('checked', true);
            } else {
                $(this).parents('.title').siblings('ul').find('input').prop('checked', false);
            }
            e.stopPropagation();
        });

        //全选功能
        $(document).on('click','.label-fix input[type=checkbox]',function () {
            if ($(this).parents('ul').find('li').length === $(this).parents('ul').find('input[type=checkbox]:checked').length) {
                $(this).parents('.system').find('.title-click-fix').find('input').prop('checked', true);
            } else {
                $(this).parents('.system').find('.title-click-fix').find('input').prop('checked', false);
            }
        });
        //下拉点击事件
        $(document).on('click','.pageHide .title',function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').siblings('.content').slideUp();
            } else {
                $(this).addClass('active').siblings('.content').slideDown();
            }
        });
        $(document).on('click','.system-detail .linkDetail',function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').siblings('.system-detail-c').slideUp();
            } else {
                $(this).addClass('active').siblings('.system-detail-c').slideDown();
            }
        });

        var initTestDetail = function () {
            var initChart = function (ii) {
                var pie = echarts.init(document.getElementById('echart-testPie-' + ii));
                var role = echarts.init(document.getElementById('echart-testRole-' + ii));
                var success = $('#success-' + ii).html() || 0, failed = $('#failed-' + ii).html() || 0, error = $('#error-' + ii).html() || 0;
                $('#successRate-' + ii).html(((success / ($('#case-' + ii).html())) * 100).toFixed(2) + '%');
                var pieOption = {
                    series: [
                        {
                            name: '版本测试结果',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: success, name: '成功'},
                                {value: failed, name: '失败'},
                                {value: error, name: '发生错误'}
                            ]
                        }
                    ]
                };
                pie.setOption(pieOption);
                var roleOption = {
                    xAxis: {
                        data: ["成功", "失败", "发生错误"]
                    },
                    yAxis: {},
                    series: [{
                        name: '版本测试结果',
                        type: 'bar',
                        data: [success, failed, error]
                    }]
                };
                role.setOption(roleOption);
            };
            if ($('.pageHide').length > 0) {
                var $page = $('.pageHide'), ii = 0;
                $page.each(function () {
                    initChart(ii);
                    ii++;
                });
            } else if ($('#echart-testPie-0').length > 0) {
                initChart(0);
            }
        };
        initTestDetail();
    });
})(jQuery||{});

var _loadTips = (function ($,c) {
    var loading = 0;
    $('body').append('<div class="loading" id="loading"><img src="/doc/images/loading.gif"/></div>');
    c.div = $('#loading');
    c.show = function () {
        loading++;
    };
    c.hide = function () {
        loading--;
    };
    setInterval(function () {
        if(loading <= 0){
            c.div.fadeOut();
        }else{
            c.div.show();
        }
    },100);
    return c;
})(jQuery||{},_loadTips||{});

var _util = (function ($,c) {
    c.checkSystemNums = function () {
        $('.system').each(function () {
            $(this).find('.title .num').html($(this).find('ul li').length + '个接口');
        });
    };
    c.syntaxHighlight = function(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };
    return c;
})(jQuery||{},_util||{});

var _dateHelper = (function ($, cons) {
    cons.getBrowserGMT = function () {
        var dates = new Date();
        return -dates.getTimezoneOffset() / 60;
    };
    cons.getDateZoneOffset = function () {
        return new Date().getTimezoneOffset();
    };
    //转换时间long格式到yyyy-mm-dd hh-MM-ss
    cons.getFormatTime = function (d, ks) {
        d = d + ((ks - cons.getBrowserGMT()) * 60 || 0) * 60000;
        var date = new Date(d), Y, M, D, h, m, s;
        if (!d) {
            return;
        }
        if (parseInt(d) < 86400) {
            return d;
        }
        d = d;
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        M = M < 10 ? "0" + M : M;
        D = (date.getDate() + ' ') < 10 ? "0" + (date.getDate() + ' ') : (date.getDate() + ' ');
        h = date.getHours();
        h = (h < 10 ? "0" + h : h) + ':';
        m = date.getMinutes();
        m = (m < 10 ? "0" + m : m) + ':';
        s = date.getSeconds();
        s = (s < 10 ? "0" + s : s);
        return Y + M + D + h + m + s;
    };
    //转换时间yyyy-mm-dd hh-MM-ss格式到long
    cons.formatTimeTolong = function (datetime, ks) {
        ks = ks === undefined ? cons.getBrowserGMT() : ks;
        if (!datetime) {
            return;
        }
        var tmp_datetime = datetime.replace(/:/g, '-');
        tmp_datetime = tmp_datetime.replace(/ /g, '-');
        var arr = tmp_datetime.split("-");
        arr[2] = arr[2] || 0;
        arr[3] = arr[3] || 0;
        arr[4] = arr[4] || 0;
        arr[5] = arr[5] || 0;
        var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]));
        var offset = (cons.getDateZoneOffset() + (cons.getBrowserGMT() - ks) * 60) * 60000;
        return parseInt(now.getTime() + offset);
    };
    return cons;
})(jQuery || {}, _dateHelper || {});

var _ajax = (function ($,c) {
    var that = this;
    c.auth = function (dt) {
        dt.streamNo = 'web_bss' + new Date().getTime() + parseInt(Math.random() * 1000000);
        dt.partnerCode = 'UKWEB';
        dt.loginCustomerId = localStorage.test_loginCustomerId;
        return dt;
    };
    c.ajax = function(option) {
        _loadTips.show();
        option.data = c.auth(option.data);
        $.ajax({
            url: option.url,
            type: option.type,
            data: option.data,
            success: function (data) {
                _loadTips.hide();
                option.success(data);
            },
            error: function () {
                _loadTips.hide();
                alert('请求错误！');
            }
        });
    };
    c.ajaxJson = function(option) {
        _loadTips.show();
        option.data = JSON.parse(option.data);
        option.data = JSON.stringify(c.auth(option.data));
        $.ajax({
            url: option.url,
            type: option.type,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: option.data,
            success: function (data) {
                _loadTips.hide();
                option.success(data);
            },
            error: function () {
                _loadTips.hide();
                alert('请求错误！');
            }
        });
    };
    return c;
})(jQuery||{},_ajax||{});

//tips提示框控件
var _tipsHelper = (function ($, controlers) {
    var _timers_single;
    var _timers_id = 0;
    //初始化第一种弹窗口css样式
    var initTipsBox1 = function (op_id) {
        var default_Div = '<div class="tips_tip" id="' + op_id + '" style="display:none;">' +
            '<div class="tips_tip_pointer"></div>' +
            '<div class="tips_tip_content">警告提示框</div>' +
            '</div>';
        $("body").append(default_Div);
        return $("#" + op_id);
    };

    //content：提示内容，times：提示框出现时间，默认3秒
    controlers.showTips_Box1 = function (_op) {
        var defalut_op = {
            _content: '警告提示框',
            _times: 3000,
            _inputObjects: null,
            _leftPositionModify: 22,
            _topPositionModify: 0
        };
        var _option = $.extend({}, defalut_op);
        _op = $.extend(_option, _op);

        var setTips = function () {
            var $obj = initTipsBox1("tips_tip_single_" + _timers_id);
            _timers_id++;
            $obj.find(".tips_tip_content").html(_op._content);
            $obj.css({
                top: (_op._inputObjects.offset().top - _op._topPositionModify),
                left: (_op._inputObjects.offset().left + _op._leftPositionModify + _op._inputObjects.width())
            });
            $obj.fadeIn();
            setTimeout(function () {
                $obj.fadeOut(function () {
                    $(this).remove();
                });
            }, _op._times)
        };
        setTips();
    };
    return controlers;
})(jQuery || {}, _tipsHelper || {});