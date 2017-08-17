/**
 * Created by kang.yan on 2017/2/15.
 */
import { ajaxAuthor } from '../../../../libs/base/ajax'
export default{
    /**
     * Created by yankang on 2017/02/12.
     * 查询字典值
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    searchSelfOperated(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.selfOperated.querySelfOperated,
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
     * Created by yankang on 2017/02/12.
     * 提交赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    editSelfOperated(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.selfOperated.editSelfOperated,
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
     * Created by yankang on 2017/02/14.
     * 提交删除赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    delSelfOperated(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.selfOperated.delSelfOperated,
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
     * Created by yankang on 2017/02/14.
     * 提交新增赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    addSelfOperated(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.selfOperated.addSelfOperated,
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