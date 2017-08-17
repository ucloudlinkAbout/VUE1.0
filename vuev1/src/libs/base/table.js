/**
 * Created by chenwenxiao on 2016/8/23.
 */

import ajax from './ajax'
import TimeFormat from './timeFormat'
import Util from './util'
import BaseCheck from './baseCheck'
import Store from './store'
import Cookie from './cookieHelper'

class table {
    /**
     * 表格构造器
     * @param {object} opt table的配置参数，详情请进入libs/base/table.js里面查看
     * */
    constructor(opt) {
        this.defaultOpt = {
            /*以下两个方案，不能同时共存，只能选择其中一个，公用参数部分可以共存*/
            //方案一：需要做ajax请求的部分
            ajaxOption: {
                //接口url
                url: '',
                //接口方法
                method: 'post',
                //显示按钮的个数
                pageSize: 5,
                //每页多少条数据
                perPage: 10,
                //每页多少条数据的选择
                perPageSelect: '10, 20, 50, 100',
                //当前页
                currPage: 1,
                //是否是json格式的数据
                json: true,
                //是否开启测试模式
                test: false,
                //默认查询参数，为空对象或者不写则不传
                defaultParameter: {}
            },
            //方案二：直接赋予列表数据的部分
            dataOption: {
                //若没有url，可以使用dataList为列表提供展示数据，不支持分页
                dataList: []
            },
            /*以下部分为通用参数*/
            //执行过滤之前的处理
            beforeFilter: function (dataList) {
                return dataList;
            },
            //执行过滤之后执行的处理
            afterFilter: function (dataList) {
                return dataList;
            },
            //字段过滤，按顺序展示
            parton: [],
            //字段过滤，按顺序展示
            lanParton: [],
            //多语言文件名称
            lanKey: '',
            //需要进行时间转换处理的字段
            timeFormat: [],
            //是否显示排序功能
            showSort: true,
            //是否显示第一行的选择框
            showSelect: true,
            //是否多选
            multiSelect: false,
            //需要进行流量处理的字段
            flowFormat: [],
            //是否使用自定义列
            customerCol: true,
            //是否使用beforeFilter替换原始数据
            beforeFilterReplaceOldList: false,
            //动态字典表翻译
            key: [],
            //动态包裹功能
            swap: [],
            //静态字典表翻译
            staticKey: []
        };
        this.defaultOpt = $.extend(true, {}, this.defaultOpt, opt);
        this.defaultOpt.ajaxOption.perPageSelect = this.defaultOpt.ajaxOption.perPageSelect.split(',');
    }

    /**
     * 计算页面显示页数
     * @param {object} opt 计算分页数量的参数
     * */
    getPageSize(opt) {
        var pageSize = opt.pageSize,
            totalPage = opt.totalPageCount,
            pageNum = opt.currentPage,
            page = [];
        if (totalPage >= pageSize) {
            let begin = 0;
            let end = 0;
            if (pageNum < pageSize / 2) {
                begin = 1;
                end = pageSize;
            } else if (pageNum > (totalPage - pageSize / 2)) {
                begin = totalPage - pageSize + 1;
                end = totalPage;
            } else {
                begin = pageNum - parseInt(pageSize / 2);
                end = pageNum + parseInt(pageSize / 2)
            }
            for (let i = begin; i <= end; i++) {
                page.push(i);
            }
        } else {
            for (let i = 1; i <= totalPage; i++) {
                page.push(i);
            }
        }
        if (page.length === 0) {
            page.push(1);
        }
        return page;
    }

