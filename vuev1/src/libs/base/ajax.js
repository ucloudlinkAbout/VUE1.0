/**
 * Created by chenwenxiao on 2016/8/19.
 */

'use strict';
import Auth from '../base/authorizeHelper'
import debug from '../base/debug'
import util from './util'
import TimeFormat from '../../libs/base/timeFormat'
import dataLogger from './dataLogger'

/**
 * 负责人：chenwenxiao
 * 基础ajax方法，无数据授权
 * @param {object} opt ajax参数
 * @return {Promise} promise对象
 * */
const ajax = function(opt) {
    return new Promise(function (resolve, reject) {
        if ($) {
            if (opt.json) {
                opt.data = JSON.stringify(opt.data);
            }
            //是否开启测试模式数据的控制
            if (opt.test && window.SystemGlobe.devType.debug) {
                opt.oldUrl = opt.url;
                opt.url = '/api/getDataByDebug';
                opt.method = 'post';
                opt.data = JSON.stringify({
                    data: opt.data,
                    url: opt.oldUrl
                });
            }
            //是否在加载的时候显示锁屏控件，默认是显示的
            if (!opt.hideLoading) {
                util.util.loadingShow();
            }
            if (opt.async === undefined) {
                opt.async = true;
            }
            let delayTime = new Date().getTime();
            $.ajax({
                dataType: 'json',
                async: opt.async,
                contentType: 'application/json;charset=utf-8',
                success: function (d) {
                    //是否在加载的时候显示锁屏控件，默认是显示的
                    if (!opt.hideLoading) {
                        util.util.loadingHide();
                    }
                    if (opt.url !== '/api/getDataByDebug') {
                        if (d.resultCode === '00000000') {
                            //将接口数据写入到本地作为备份使用
                            if (!opt.test && window.SystemGlobe.devType.debug && opt.url.substring(opt.url.length - 5, opt.url.length) !== '.json' && !d.api) {
                                dataLogger.dataLogger(d, opt);
                            }
                            window.SystemGlobe.GlobeOption.timingOption.push({
                                url: opt.url,
                                method: opt.method,
                                delayTime: new Date().getTime() - delayTime
                            });
                            resolve(d);
                        } else {
                            resolve(d);
                            if (opt.url.indexOf('.json') === -1) {
                                debug.debug({
                                    title: d.resultCode + '错误',
                                    from: '调用接口' + opt.url,
                                    content: d.resultDesc
                                });
                            }
                        }
                    } else {
                        resolve(d);
                    }
                },
                beforeSend: function (request) {
                    request.setRequestHeader('Accept-Language', localStorage.language || 'en-US');
                    request.setRequestHeader('Time-Zone', 'GMT' + new TimeFormat().getBrowserGMT());
                },
                data: opt.data,
                url: opt.url,
                type: opt.method,
                error: function (e) {
                    debug.debug({
                        title: e.status + '错误',
                        from: '调用接口' + opt.url,
                        content: e
                    });
                    //是否在加载的时候显示锁屏控件，默认是显示的
                    if (!opt.hideLoading) {
                        util.util.loadingHide();
                    }
                    if (reject) {
                        reject(e, opt);
                    }
                }
            });
        } else {
            reject('没有引入jquery库，代码无法运行！');
        }
    });
};

/**
 * 负责人：chenwenxiao
 * 自动授权的ajax方法，正常使用推荐使用这个
 * @param {object} opt ajax参数
 * @return {Promise} promise对象
 * */
const ajaxAuthor = function(opt) {
    return new Promise(function (resolve, reject) {
        const au = new Auth();
        opt.data = au.authorize(opt.data);
        ajax(opt).then(resolve, reject);
    });
};

exports.ajax = ajax;
exports.ajaxAuthor = ajaxAuthor;
