
/**
 * Created by liugang on 2016/10/24.
 */

'use strict';
import ajax from './ajax.js';
import debug from './debug.js';

export default class {
    constructor(opt) {
        this.opt = opt;
        this.url = '';
        this.errorConfig = {
            400: '错误码：400，接口传输参数错误，请与工作人员联系！',
            401: '错误码：401，访问被拒绝，请检查接口参数！',
            403: '错误码：403，登录的账号没有授权或授权过期，请重新登录系统，若类似问题再次出现，请与工作人员联系！',
            404: '错误码：404，接口请求连接错误，请与工作人员联系！',
            405: '错误码：405，方法不被允许！',
            414: '错误码：414，请求 URI 太长！',
            415: '错误码：415，不支持的媒体类型！',
            500: '错误码：500，后台服务器报错！',
            501: '错误码：501，服务器还是不具有请求功能！',
            502: '错误码：502，网关请求错误！',
            503: '错误码：503，服务不可用！',
            504: '错误码：504，网关请求超时！'
        };
        
        opt.pram && this.sendLog(opt.pram);
        opt.errorCode && this.throwException(this.errorConfig[opt.errorCode]);
    }
    
    //记录错误日志
    sendLog(pram) {
        ajax({
            url: this.url,
            method: 'post',
            data: pram
        }).then((data) => {
            console.log('错误日志已记录');
        });
    }
    
    //抛出异常
    throwException(msg) {
        debug.log(msg, 'error');
    }
    
}
