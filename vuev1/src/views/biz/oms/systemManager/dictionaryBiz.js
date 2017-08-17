/**
 * Created by chenwenxiao on 2016/12/5.
 */
import { ajaxAuthor } from '../../../../libs/base/ajax'
export default{
    /**
     * Created by chenwenxiao on 2016/12/06.
     * 提交新增字典表数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    addDictionary(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.dictionary.addDictionary,
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
     * Created by chenwenxiao on 2016/12/06.
     * 提交编辑字典表数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    editDictionary(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.dictionary.modifyDictionary,
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
     * Created by chenwenxiao on 2016/12/06.
     * 提交删除字典表数据到接口，并对数据进行一定的可视化处理
     * @param {object} data 传输的数据
     * @return {Promise} promise对象
     */
    delDictionary(data) {
        return new Promise(function (resolve, reject) {
            ajaxAuthor({
                url: window.SystemGlobe.url.dictionary.delDictionary,
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
