/**
 * Created by chenwenxiao on 2016/12/5.
 */
import { ajaxAuthor } from '../../../../libs/base/ajax'
export default{
    /**
     * Created by xiaodi on 2016/12/08.
     * 查询字典值
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    searchDictionary(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: '/oms/dictionary/queryDictionaryByDevOps',
                method: 'post',
                json: true,
                data: data
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (d) {
                reject(d);
            });
        });
    },
    /**
     * Created by xiaodi on 2016/12/08.
     * 提交通知管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    editNotice(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.notice.editNotice,
                method: 'post',
                json: true,
                data: data
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (d) {
                reject(d);
            });
        });
    },
    /**
     * Created by xiaodi on 2016/12/08.
     * 提交通知管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    delNotice(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.notice.delNotice,
                method: 'post',
                json: true,
                data: data
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (d) {
                reject(d);
            });
        });
    },
    /**
     * Created by xiaodi on 2016/12/08.
     * 提交通知赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    addNotice(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.damages.addNotice,
                method: 'post',
                json: true,
                data: data
            }).then(function (d) {
                if (d.resultCode === '00000000') {
                    resolve(d);
                } else {
                    reject(d);
                }
            }, function (d) {
                reject(d);
            });
        });
    }
}
