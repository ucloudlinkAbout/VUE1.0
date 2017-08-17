/**
 * Created by zhijian.liu on 2017/2/14.
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
     * 查询字典值
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    // searchDictionary(data) {
    //     return new Promise(function (resolve, reject) {
    //         ajaxAuthor({
    //             url: '/oms/user/queryUserByDevOps',
    //             method: 'post',
    //             json: true,
    //             data: data
    //         }).then(function (d) {
    //             if (d.resultCode === '00000000') {
    //                 resolve(d);
    //             } else {
    //                 reject(d);
    //             }
    //         }, function (d) {
    //             reject(d);
    //         });
    //     });
    // },
    /**
     * Created by xiaodi on 2016/12/08.
     * 提交赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    editAgent(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.agency.editAgent,
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
     * 提交删除赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    delAgent(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.agency.delAgent,
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
     * 提交新增赔偿管理数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    addAgent(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.agency.addAgent,
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
