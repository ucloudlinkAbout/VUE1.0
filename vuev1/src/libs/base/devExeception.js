/**
 * Created by chenwenxiao on 2016/11/5.
 * 异常处理模块，捕获所有前端处理的异常，后续开发所有方法均需要使用异常处理控件包裹
 */
import debug from 'debug'

const devExeception = function(fn) {
    try {
        fn();
    } catch (e) {
        debug.log(e);
    }
};

exports.devExe = devExeception;
