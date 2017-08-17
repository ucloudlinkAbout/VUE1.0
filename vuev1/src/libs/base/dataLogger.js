/**
 * Created by chenwenxiao on 2016/12/5.
 */
'use strict';
import ajax from './ajax'
import AuthorizeHelper from './authorizeHelper'
/**
 * 负责人：chenwenxiao
 * 接口数据写入本地备份
 * @param {object} data 写入的基础数据
 * @param {object} opt 写入的传参对象
 * @return {Promise} promise对象
 * */
const dataLogger = function(data, opt) {
    return new Promise(function (resolve, reject) {
        const au = new AuthorizeHelper();
        ajax.ajax({
            url: '/api/saveDataByDebug',
            method: 'post',
            data: JSON.stringify({
                data: data,
                url: opt.url,
                param: JSON.parse(opt.data),
                conditions: au.deAuthorize(JSON.parse(opt.data))
            }),
            hideLoading: true
        }).then(function (e) {
            if (resolve) {
                resolve(e);
            }
        }, function (e) {
            if (resolve) {
                reject(e);
            }
        });
    });
};

exports.dataLogger = dataLogger;
