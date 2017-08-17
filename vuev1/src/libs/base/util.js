/**
 * Created by chenwenxiao on 2016/11/10.
 * 工具类
 */

const util = {
    /**
     * Created by chenwenxiao on 2016/11/10.
     * 数组根据其中某个值进行冒泡排序
     * @param {object} dataList 数组
     * @param {object} k 排序基准值
     * @param {object} desc 升序还是降序排序
     * @return {undefined || array} 数组的值或者为空
     */
    arraySortByTag(dataList, k, desc) {
        if (typeof dataList !== 'object') {
            return;
        }
        var bubbleSort = function (a, b) {
            if (a === undefined) {
                return false;
            } else if (b === undefined) {
                return true;
            }
            return a > b;
        };
        if (k === undefined || k === '') {
            return;
        }
        for (let i = 0; i < dataList.length; i++) {
            for (let j = 0; i + j < dataList.length - 1; j++) {
                if (desc === false) {
                    if (bubbleSort(dataList[j][k], dataList[j + 1][k])) {
                        const dataCk = dataList[j];
                        dataList[j] = dataList[j + 1];
                        dataList[j + 1] = dataCk;
                    }
                } else {
                    if (bubbleSort(dataList[j + 1][k], dataList[j][k])) {
                        const dataCk = dataList[j];
                        dataList[j] = dataList[j + 1];
                        dataList[j + 1] = dataCk;
                    }
                }
            }
        }
        return dataList;
    },

    /**
     * Created by chenwenxiao on 2016/11/10.
     * eval通用方法，减少警告个数
     * @return {function} eval方法
     */
    eval() {
        return eval;
    },

    /**
     * Created by chenwenxiao on 2016/11/16.
     * 根据值移除数组中的某个元素(仅仅真的非复杂对象的数组)
     * @param {array} dataList 数组
     * @param {string} value 值
     * @return {array} 数组的值
     */
    arrRemoveByValue(dataList, value) {
        if (dataList.length) {
            for (let i = 0; i < dataList.length; i++) {
                if (dataList[i] === value) {
                    dataList[i] = dataList[i + 1];
                }
            }
            dataList.length--;
            return dataList;
        }
        return dataList;
    },

    /**
     * Created by chenwenxiao on 2016/12/06.
     * 表格重置功能
     * @param {object} data 需要重置的对象
     * @param {object} obj 重置的同时需要初始化的对象
     * @return {object} data 重置完成的对象
     */
    resetFormValue(data, obj) {
        if (typeof data === 'object' && !data.length) {
            for (const d in data) {
                data[d] = '';
            }
            if (typeof obj === 'object' && !data.length) {
                for (const d in obj) {
                    data[d] = obj[d];
                }
            }
        }
        return data;
    },

    /**
     * Created by chenwenxiao on 2016/12/06.
     * 异步等待功能，主要解决一下数据同步的问题，后续有可能的话可能需要对此方法进行改进
     * @param {function} fn 需要重置的对象
     * @return {Promise} Promise 对象
     */
    wait(fn) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (fn) {
                    fn();
                }
                resolve('ok');
            }, 100);
        });
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示读取控件
     */
    loadingShow() {
        window.SystemGlobe.GlobeOption.showLoadingTips++;
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示读取控件
     */
    loadingHide() {
        window.SystemGlobe.GlobeOption.showLoadingTips--;
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示tips控件
     * @param opt 验证的input对象
     */
    tipsShow(opt) {
        const $obj = $(opt.target.$el);
        let $tips = $('#' + opt.target._uid);
        if ($tips.length === 0) {
            $tips = $('body').append('<span class="input-tips" class="input-tips-show" id="' + opt.target._uid + '"></span>').find('.input-tips').eq(-1);
            $tips.html(opt.txt).css({
                'top': $obj.offset().top - (opt.top || 0),
                'left': $obj.offset().left - (opt.left || 0)
            });
            setTimeout(function () {
                $tips.remove();
            }, 3000);
        }
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 隐藏tips控件
     * @param opt 验证的input对象
     */
    tipsHide(opt) {
        $('#' + opt.target._uid).remove();
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示tips-m控件
     * @param opt.ico 弹出框图标
     * @param opt.txt 弹出框内容
     */
    middleTipsShow(opt) {
        window.SystemGlobe.GlobeOption.middleTipsList.push({
            ico: opt.ico,
            txt: opt.txt,
            closeCallBack: opt.closeCallBack
        });
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示tips-left控件
     * @param opt.ico 弹出框颜色
     * @param opt.txt 弹出框内容
     */
    leftTipsShow(opt) {
        window.SystemGlobe.GlobeOption.leftTipsList.push({
            ico: opt.ico,
            txt: opt.txt
        });
    },

    /**
     * Created by chenwenxiao on 2016/11/30.
     * 显示tips-left控件
     * @param opt.txt 弹出框内容
     * @param opt.title 弹出框标题
     * @param opt.closeCallBack 弹出框取消按钮回调
     * @param opt.callBack 弹出框确定按钮回调
     */
    dialogTipsShow(opt) {
        window.SystemGlobe.GlobeOption.dialogTipsList.push({
            txt: opt.txt,
            title: opt.title,
            closeCallBack: opt.closeCallBack,
            callBack: opt.callBack
        });
    }
};
exports.util = util;