    /**
     * 初始化数据并对数据进行处理，一般用于第一次加载列表时使用
     * */
    init() {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.query(that.defaultOpt.ajaxOption.defaultParameter).then(resolve, reject);
        });
    }

    /**
     * 翻页方法
     * @param {object} page 翻页
     * @param {object} search 查询条件
     * */
    flip(page, search) {
        const that = this;
        return new Promise(function (resolve, reject) {
            const query = search || {};
            query.currentPage = page;
            that.query(query).then(resolve, reject);
        });
    }

    /**
     * 列表数据查询
     * @param {object} search 查询条件
     * */
    query(search) {
        search = search || {};
        const that = this;
        return new Promise(function (resolve, reject) {
            if (that.defaultOpt.ajaxOption.url === '') {
                resolve('');
                return;
            }
            const tableQuery = $.extend({}, search);
            tableQuery.currentPage = tableQuery.currentPage || 1;
            tableQuery.perPageCount = that.defaultOpt.ajaxOption.perPage;

            ajax.ajaxAuthor({
                method: that.defaultOpt.ajaxOption.method,
                url: that.defaultOpt.ajaxOption.url,
                json: that.defaultOpt.ajaxOption.json,
                test: that.defaultOpt.ajaxOption.test,
                data: tableQuery
            }).then(function (data) {
                if (data.resultCode !== '00000000') {
                    reject(data);
                }
                data.data = data.data || {};
                const pageSize = that.getPageSize({
                    pageSize: that.defaultOpt.ajaxOption.pageSize,
                    totalPageCount: data.data.totalPageCount,
                    currentPage: data.data.currentPage
                });
                let lanParton,
                    partonBack;
                if (that.getPrtonFromLocal() && window.SystemGlobe.devType.columLocalSave) {
                    const getParton = that.getPrtonFromLocal()[that.defaultOpt.lanKey];
                    if (getParton) {
                        lanParton = that.partonTranslate(getParton.selected);
                        partonBack = that.partonTranslate(getParton.all);
                    } else {
                        lanParton = that.partonTranslate(that.defaultOpt.parton);
                        partonBack = that.partonTranslate(that.defaultOpt.parton);
                    }
                } else {
                    lanParton = that.partonTranslate(that.defaultOpt.parton);
                    partonBack = that.partonTranslate(that.defaultOpt.parton);
                }
                const oldList = [];
                for (let i = 0; i < data.data.dataList.length; i++) {
                    oldList.push($.extend(true, {}, data.data.dataList[i]));
                }
                that.filter(data.data.dataList).then(function (fio) {
                    resolve({
                        dataList: fio.dataList,
                        oldList: fio.oldList || oldList,
                        parton: lanParton,
                        partonBack: partonBack,
                        pageSize: pageSize,
                        pageOption: {
                            totalPageCount: data.data.totalPageCount,
                            currentPage: data.data.currentPage,
                            perPageCount: data.data.perPageCount,
                            totalCount: data.data.totalCount
                        },
                        perPageSelect: that.defaultOpt.ajaxOption.perPageSelect
                    });
                });
            }, function (data) {
                reject(data);
            });
        });
    }

    /**
     * 列表数据过滤器
     * @param {object} dataList 列表数据
     * */
    filter(dataList) {
        var that = this;
        return new Promise(function (resolve, reject) {
            try {
                dataList = that.defaultOpt.beforeFilter(dataList);
                let oldList;
                if (that.defaultOpt.beforeFilterReplaceOldList) {
                    oldList = [];
                    for (let i = 0; i < dataList.length; i++) {
                        oldList.push($.extend(true, {}, dataList[i]));
                    }
                } else {
                    oldList = false;
                }
                for (let i = 0; i < dataList.length; i++) {
                    const currObj = dataList[i];
                    // 时间转换
                    if (that.defaultOpt.timeFormat.length > 0) {
                        const timef = new TimeFormat();
                        for (let k = 0; k < that.defaultOpt.timeFormat.length; k++) {
                            currObj[that.defaultOpt.timeFormat[k]] = timef.getFormatTime(currObj[that.defaultOpt.timeFormat[k]]);
                        }
                    }
                    //静态字典表的转换
                    if (that.defaultOpt.staticKey.length > 0) {
                        for (let i = 0; i < that.defaultOpt.staticKey.length; i++) {
                            currObj[that.defaultOpt.staticKey[i].relate] = that.defaultOpt.lanObj[that.defaultOpt.staticKey[i].type[currObj[that.defaultOpt.staticKey[i].relate]]];
                        }
                    }
                    //动态包裹的字段的处理
                    if (that.defaultOpt.swap.length > 0) {
                        for (let i = 0; i < that.defaultOpt.swap.length; i++) {
                            const swapValue = that.defaultOpt.swap[i].value;
                            let str = '<' + that.defaultOpt.swap[i].swap + ' ';
                            for (const d in swapValue) {
                                if (swapValue[d] === 'self') {
                                    str += d + '="' + currObj[that.defaultOpt.swap[i].relate] + '" ';
                                } else {
                                    str += d + '="' + swapValue[d] + '" ';
                                }
                            }
                            str += '>' + currObj[that.defaultOpt.swap[i].relate] + '</' + that.defaultOpt.swap[i].swap + '>';
                            currObj[that.defaultOpt.swap[i].relate] = str;
                        }
                    }
                }

                dataList = that.defaultOpt.afterFilter(dataList);
                resolve({
                    dataList: dataList,
                    oldList: oldList
                });
            } catch (e) {
                reject({
                    dataList: dataList,
                    oldList: dataList
                });
            }
        });
    }

    /**
     * lanParton 翻译
     * @param {array} parton parton数据
     * @return {array} 翻译以后与原来的parton
     * */
    partonTranslate(parton) {
        const lanParton = [], that = this;
        for (let i = 0; i < parton.length; i++) {
            lanParton.push({
                lanParton: that.defaultOpt.lanObj.list[parton[i]],
                parton: parton[i]
            });
        }
        return lanParton;
    }

    /**
     * lanParton 保存到本地
     * @param {array} parton 存储parton数组
     * */
    savePartonToLocal(parton, sortParton) {
        const store = new Store();
        const cookie = new Cookie();
        const arr = [];
        const userStr = 'table_' + cookie.getCookie('loginCustomerId');
        for (let i = 0; i < parton.length; i++) {
            arr.push(parton[i].parton);
        }
        let localObj = {};
        if (store.localGet(userStr) !== undefined) {
            localObj = JSON.parse(store.localGet(userStr));
            localObj[this.defaultOpt.lanKey] = {
                selected: arr,
                all: sortParton
            };
        } else {
            localObj[this.defaultOpt.lanKey] = {
                selected: arr,
                all: sortParton
            };
        }
        store.localSave((userStr), localObj);
    }

    /**
     * lanParton  从本地获取parton
     * @return {undefined} 本地保存的parton
     * */
    getPrtonFromLocal() {
        const store = new Store();
        const cookie = new Cookie();
        const userStr = 'table_' + cookie.getCookie('loginCustomerId');
        if (store.localGet(userStr) !== undefined) {
            return JSON.parse(store.localGet(userStr));
        }
        return;
    }

    /**
     * 根据id获取列表中的数据
     * @param {object} dataList 列表数据
     * @param {string} id 传入的id
     * */
    getDataById(dataList, id) {
        const bc = new BaseCheck();
        if (bc.isNumber(id)) {
            id = parseInt(id);
        }
        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].id === id) {
                return dataList[i];
            }
        }
        return {};
    }

    /**
     * 列表排序
     * @param {object} dataList 列表数据
     * @param {string} k 排序标签
     * @param {string} desc 是否倒序
     * */
    sort(dataList, k, desc) {
        return Util.util.arraySortByTag(dataList, k, desc || false);
    }
}
export default table;
