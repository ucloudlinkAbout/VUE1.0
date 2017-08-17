/**
 * Created by chenwenxiao on 2016/8/19.
 */

'use strict';
import Ajax from './ajax'
import Store from './store'
import devExe from './devExeception'
import debug from './debug'

/**
 * 负责人：chenwenxiao
 * 读取多语言文件的方法
 * @param {string} name 需要读取的多语言文件
 * @return {Promise} promise对象
 * */
const getLan = function(name) {
    return new Promise(function (resolve, reject) {
        devExe.devExe(function () {
            var lan, local = new Store();
            if (local.localGet('language') === undefined) {
                lan = window.navigator.language;
            } else {
                lan = local.localGet('language');
            }
            let lanObj;
            if (local.sessionGet(lan) === undefined) {
                lanObj = {};
            } else {
                lanObj = JSON.parse(local.sessionGet(lan));
            }
            if (lanObj[name] !== undefined && !window.SystemGlobe.devType.debug) {
                if (lanObj[name].$isLoading) {
                    var timer = setInterval(function () {
                        if (!lanObj[name].$isLoading) {
                            clearInterval(timer);
                            resolve(lanObj[name]);
                        }
                    }, 100);
                } else {
                    resolve(lanObj[name]);
                }
            } else {
                lanObj[name] = {
                    $isLoading: true
                };
                local.sessionSave(lan, JSON.stringify(lanObj));
                Ajax.ajax({
                    data: {},
                    url: '/dist/i18n/' + lan + '/' + name + '.json',
                    method: 'get'
                }).then(function (d) {
                    lanObj[name] = d;
                    local.sessionSave(lan, JSON.stringify(lanObj));
                    resolve(d);
                }, function (d) {
                    if (reject) {
                        reject(d);
                    } else {
                        debug.log(d, '多语言文件' + name + '加载失败！');
                    }
                });
            }
        });
    });
};

/**
 * 负责人：chenwenxiao
 * 设置默认语言到本地
 * @param {string} lan 如zh-CN、en-US
 * */
exports.setCurrentLanuage = function (lan) {
    var local = new Store();
    local.localSave('language', lan);
};

exports.getLan = getLan;
