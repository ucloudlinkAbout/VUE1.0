/**
 * Created by chenwenxiao on 2016/8/19.
 */

import debug from './debug';

class baseCheck {
    /******************js内部验证******************/
    /**
     * 检查是否是function
     * @param {string} d  传入的需要检查的对象
     * @return {boolean} 返回bool值
     * */
    isFunction(d) {
        return typeof d === 'function';
    }

    /**
     * 检查是否是object
     * @param {string} d  传入的需要检查的对象
     * @return {boolean} 返回bool值
     * */
    isObject(d) {
        return typeof d === 'object';
    }

    /**
     * 检查是否是字符串
     * @param {string} d  传入的需要检查的对象
     * @return {boolean} 返回bool值
     * */
    isString(d) {
        return typeof d === 'string';
    }

    /**
     * 检查是否是数组
     * @param {string} d  传入的需要检查的对象
     * @return {boolean} 返回bool值
     * */
    isArr(d) {
        return typeof d === 'object' && d.length !== undefined;
    }

    /**
     * 长度校验
     * @param {string} big  大的数据
     * @param {string} small  小的数据
     * @return {boolean} 返回bool值
     * */
    lengthCheck(big, small) {
        return big >= small;
    }

    /**
     * 相等校验
     * @param {string} nval  新的数据
     * @param {string} oval  旧的数据
     * @return {boolean} 返回bool值
     * */
    npwdCheck(nval, oval) {
        return nval === oval;
    }

    /****************web部分验证***************/

    /**
     * 邮箱验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isMail(d) {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(d);
    }

    /**
     * 是否是数字
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isNumber(d) {
        return !isNaN(d);
    }

    /**
     * 电话验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isPhone(d) {
        return /\d{3}-\d{8}|\d{4}-\d{7}|\d{11}/.test(d);
    }

    /**
     * 验证身份证号
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isPort(d) {
        if (d.length === 15) {
            return /^\d{15}/.test(d);
        } else if (d.length === 18) {
            return /^\d{18}\b|^\d{17}\w{1}\b/.test(d);
        }
        return false;
    }

    /**
     * QQ号验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isQQ(d) {
        return /^[1-9]\d{4,13}$/.test(d);
    }

    /**
     * IMEI号验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isIMEI(d) {
        return /^[1-9]\d{23}$/.test(d);
    }

    /**
     * ip验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isIP(d) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(d);
    }

    /**
     * 邮编验证
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isMailNumber(d) {
        return /^[1-9]\d{5}$/.test(d);
    }

    /**
     * 匹配正浮点数，用于金额等校验
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isPositvePoint(d) {
        return /[1-9]\d*\.\d*|^0\.\d*[1-9]\d*$/.test(d);
    }

    /**
     * 匹配负浮点数，用于金额等校验
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isNegativePoint(d) {
        return /-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/.test(d);
    }

    /**
     * 空格检查
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    hasSpace(d) {
        return !/\s+/.test(d);
    }

    /**
     * 是否是合法字符
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isLegitimateStr(d) {
        const reg = new RegExp('^[a-zA-Z0-9_@.]{' + 1 + ',' + 2000 + '}$');
        return reg.test(d);
    }

    /**
     * 是否是合法字符
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    isLegitimateStrLength(d, min, max) {
        const reg = new RegExp('^[a-zA-Z0-9_@.]{' + (min || 1) + ',' + (max || 30) + '}$');
        return reg.test(d);
    }

    /**
     * 是否是空的字符
     * @param {string} d  需要校验的数据
     * @return {boolean} 返回bool值
     * */
    notEmpty(d) {
        return d !== '' && d !== undefined && d !== null;
    }

    /**
     * 基础校验组合方法
     * @param {array} checkType  需要校验的类型
     * @param {string} val  需要校验的数据
     * @return {object} 返回校验结果和提示信息
     * */
    checkLt(checkType, val) {
        const that = this;
        if (typeof checkType === 'object') {
            if (checkType.length > 0) {
                for (let i = 0; i < checkType.length; i++) {
                    try {
                        if (!eval('that.' + checkType[i] + '(val)')) {
                            return {
                                check: false,
                                type: checkType[i]
                            }
                        }
                    } catch (e) {
                        debug.log(that);
                        return {
                            check: false,
                            type: 'error'
                        };
                    }
                }
                return {
                    check: true,
                    type: 'success'
                };
            }
        }
        return {
            check: false,
            type: 'nullError'
        };
    }
}

export default baseCheck;
